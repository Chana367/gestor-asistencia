import { Component, inject } from '@angular/core';
import { Course } from './models/course.interface';
import { CoursesService } from './services/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { CoursesFormComponent } from './components/courses-form/courses-form.component';
import { CoursesDeleteComponent } from './components/courses-delete/courses-delete.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../../../core/models';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html'
})
export class CoursesComponent {
  courses: Course[] = [];
  isLoading: boolean = true; // Variable para controlar el estado de carga
  readonly dialog = inject(MatDialog);
  authUser$: Observable<User | null>;

  constructor(private courseService: CoursesService, private authService: AuthService) {
    this.authUser$ = this.authService.authUser$;
    this.loadCourses(); // Carga los cursos usando un observable
  }

  loadCourses() {
    this.courseService.getCourses$().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.isLoading = false; // Cambia el estado de carga a falso una vez que se cargan los cursos
        console.log('Cursos cargados:', this.courses);
      },
      error: (error: any) =>{
        this.isLoading = false; // Cambia el estado de carga a falso una vez que se cargan los cursos
        console.error('Error al cargar los cursos:', error);
      } 
    });
  }

  onSaveCourse(id?: number): void {
    const course = id ? this.courses.find(course => course.id === id) : null; // Busca el curso por ID si se proporciona uno
    const dialogRef = this.dialog.open(CoursesFormComponent, {
      width: '60vw',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      disableClose: true, // Deshabilita el cierre al hacer clic fuera del dialog
      data: { course: course } // Pasa los datos del curso al formulario
    });

    dialogRef.afterClosed().subscribe(result => {
      this.courseService.postCourse(result, id); // Guarda el nuevo curso o los cambios realizados
      this.loadCourses(); // Recarga la lista de cursos
    });
  }

  onDeleteCourse(id: number) {
    const dialogRef = this.dialog.open(CoursesDeleteComponent, {
      width: '250px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      autoFocus: false, // Deshabilita el enfoque automatico en el dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.courseService.deleteCourse(id); // Elimina el curso si se confirma
        this.loadCourses(); // Recarga la lista de cursos
      }
    });
  }
}
