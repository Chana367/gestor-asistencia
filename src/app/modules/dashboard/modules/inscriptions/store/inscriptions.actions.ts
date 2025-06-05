import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Inscription } from "../models/inscription.interface";

export const InscriptionsActions = createActionGroup({
  source: 'Inscriptions',
  events: {
    // Acciones sin argumentos, usamos emptyProps
    'Load Inscriptions': emptyProps(),
    // Accion satisfactoria
    'Load Inscriptions Success': props<{ inscriptions: Inscription[] }>(),
    // Accion de error
    'Load Inscriptions Failure': props<{ error: string }>(),

    'Create Inscription': props<{ inscription: Inscription }>(),
    'Create Inscription Success': props<{ inscription: Inscription }>(),
    'Create Inscription Failure': props<{ error: string }>(),

    'Update Inscription': props<{ inscription: Inscription }>(),
    'Update Inscription Success': props<{ inscription: Inscription }>(),
    'Update Inscription Failure': props<{ error: string }>(),
    
    'Delete Inscription': props<{ id: number }>(),
    'Delete Inscription Success': props<{ id: number }>(),
    'Delete Inscription Failure': props<{ error: string }>(),
  
  },
});