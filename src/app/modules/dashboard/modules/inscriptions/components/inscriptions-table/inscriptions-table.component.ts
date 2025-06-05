import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Inscription } from '../../models/inscription.interface';
import { Student } from '../../../students/models';
import { Course } from '../../../courses/models/course.interface';
import { StudentsService } from '../../../students/services/students.service';
import { CoursesService } from '../../../courses/services/courses.service';
import { AuthService } from '../../../../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../../../../../core/models';

@Component({
  selector: 'app-inscriptions-table',
  standalone: false,
  templateUrl: './inscriptions-table.component.html',
  styles: ``
})
export class InscriptionsTableComponent {

  @Input()
  dataSource: Inscription[] = [];

  @Output()
  editInscription = new EventEmitter<number>();

  @Output()
  deleteInscription = new EventEmitter<number>();

  students: Student[] = []
  courses: Course[] = []

  displayedColumns: string[] = ['id', 'student-name', 'course-name', 'date-inscription', 'actions'];

  authUser$: Observable<User | null>;

  constructor(private studentService: StudentsService, private courseService: CoursesService,
    private authService: AuthService) {
    this.authUser$ = this.authService.authUser$;
    this.loadStudents(); // Carga los estudiantes usando un observable
    this.loadCourses(); // Carga los cursos usando un observable
  }

  getStudentName(studentId: number): string {
    const student = this.students.find(s => Number(s.id) === Number(studentId));
    return student ? `${student.name} ${student.lastName}` : 'Desconocido';
  }

  getCourseName(courseId: number): string {
    const course = this.courses.find(c => Number(c.id) === Number(courseId));
    return course ? course.name : 'Desconocido';
  }

  loadStudents() {
    this.studentService.getStudents$().subscribe({
      next: (students) => {
        this.students = students;
      },
      error: (error: any) => {
        console.error('Error al cargar los estudiantes:', error)
      }
    });
  }

  loadCourses() {
    this.courseService.getCourses$().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (error: any) => {
        console.error('Error al cargar los cursos:', error);
      }
    });
  }
}
