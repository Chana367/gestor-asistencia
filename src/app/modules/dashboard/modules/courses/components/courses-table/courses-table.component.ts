import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models/course.interface';

@Component({
  selector: 'app-courses-table',
  standalone: false,
  templateUrl: './courses-table.component.html',
  styles: ``
})
export class CoursesTableComponent {
  displayedColumns: string[] = ['id', 'name', 'hours', 'actions'];

  @Input()
  dataSource: Course[] = [];
  
  @Output()
  deleteCourse = new EventEmitter<number>();

  @Output()
  editCourse = new EventEmitter<number>();
}
