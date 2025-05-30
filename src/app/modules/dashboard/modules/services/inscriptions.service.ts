import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Inscription } from '../inscriptions/models/inscription.interface';
import { Course } from '../courses/models/course.interface';
import { CoursesService } from '../courses/services/courses.service';
import { Student } from '../students/models';
import { StudentsService } from '../students/services/students.service';

@Injectable({ providedIn: 'root' })

export class InscriptionsService {

  private inscriptions: Inscription[] = [];
  private inscriptionsSubject = new BehaviorSubject<Inscription[]>([]);
  inscriptions$ = this.inscriptionsSubject.asObservable();

  private apiUrl = 'http://localhost:3000/inscriptions';

  constructor(private http: HttpClient, private courseService: CoursesService, private studentsService: StudentsService) {
    // Cargar inscripciones iniciales desde la API
    this.http.get<Inscription[]>(this.apiUrl).subscribe({
      next: (response) => {
        if (response && response.length > 0) {
          this.inscriptions = response;
          this.inscriptionsSubject.next(this.inscriptions);
        } else {
          console.warn('No se encontraron inscripciones');
        }
      },
      error: (err) => {
        console.error('Error al obtener inscripciones:', err);
      }
    });
  }

  getInscriptions$(): Observable<Inscription[]> {
    return this.inscriptions$;
  }

  getInscriptionById(id: string | null): Observable<Inscription | null> {
    return this.http.get<Inscription[]>(`${this.apiUrl}?id=${id}`).pipe(
      map((response) => (response && response.length > 0 ? response[0] : null))
    );
  }

  getCoursesByStudentId(studentId: string | null): Observable<Course[]> {
    return this.http.get<Inscription[]>(`${this.apiUrl}?id_student=${studentId}`)
      .pipe(
        switchMap((inscripciones: Inscription[]) => {
          const courseIds = inscripciones.map(i => String(i.id_course));
          if (!courseIds || courseIds.length === 0) {
            return of([]); // Retorna un observable vacío si no hay cursos
          }
          return this.courseService.getCoursesByIds(courseIds);
        }),
        map((courses: Course[] | null) => courses ?? [])
      );
  }

  getStudentsByCourseId(courseId: string | null): Observable<Student[]> {
    return this.http.get<Inscription[]>(`${this.apiUrl}?id_course=${courseId}`)
      .pipe(
        switchMap((inscripciones: Inscription[]) => {
          const studentsIds = inscripciones.map(i => String(i.id_student));
          if (!studentsIds || studentsIds.length === 0) {
            return of([]); // Retorna un observable vacío si no hay cursos
          }
          return this.studentsService.getStudentsByIds(studentsIds);
        }),
        map((students: Student[] | null) => students ?? [])
      );
  }

  // Elimina una inscripción por id_student e id_course
  deleteInscriptionByIdStudentAndIdCourse(studentId: string, courseId: string): void {
    // Primero obtenemos la inscripción con esos campos
    this.http.get<Inscription[]>(`${this.apiUrl}?id_student=${studentId}&id_course=${courseId}`).subscribe({
      next: (inscripciones) => {
        if (inscripciones && inscripciones.length > 0) {
          const inscriptionId = inscripciones[0].id;
          this.deleteInscription(inscriptionId);
        } else {
          console.warn(`No se encontró inscripción para estudiante ${studentId} y curso ${courseId}`);
        }
      },
      error: (err) => {
        console.error('Error al buscar inscripción:', err);
      }
    });
  }
  postInscription(newInscription: Inscription, id?: number): void {
    if (newInscription) {
      if (!id) {
        // POST: Crear nueva inscripción
        this.http.post<Inscription>(this.apiUrl, newInscription).subscribe({
          next: (createdInscription) => {
            this.inscriptions = [...this.inscriptions, createdInscription];
            this.inscriptionsSubject.next(this.inscriptions);
          },
          error: (err) => {
            console.error('Error al agregar inscripción:', err);
          }
        });
      } else {
        // PUT: Actualizar inscripción existente
        this.http.put<Inscription>(`${this.apiUrl}/${id}`, newInscription).subscribe({
          next: (updatedInscription) => {
            this.inscriptions = this.inscriptions.map((inscription) =>
              inscription.id === id ? updatedInscription : inscription
            );
            this.inscriptionsSubject.next(this.inscriptions);
          },
          error: (err) => {
            console.error('Error al actualizar inscripción:', err);
          }
        });
      }
    }
  }

  deleteInscription(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.inscriptions = this.inscriptions.filter((inscription) => inscription.id !== id);
        this.inscriptionsSubject.next(this.inscriptions);
      },
      error: (err) => {
        console.error('Error al eliminar inscripción:', err);
      }
    });
  }
}
