import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../models';

@Component({
  selector: 'app-students-table',
  standalone: false,
  templateUrl: './students-table.component.html',
  styles: ``
})

export class StudentsTableComponent {
  displayedColumns: string[] = ['id', 'full-name', 'email', 'phone', 'age', 'actions'];

  @Input()
  dataSource: Student[] = [];
  
  @Output()
  deleteStudent = new EventEmitter<number>();

  @Output()
  editStudent = new EventEmitter<number>();
}
