import { Component, inject, OnInit } from '@angular/core';
import { Student } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentsFormComponent } from './components/students/components/students-form/students-form.component';
import { HttpClient } from '@angular/common/http';
import { StudentsDeleteComponent } from './components/students-delete/students-delete.component';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];

  readonly dialog = inject(MatDialog);

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Student[]>('data/students.json').subscribe(data => {
      this.students = data;
    }, (error) => {
      console.error('Error al cargar los datos de estudiantes:', error);
      this.students = []; // Manejo de error: inicializa la lista de estudiantes vacía
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
