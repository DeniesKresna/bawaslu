import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the unitPage state domain
 */

const selectUnitPageDomain = state => state.unitPage || initialState;

const makeSelectData = () =>
  createSelector(
    selectUnitPageDomain,
    substate => substate.data
  );

const makeSelectSearch = () =>
  createSelector(
    selectUnitPageDomain,
    substate => substate.search
  );

const makeSelectList = () =>
  createSelector(
    selectUnitPageDomain,
    substate => substate.list
  );

export { makeSelectData, makeSelectSearch, makeSelectList };
