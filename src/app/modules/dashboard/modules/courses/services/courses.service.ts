import { Injectable } from '@angular/core';
import { Course } from '../models/course.interface';
import { map, Observable, of } from 'rxjs';

let courses: Course[] = [
  { id: 1, name: 'Angular', hours: 40 },
  { id: 2, name: 'React', hours: 35 },
  { id: 3, name: 'Diseño Web', hours: 25 },
  { id: 4, name: 'Oratoria', hours: 20 },
  { id: 5, name: 'Backend', hours: 50 }
];

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  getCourses$(): Observable<Course[]> {
    return new Observable<Course[]>((observer) => {
      observer.next(courses);
      observer.complete();
    });
  }

  getCourseById(id: string | null): Observable<Course | null> {
    return of([...courses]).pipe(
      map((courses) => courses.find((course) => course.id === Number(id)) || null),
    )
  }

  postCourse(newCourse: Course, id?: number): void {
    if (newCourse) {
      if (!id) {
        // Agregar el nuevo curso a la lista de cursos
        newCourse.id = courses[courses.length - 1].id + 1; // Asignar un ID unico
        courses = [...courses, newCourse]
        console.log('Nuevo curso agregado:', newCourse);
      } else {
        courses = courses.map(course => {
          if (course.id === id) {
            return { ...course, ...newCourse }; // Actualiza el curso existente
          }
          return course;
        });
      }
    }
  }

  deleteCourse(id: number): void {
    courses = courses.filter(course => course.id !== id); // Filtra el curso que se desea eliminar
    console.log('Curso eliminado:', id);
  }

}
