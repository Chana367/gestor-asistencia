import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../services/students.service';
import { Observable } from 'rxjs';
import { Student } from '../../models';

@Component({
  selector: 'app-student-detail',
  standalone: false,
  templateUrl: './student-detail.component.html',
  styles: ``
})
export class StudentDetailComponent {
  student$: Observable<Student | null>;

  constructor(private activatedRoute: ActivatedRoute, private studentsService: StudentsService) { 
    const studentId = this.activatedRoute.snapshot.paramMap.get('id');
    this.student$ = this.studentsService.getStudentById(studentId);
    console.log('Student ID:', studentId);
    console.log('Student:', this.student$);
  }

}
