import { Injectable } from "@angular/core";
import { Student } from "../models";
import { Observable } from "rxjs";

const students: Student[] = [
  { id: 1, name: "Juan", lastName: "Pérez", email: "juan.perez@example.com", phone: "+54 11 1234-5678", age: 20 },
  { id: 2, name: "María", lastName: "González", email: "maria.gonzalez@example.com", phone: "+54 11 2345-6789", age: 22 },
  { id: 3, name: "Carlos", lastName: "López", email: "carlos.lopez@example.com", phone: "+54 11 3456-7890", age: 21 },
  { id: 4, name: "Ana", lastName: "Martínez", email: "ana.martinez@example.com", phone: "+54 11 4567-8901", age: 23 },
  { id: 5, name: "Luis", lastName: "Fernández", email: "luis.fernandez@example.com", phone: "+54 11 5678-9012", age: 24 }
];

@Injectable({ providedIn: 'root' })
export class StudentsService {

  getStudents() : Promise<Student[]> {
    const studentsPromise = new Promise<Student[]>((resolve, reject) => {
      setTimeout(() => {
        resolve(students);
        // reject('Error al cargar los estudiantes'); // Simula un error en la carga
      }, 1000); // Simula un retraso de 1 segundo
    });
    return studentsPromise;
  }

  getStudents$(): Observable<Student[]> {
    return new Observable<Student[]>((observer) => {
      setTimeout(() => {
        observer.next(students);
        observer.complete();
      }, 1000); // Simula un retraso de 1 segundo
    });
  }

}