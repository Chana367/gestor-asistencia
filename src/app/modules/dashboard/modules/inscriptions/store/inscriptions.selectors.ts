import { createFeatureSelector, createSelector } from '@ngrx/store';
import { INSCRIPTIONS_FEATURE_KEY, InscriptionsState } from './inscriptions.reducer';

export const selectInscriptionsState =
  createFeatureSelector<InscriptionsState>(INSCRIPTIONS_FEATURE_KEY);

export const selectInscriptions = createSelector(
  selectInscriptionsState,
  (state) => state.inscriptions
);

export const selectInscriptionsLoading = createSelector(
  selectInscriptionsState,
  (state) => state.loading
);

export const selectInscriptionsError = createSelector(
  selectInscriptionsState,
  (state) => state.error
);