import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of } from 'rxjs';
import { CoursesActions } from './courses.actions';
import { CoursesService } from '../services/courses.service';

@Injectable()
export class CoursesEffects {
  loadCourses$;
  createCourse$;
  updateCourse$;
  deleteCourse$;

  constructor(private actions$: Actions, private coursesService: CoursesService) {
    this.loadCourses$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CoursesActions.loadCourses),
        concatMap(() =>
          this.coursesService.getCourses$().pipe(
            map((courses) => CoursesActions.loadCoursesSuccess({ courses })),
            catchError((error) =>
              of(CoursesActions.loadCoursesFailure({ error: error.message }))
            )
          )
        )
      );
    });

    this.createCourse$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CoursesActions.createCourse),
        concatMap(({ course }) =>
          this.coursesService.postCourse(course).pipe(
            map((created) => CoursesActions.createCourseSuccess({ course: created })),
            catchError((error) =>
              of(CoursesActions.createCourseFailure({ error: error?.message || 'No se pudo crear el curso.' }))
            )
          )
        )
      )
    );

    this.updateCourse$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CoursesActions.updateCourse),
        mergeMap(({ course }) =>
          this.coursesService.updateCourse(course).pipe(
            map((updated) => CoursesActions.updateCourseSuccess({ course: updated })),
            catchError((error) =>
              of(CoursesActions.updateCourseFailure({ error: error?.message || 'No se pudo actualizar el curso.' }))
            )
          )
        )
      )
    );

    this.deleteCourse$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CoursesActions.deleteCourse),
        concatMap(({ id }) =>
          this.coursesService.deleteCourse(id).pipe(
            map(() => CoursesActions.deleteCourseSuccess({ id })),
            catchError((error) =>
              of(CoursesActions.deleteCourseFailure({ error: error?.message || 'No se pudo eliminar el curso.' }))
            )
          )
        )
      );
    });
  }
}
