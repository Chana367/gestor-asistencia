import { Component, inject } from '@angular/core';
import { Student } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDeleteComponent } from './components/students-delete/students-delete.component';
import { StudentsService } from './services/students.service';
import { StudentsFormComponent } from './components/students-form/students-form.component';
import { Observable } from 'rxjs';
import { User } from '../../../../core/models';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {
  students: Student[] = [];
  isLoading: boolean = true; // Variable para controlar el estado de carga
  readonly dialog = inject(MatDialog);
  authUser$: Observable<User | null>;

  constructor(private studentService: StudentsService, private authService: AuthService) {
    this.loadStudents(); // Carga los estudiantes usando un observable
    this.authUser$ = this.authService.authUser$;
  }

  loadStudents() {
    this.studentService.getStudents$().subscribe({
      next: (students) => {
        this.students = students;
        console.log('Estudiantes cargados:', this.students);
      },
      error: (error: any) => console.error('Error al cargar los estudiantes:', error),
      complete: () => {
        this.isLoading = false; // Cambia el estado de carga a falso una vez que se cargan los estudiantes
        console.log('Carga de estudiantes completada');
      }
    });
  }

  onSaveStudent(id?: number): void {
    const student = id ? this.students.find(student => student.id === id) : null; // Busca el estudiante por ID si se proporciona uno
    const dialogRef = this.dialog.open(StudentsFormComponent, {
      width: '60vw',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      disableClose: true, // Deshabilita el cierre al hacer clic fuera del dialog
      data: { student: student } // Pasa los datos del estudiante al formulario
    });

    dialogRef.afterClosed().subscribe(result => {
      this.studentService.postStudent(result, id); // Guarda el nuevo estudiante o los cambios realizados
      this.loadStudents(); // Recarga la lista de estudiantes
    });
  }

  onDeleteStudent(id: number) {
    const dialogRef = this.dialog.open(StudentsDeleteComponent, {
      width: '250px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      autoFocus: false, // Deshabilita el enfoque automatico en el dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.studentService.deleteStudent(id); // Elimina el estudiante si se confirma
        this.loadStudents(); // Recarga la lista de estudiantes
      }
    });
  }
}
