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

  constructor(private http: HttpClient) {}

  getCourses$(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
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

  postCourse(newCourse: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, newCourse);
  }

  updateCourse(updatedCourse: Course): Observable<Course> {
    const id = updatedCourse.id;
    console.log('Updating course with ID:', id);
    console.log('Updated course data:', updatedCourse);
    return this.http.put<Course>(`${this.apiUrl}/${id}`, updatedCourse);
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
