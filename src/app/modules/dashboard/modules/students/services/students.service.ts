import { Injectable } from "@angular/core";
import { Student } from "../models";
import { map, Observable, of } from "rxjs";

let students: Student[] = [
  { id: 1, name: "Juan", lastName: "Pérez", email: "juan.perez@example.com", phone: "+54 11 1234-5678", age: 20 },
  { id: 2, name: "María", lastName: "González", email: "maria.gonzalez@example.com", phone: "+54 11 2345-6789", age: 22 },
  { id: 3, name: "Carlos", lastName: "López", email: "carlos.lopez@example.com", phone: "+54 11 3456-7890", age: 21 },
  { id: 4, name: "Ana", lastName: "Martínez", email: "ana.martinez@example.com", phone: "+54 11 4567-8901", age: 23 },
  { id: 5, name: "Luis", lastName: "Fernández", email: "luis.fernandez@example.com", phone: "+54 11 5678-9012", age: 24 }
];

@Injectable({ providedIn: 'root' })
export class StudentsService {

  getStudents$(): Observable<Student[]> {
    return new Observable<Student[]>((observer) => {
      observer.next(students);
      observer.complete();
    });
  }

  getStudentById(id: string | null): Observable<Student | null> {
    return of([...students]).pipe(
      map((students) => students.find((student) => student.id === Number(id)) || null),
    )
  }

  postStudent(newStudent: Student, id?: number): void {
    if (newStudent) {
      if (!id) {
        // Agregar el nuevo estudiante a la lista de estudiantes
        newStudent.id = students[students.length - 1].id + 1; // Asignar un ID unico
        students = [...students, newStudent]
        console.log('Nuevo estudiante agregado:', newStudent);
      } else {
        students = students.map(student => {
          if (student.id === id) {
            return { ...student, ...newStudent }; // Actualiza el estudiante existente
          }
          return student;
        });
      }
    }
  }

  deleteStudent(id: number): void {
    students = students.filter(student => student.id !== id); // Filtra el estudiante que se desea eliminar
    console.log('Estudiante eliminado:', id);
  }
}