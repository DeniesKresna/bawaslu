import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the conditionPage state domain
 */

const selectConditionPageDomain = state => state.conditionPage || initialState;

const makeSelectData = () =>
  createSelector(
    selectConditionPageDomain,
    substate => substate.data
  );

const makeSelectSearch = () =>
  createSelector(
    selectConditionPageDomain,
    substate => substate.search
  );

const makeSelectList = () =>
  createSelector(
    selectConditionPageDomain,
    substate => substate.list
  );

export { makeSelectData, makeSelectSearch, makeSelectList };
