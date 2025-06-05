import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of } from 'rxjs';
import { InscriptionsService } from '../../services/inscriptions.service';
import { InscriptionsActions } from './inscriptions.actions';

@Injectable()
export class InscriptionsEffects {
  loadInscriptions$;
  createInscription$;
  updateInscription$;
  deleteInscription$;

  constructor(private actions$: Actions, private inscriptionsService: InscriptionsService) {
    this.loadInscriptions$ = createEffect(() => {
      return this.actions$.pipe(
        // Interceptar la acción de cargar inscripciones
        ofType(InscriptionsActions.loadInscriptions),
        // Después de interceptar la acción, ejecutar el servicio para obtener las inscripciones
        concatMap(() =>
          this.inscriptionsService.getInscriptions$().pipe(
            // Mapear la respuesta del servicio a la acción de éxito
            map((inscriptions) => InscriptionsActions.loadInscriptionsSuccess({ inscriptions })),
            // Manejar errores y mapearlos a la acción de fallo
            catchError((error) =>
              of(InscriptionsActions.loadInscriptionsFailure({ error: error.message }))
            )
          )
        )
      );
    });

    this.createInscription$ = createEffect(() =>
      this.actions$.pipe(
        ofType(InscriptionsActions.createInscription),
        concatMap(({ inscription }) =>
          this.inscriptionsService.postInscription(inscription).pipe(
            map((created) => InscriptionsActions.createInscriptionSuccess({ inscription: created })),
            catchError((error) =>
              of(InscriptionsActions.createInscriptionFailure({ error: error?.message || 'No se pudo crear la inscripción.' }))
            )
          )
        )
      )
    );

    this.updateInscription$ = createEffect(() =>
      this.actions$.pipe(
        ofType(InscriptionsActions.updateInscription),
        mergeMap(({ inscription }) =>
          this.inscriptionsService.updateInscription(inscription).pipe(
            map((updated) => InscriptionsActions.updateInscriptionSuccess({ inscription: updated })),
            catchError((error) =>
              of(InscriptionsActions.updateInscriptionFailure({ error: error?.message || 'No se pudo actualizar la inscripción.' }))
            )
          )
        )
      )
    );

    this.deleteInscription$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(InscriptionsActions.deleteInscription),
        concatMap(({ id }) =>
          this.inscriptionsService.deleteInscription(id).pipe(
            map(() => InscriptionsActions.deleteInscriptionSuccess({ id })),
            catchError((error) =>
              of(InscriptionsActions.deleteInscriptionFailure({ error: error?.message || 'No se pudo eliminar la inscripción.' }))
            )
          )
        )
      );
    });
  }

}