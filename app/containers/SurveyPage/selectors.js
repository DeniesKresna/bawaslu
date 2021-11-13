import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the SurveyPage state domain
 */

const selectSurveyPageDomain = state => state.surveyPage || initialState;

const makeSelectData = () =>
  createSelector(
    selectSurveyPageDomain,
    substate => substate.data
  );

const makeSelectSearch = () =>
  createSelector(
    selectSurveyPageDomain,
    substate => substate.search
  );

const makeSelectList = () =>
  createSelector(
    selectSurveyPageDomain,
    substate => substate.list
  );

const makeSelectRow = () =>
  createSelector(
    selectSurveyPageDomain,
    substate => substate.row
  );

export { makeSelectData, makeSelectSearch, makeSelectList, makeSelectRow };
