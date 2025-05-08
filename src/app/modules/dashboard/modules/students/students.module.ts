import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentsFormComponent } from './components/students/components/students-form/students-form.component';
import { StudentFullnamePipe } from './pipes/student-fullname.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { StudentsDeleteComponent } from './components/students-delete/students-delete.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentsTableComponent,
    StudentsFormComponent,
    StudentsDeleteComponent,
    StudentFullnamePipe,
    HighlightDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StudentsRoutingModule,
    SharedModule
  ],
  exports: [
    StudentsComponent
  ]
})
export class StudentsModule { }
