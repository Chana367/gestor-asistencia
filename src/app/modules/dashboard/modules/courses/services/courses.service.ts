import { Injectable } from '@angular/core';
import { Course } from '../models/course.interface';
import { map, Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CoursesService {

  private courses: Course[] = [];
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$ = this.coursesSubject.asObservable();

  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {
    this.http
      .get<Course[]>(this.apiUrl)
      .subscribe({
        next: (response) => {
          if (response && response.length > 0) {
            this.courses = response;
            this.coursesSubject.next(this.courses);
          } else {
            alert('No se encontraron cursos');
          }
        },
        error: (err) => {
          console.error('Error al obtener cursos:', err);
        }
      });
  }

  getCourses$(): Observable<Course[]> {
    return this.courses$;
  }

  getCourseById(id: string | null): Observable<Course | null> {
    return this.http
      .get<Course[]>(`${this.apiUrl}?id=${id}`)
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

  getCoursesByIds(ids: string[] | null): Observable<Course[]> {
    if (!ids || ids.length === 0) {
      return of([]);
    }
    const filteredCourses = this.courses.filter((course: Course) => ids && ids.includes(String(course.id)));
    return of(filteredCourses);
  }

  postCourse(newCourse: Course, id?: number): void {
    if (newCourse) {
      if (!id) {
        this.http.post<Course>(`${this.apiUrl}`, newCourse).subscribe({
          next: (createdCourse) => {
            this.courses = [...this.courses, createdCourse];
            this.coursesSubject.next(this.courses);
          },
          error: (err) => {
            console.error('Error al agregar estudiante:', err);
          }
        });
      } else {
        // PUT: Actualizar curso existente
        this.http.put<Course>(`${this.apiUrl}/${id}`, newCourse).subscribe({
          next: (updatedCourse) => {
            this.courses = this.courses.map((course: Course) =>
              course.id === id ? updatedCourse : course
            );
            this.coursesSubject.next(this.courses);
            console.log('Estudiante actualizado:', updatedCourse);
          },
          error: (err) => {
            console.error('Error al actualizar estudiante:', err);
          }
        });
      }
    }
  }


  deleteCourse(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.courses = this.courses.filter((course: Course) => course.id !== id);
        this.coursesSubject.next(this.courses);
        console.log('Curso eliminado:', id);
      },
      error: (err) => {
        console.error('Error al eliminar curso:', err);
      }
    });
  }

}
