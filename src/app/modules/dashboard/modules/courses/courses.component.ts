import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';

import { Course } from './models/course.interface';
import { User } from '../../../../core/models';
import { AuthService } from '../../../../core/services/auth.service';
import { CoursesFormComponent } from './components/courses-form/courses-form.component';
import { CoursesDeleteComponent } from './components/courses-delete/courses-delete.component';
import { CoursesActions } from './store/courses.actions';
import {
  selectCourses,
  selectCoursesLoading,
  selectCoursesError
} from './store/courses.selectors';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html'
})
export class CoursesComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  courses$: Observable<Course[] | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  authUser$: Observable<User | null>;

  constructor(
    private store: Store,
    private authService: AuthService
  ) {
    this.authUser$ = this.authService.authUser$;
    this.courses$ = this.store.select(selectCourses);
    this.isLoading$ = this.store.select(selectCoursesLoading);
    this.error$ = this.store.select(selectCoursesError);
  }

  ngOnInit(): void {
    this.onLoadCourses();
  }

  async onSaveCourse(id?: number): Promise<void> {
    let course: Course | null = null;

    if (id) {
      const courses = await firstValueFrom(this.courses$);
      course = courses?.find(c => c.id === id) ?? null;
    }
    console.log(course)
    const dialogRef = this.dialog.open(CoursesFormComponent, {
      width: '60vw',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      disableClose: true,
      data: { course }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (id) {
          this.store.dispatch(CoursesActions.updateCourse({ course: result }));
        } else {
          this.store.dispatch(CoursesActions.createCourse({ course: result }));
        }
      }
    });
  }

  onLoadCourses() {
    this.store.dispatch(CoursesActions.loadCourses());
  }

  onDeleteCourse(id: number): void {
    const dialogRef = this.dialog.open(CoursesDeleteComponent, {
      width: '250px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(CoursesActions.deleteCourse({ id }));
      }
    });
  }
}
