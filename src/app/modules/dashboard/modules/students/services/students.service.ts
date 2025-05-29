import { Injectable } from "@angular/core";
import { Student } from "../models";
import { map, Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class StudentsService {

  private students: Student[] = [];
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  students$ = this.studentsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.http
      .get<Student[]>(
        `http://localhost:3000/students`
      )
      .subscribe({
        next: (response) => {
          if (response && response.length > 0) {
            this.students = response;
            this.studentsSubject.next(this.students);
          } else {
            alert('Invalid username or password');
          }
        },
      });
  }

  getStudents$(): Observable<Student[]> {
    return this.students$;
  }

  getStudentById(id: string | null): Observable<Student | null> {
    return this.http
      .get<Student[]>(
        `http://localhost:3000/students?id=${id}`
      )
      .pipe(
        map((response) => {
          if (response && response.length > 0) {
            return response[0];
          } else {
            return null;
          }
        })
      );
  }

  getStudentsByIds(ids: string[] | null): Observable<Student[]> {
    if (!ids || ids.length === 0) {
      return of([]);
    }
    const filteredStudents = this.students.filter((student: Student) => ids && ids.includes(String(student.id)));
    return of(filteredStudents);
  }
  postStudent(newStudent: Student, id?: number): void {
    if (newStudent) {
      if (!id) {
        // Crear nuevo estudiante en el backend
        this.http.post<Student>('http://localhost:3000/students', newStudent).subscribe({
          next: (createdStudent) => {
            this.students = [...this.students, createdStudent];
            this.studentsSubject.next(this.students);
            console.log('Nuevo estudiante agregado:', createdStudent);
          },
          error: (err) => {
            console.error('Error al agregar estudiante:', err);
          }
        });
      } else {
        // Actualizar estudiante existente en el backend
        this.http.put<Student>(`http://localhost:3000/students/${id}`, newStudent).subscribe({
          next: (updatedStudent) => {
            this.students = this.students.map((student: Student) =>
              student.id === id ? updatedStudent : student
            );
            this.studentsSubject.next(this.students);
            console.log('Estudiante actualizado:', updatedStudent);
          },
          error: (err) => {
            console.error('Error al actualizar estudiante:', err);
          }
        });
      }
    }
  }

  deleteStudent(id: number): void {
    this.http.delete(`http://localhost:3000/students/${id}`).subscribe({
      next: () => {
        this.students = this.students.filter((student: Student) => student.id !== id);
        this.studentsSubject.next(this.students);
        console.log('Estudiante eliminado:', id);
      },
      error: (err) => {
        console.error('Error al eliminar estudiante:', err);
      }
    });
  }
}