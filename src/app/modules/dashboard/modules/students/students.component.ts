import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';

import { Student } from './models';
import { User } from '../../../../core/models';
import { AuthService } from '../../../../core/services/auth.service';
import { StudentsFormComponent } from './components/students-form/students-form.component';
import { StudentsDeleteComponent } from './components/students-delete/students-delete.component';
import { StudentsActions } from './store/students.actions';
import {
  selectStudents,
  selectStudentsLoading,
  selectStudentsError
} from './store/students.selectors';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  students$: Observable<Student[] | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  authUser$: Observable<User | null>;

  constructor(
    private store: Store,
    private authService: AuthService
  ) {
    this.authUser$ = this.authService.authUser$;
    this.students$ = this.store.select(selectStudents);
    this.isLoading$ = this.store.select(selectStudentsLoading);
    this.error$ = this.store.select(selectStudentsError);
  }

  ngOnInit(): void {
    this.onLoadStudents();
  }

  async onSaveStudent(id?: number): Promise<void> {
    let student: Student | null = null;

    if (id) {
      const students = await firstValueFrom(this.students$);
      student = students?.find(s => s.id === id) ?? null;
    }

    const dialogRef = this.dialog.open(StudentsFormComponent, {
      width: '60vw',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      disableClose: true,
      data: { student }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (id) {
          this.store.dispatch(StudentsActions.updateStudent({ student: result }));
        } else {
          this.store.dispatch(StudentsActions.createStudent({ student: result }));
        }
      }
    });
  }

  onLoadStudents() {
    this.store.dispatch(StudentsActions.loadStudents());
  }

  onDeleteStudent(id: number): void {
    const dialogRef = this.dialog.open(StudentsDeleteComponent, {
      width: '250px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(StudentsActions.deleteStudent({ id }));
      }
    });
  }
}
