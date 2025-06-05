import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of } from 'rxjs';
import { StudentsActions } from './students.actions';
import { StudentsService } from '../services/students.service';

@Injectable()
export class StudentsEffects {
  loadStudents$;
  createStudent$;
  updateStudent$;
  deleteStudent$;

  constructor(private actions$: Actions, private studentsService: StudentsService) {
    this.loadStudents$ = createEffect(() =>
      this.actions$.pipe(
        ofType(StudentsActions.loadStudents),
        concatMap(() =>
          this.studentsService.getStudents$().pipe(
            map((students) => StudentsActions.loadStudentsSuccess({ students })),
            catchError((error) =>
              of(StudentsActions.loadStudentsFailure({ error: error?.message || 'Error al cargar estudiantes.' }))
            )
          )
        )
      )
    );

    this.createStudent$ = createEffect(() =>
      this.actions$.pipe(
        ofType(StudentsActions.createStudent),
        concatMap(({ student }) =>
          this.studentsService.postStudent(student).pipe(
            map((created) => StudentsActions.createStudentSuccess({ student: created })),
            catchError((error) =>
              of(StudentsActions.createStudentFailure({ error: error?.message || 'No se pudo crear el estudiante.' }))
            )
          )
        )
      )
    );

    this.updateStudent$ = createEffect(() =>
      this.actions$.pipe(
        ofType(StudentsActions.updateStudent),
        mergeMap(({ student }) =>
          this.studentsService.updateStudent(student).pipe(
            map((updated) => StudentsActions.updateStudentSuccess({ student: updated })),
            catchError((error) =>
              of(StudentsActions.updateStudentFailure({ error: error?.message || 'No se pudo actualizar el estudiante.' }))
            )
          )
        )
      )
    );

    this.deleteStudent$ = createEffect(() =>
      this.actions$.pipe(
        ofType(StudentsActions.deleteStudent),
        concatMap(({ id }) =>
          this.studentsService.deleteStudent(id).pipe(
            map(() => StudentsActions.deleteStudentSuccess({ id })),
            catchError((error) =>
              of(StudentsActions.deleteStudentFailure({ error: error?.message || 'No se pudo eliminar el estudiante.' }))
            )
          )
        )
      )
    );
  }
}
