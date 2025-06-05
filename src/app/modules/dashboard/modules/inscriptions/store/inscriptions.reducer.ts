import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionsActions } from './inscriptions.actions';
import { Inscription } from '../models/inscription.interface';

export const INSCRIPTIONS_FEATURE_KEY = 'inscriptions';

export interface InscriptionsState {
  inscriptions: Inscription[];
  loading: boolean;
  error: string | null;
}

const initialState: InscriptionsState = {
  inscriptions: [],
  loading: false,
  error: null,
};

const inscriptionsReducer = createReducer(
  initialState,
  on(InscriptionsActions.loadInscriptions, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(InscriptionsActions.loadInscriptionsSuccess, (state, action) => ({
    ...state,
    inscriptions: action.inscriptions,
    loading: false,
    error: null,
  })),
  on(InscriptionsActions.loadInscriptionsFailure, (state, action) => ({
    ...state,
    loading: false,
    inscriptions: [],
    error: action.error,
  })),
  on(InscriptionsActions.createInscription, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(InscriptionsActions.createInscriptionSuccess, (state, action) => ({
    ...state,
    inscriptions: [...state.inscriptions, action.inscription],
    loading: false,
    error: null,
  })),
  on(InscriptionsActions.createInscriptionFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(InscriptionsActions.updateInscription, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(InscriptionsActions.updateInscriptionSuccess, (state, action) => ({
    ...state,
    inscriptions: state.inscriptions.map(insc =>
      insc.id === action.inscription.id ? action.inscription : insc
    ),
    loading: false,
    error: null,
  })),
  on(InscriptionsActions.updateInscriptionFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(InscriptionsActions.deleteInscription, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(InscriptionsActions.deleteInscriptionSuccess, (state, action) => ({
    ...state,
    inscriptions: state.inscriptions.filter(insc => insc.id !== action.id),
    loading: false,
    error: null,
  })),
  on(InscriptionsActions.deleteInscriptionFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  }))
);

export const inscriptionsFeature = createFeature({
  name: INSCRIPTIONS_FEATURE_KEY,
  reducer: inscriptionsReducer,
});
