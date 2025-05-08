import { Component, inject } from '@angular/core';
import { Student } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentsFormComponent } from './components/students/components/students-form/students-form.component';
import { StudentsDeleteComponent } from './components/students-delete/students-delete.component';
import { StudentsService } from './services/students.service';

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

  constructor(private studentService: StudentsService) {
    // this.loadStudents(); // Carga los estudiantes al iniciar el componente
    this.loadStudentsObservable(); // Carga los estudiantes usando un observable
  }

  loadStudents(): void {
    this.studentService.getStudents().then((students) => {
      this.students = students;
      console.log('Estudiantes cargados:', this.students);
    }).catch((error) => {
      console.error('Error al cargar los estudiantes:', error);
    }).finally(() => this.isLoading = false); // Cambia el estado de carga a falso una vez que se cargan los estudiantes
  }

  loadStudentsObservable() {
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
    const student = id ? this.students.find(student => student.id === id) : null;

    const dialogRef = this.dialog.open(StudentsFormComponent, {
      width: '60vw',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      disableClose: true, // Deshabilita el cierre al hacer clic fuera del dialog
      data: { student: student } // Pasa los datos del estudiante al formulario
    });

    dialogRef.afterClosed().subscribe(result => {
      this.save(result, id); // Guarda el nuevo estudiante o los cambios realizados
    });
  }

  save(newStudent: Student, id?: number): void {
    if (newStudent) {
      if (!id) {
        // Agregar el nuevo estudiante a la lista de estudiantes
        newStudent.id = this.students[this.students.length - 1].id + 1; // Asignar un ID unico
        this.students = [...this.students, newStudent]
        console.log('Nuevo estudiante agregado:', newStudent);
      } else {
        this.students = this.students.map(student => {
          if (student.id === id) {
            return { ...student, ...newStudent }; // Actualiza el estudiante existente
          }
          return student;
        });
      }
    }

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
        console.log(`Eliminando estudiante con ID: ${id}`);
        this.students = this.students.filter((student) => student.id !== id);
      }
    });
  }
}
