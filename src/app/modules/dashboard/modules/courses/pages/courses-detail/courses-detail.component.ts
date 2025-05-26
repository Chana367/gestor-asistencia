import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.interface';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses-detail',
  standalone: false,
  templateUrl: './courses-detail.component.html',
  styles: ``
})
export class CoursesDetailComponent {
  course$: Observable<Course | null>;

  constructor(private activatedRoute: ActivatedRoute, private coursesService: CoursesService) { 
    const courseId = this.activatedRoute.snapshot.paramMap.get('id');
    this.course$ = this.coursesService.getCourseById(courseId);
  }
}
