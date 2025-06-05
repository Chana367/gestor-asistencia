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
  private apiUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) { }

  getStudents$(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
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

  postStudent(newStudent: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, newStudent);
  }

  updateStudent(updatedStudent: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${updatedStudent.id}`, updatedStudent);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}