import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { StudentsFormComponent } from './components/students/components/students-form/students-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { StudentFullnamePipe } from './pipes/student-fullname.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { StudentsDeleteComponent } from './components/students-delete/students-delete.component';
import { StudentsService } from './services/students.service';

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
    MatTableModule, MatFormFieldModule,
    MatInputModule,
    MatIconModule, MatButtonModule,
    MatDialogModule
  ],
  exports: [
    StudentsComponent
  ]
})
export class StudentsModule { }
