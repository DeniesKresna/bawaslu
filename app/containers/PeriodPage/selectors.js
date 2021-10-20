import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the PeriodPage state domain
 */

const selectPeriodPageDomain = state => state.periodPage || initialState;

const makeSelectData = () =>
  createSelector(
    selectPeriodPageDomain,
    substate => substate.data
  );

const makeSelectSearch = () =>
  createSelector(
    selectPeriodPageDomain,
    substate => substate.search
  );

const makeSelectList = () =>
  createSelector(
    selectPeriodPageDomain,
    substate => substate.list
  );

export { makeSelectData, makeSelectSearch, makeSelectList };
