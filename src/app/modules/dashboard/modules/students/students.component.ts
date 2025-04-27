import { Component, inject } from '@angular/core';
import { Student } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentsFormComponent } from './components/students/components/students-form/students-form.component';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {
  students: Student[] = [
    {
      id: 1,
      name: 'Juan',
      lastName: 'Pérez',
      email: 'juan.perez@example.com',
      phone: '+54 11 1234-5678',
      age: 20
    },
    {
      id: 2,
      name: 'María',
      lastName: 'González',
      email: 'maria.gonzalez@example.com',
      phone: '+54 11 2345-6789',
      age: 22
    },
    {
      id: 3,
      name: 'Carlos',
      lastName: 'López',
      email: 'carlos.lopez@example.com',
      phone: '+54 11 3456-7890',
      age: 21
    },
    {
      id: 4,
      name: 'Ana',
      lastName: 'Martínez',
      email: 'ana.martinez@example.com',
      phone: '+54 11 4567-8901',
      age: 23
    },
    {
      id: 5,
      name: 'Luis',
      lastName: 'Fernández',
      email: 'luis.fernandez@example.com',
      phone: '+54 11 5678-9012',
      age: 20
    }
  ];

  readonly dialog = inject(MatDialog);

  constructor() {}

  onStudentNew(id?: number): void {
    const student = id ? this.students.find(student => student.id === id) : null;
  
    const dialogRef = this.dialog.open(StudentsFormComponent, {
      width: '50vw',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      disableClose: true, // Deshabilita el cierre al hacer clic fuera del dialog
      data: { student: student } // Pasa los datos del estudiante al formulario
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Resultado del formulario:', result);
        if (!id) {
          this.onStudentCreate(result); // Crea un nuevo estudiante si no hay ID
        }
      }
    });
  }

  onStudentCreate(newStudent: Student) {
    // Agregar el nuevo estudiante a la lista de estudiantes
    newStudent.id = this.students[this.students.length - 1].id + 1; // Asignar un ID unico
    this.students = [...this.students, newStudent]
    console.log('Nuevo estudiante agregado:', newStudent);
  }

  onDeleteStudent(id: number) {
    if(confirm('¿Estás seguro de que deseas eliminar este estudiante?')) {
      console.log(`Eliminando estudiante con ID: ${id}`);
      this.students = this.students.filter(student => student.id !== id);
    }
  }
}
