import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.interface';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { InscriptionsService } from '../../../services/inscriptions.service';
import { Student } from '../../../students/models';
import { InscriptionsDeleteComponent } from '../../../inscriptions/components/inscriptions-delete/inscriptions-delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-courses-detail',
  standalone: false,
  templateUrl: './courses-detail.component.html',
  styles: ``
})
export class CoursesDetailComponent {
  course$!: Observable<Course | null>;
  students$!: Observable<Student[] | null>;
  courseId!: string;
  readonly dialog = inject(MatDialog);
  
  constructor(private activatedRoute: ActivatedRoute, private coursesService: CoursesService, private inscriptionsService: InscriptionsService) {
    this.loadData(); // Load course data when the component initializes
  }

  loadData() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) {
      throw new Error('Course ID not found in route');
    }
    this.courseId = id;
    this.course$ = this.coursesService.getCourseById(this.courseId);
    this.students$ = this.inscriptionsService.getStudentsByCourseId(this.courseId)
  }

  onDeleteInscription(studentId: number) {
    const dialogRef = this.dialog.open(InscriptionsDeleteComponent, {
      width: '250px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      autoFocus: false, // Deshabilita el enfoque automatico en el dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.inscriptionsService.deleteInscriptionByIdStudentAndIdCourse(String(studentId), this.courseId); // Elimina el inscripcion si se confirma
        this.loadData(); // Recarga los datos del estudiante y sus cursos
      }
    });
  }
}
