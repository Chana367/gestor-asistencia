import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../services/students.service';
import { Observable } from 'rxjs';
import { Student } from '../../models';
import { InscriptionsService } from '../../../services/inscriptions.service';
import { Course } from '../../../courses/models/course.interface';
import { InscriptionsDeleteComponent } from '../../../inscriptions/components/inscriptions-delete/inscriptions-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { NonNullChain } from 'typescript';

@Component({
  selector: 'app-student-detail',
  standalone: false,
  templateUrl: './student-detail.component.html',
  styles: ``
})
export class StudentDetailComponent {

  student$!: Observable<Student | null>;
  courses$!: Observable<Course[] | null>;
  readonly dialog = inject(MatDialog);
  studentId!: string;

  constructor(private activatedRoute: ActivatedRoute, private studentsService: StudentsService, private inscriptionsService: InscriptionsService) {
    this.loadData(); // Carga los datos del estudiante y sus cursos al inicializar el componente
  }

  loadData(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) {
      throw new Error('Student ID not found in route');
    }
    this.studentId = id;
    this.student$ = this.studentsService.getStudentById(this.studentId);
    this.courses$ = this.inscriptionsService.getCoursesByStudentId(this.studentId)
  }

  onDeleteInscription(courseId: number) {
    const dialogRef = this.dialog.open(InscriptionsDeleteComponent, {
      width: '250px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      autoFocus: false, // Deshabilita el enfoque automatico en el dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.inscriptionsService.deleteInscriptionByIdStudentAndIdCourse(this.studentId, String(courseId)); // Elimina el inscripcion si se confirma
        this.loadData(); // Recarga los datos del estudiante y sus cursos
      }
    });
  }
}
