import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Inscription } from '../../models/inscription.interface';
import { Student } from '../../../students/models';
import { Course } from '../../../courses/models/course.interface';
import { StudentsService } from '../../../students/services/students.service';
import { CoursesService } from '../../../courses/services/courses.service';

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

  constructor(private studentService: StudentsService, private courseService: CoursesService) {
    this.loadStudents(); // Carga los estudiantes usando un observable
    this.loadCourses(); // Carga los cursos usando un observable
  }

  getStudentName(studentId: number): string {
    const student = this.students.find(s => s.id === studentId);
    return student ? `${student.name} ${student.lastName}` : 'Desconocido';
  }

  getCourseName(courseId: number): string {
    const course = this.courses.find(c => c.id === courseId);
    return course ? course.name : 'Desconocido';
  }

  loadStudents() {
    this.studentService.getStudents$().subscribe({
      next: (students) => {
        this.students = students;
        console.log('Estudiantes cargados:', this.students);
      },
      error: (error: any) => console.error('Error al cargar los estudiantes:', error),
      complete: () => {
        console.log('Carga de estudiantes completada');
      }
    });
  }

  
  loadCourses() {
    this.courseService.getCourses$().subscribe({
      next: (courses) => {
        this.courses = courses;
        console.log('Cursos cargados:', this.courses);
      },
      error: (error: any) => console.error('Error al cargar los cursos:', error),
      complete: () => {
        console.log('Carga de cursos completada');
      }
    });
  }
}
