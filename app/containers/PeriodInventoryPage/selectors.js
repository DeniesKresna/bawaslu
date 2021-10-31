import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the inventory state domain
 */

const selectPeriodInventoryPageDomain = state => state.periodInventoryPage || initialState;

const makeSelectData = () =>
  createSelector(
    selectPeriodInventoryPageDomain,
    substate => substate.data
  );

const makeSelectSearch = () =>
  createSelector(
    selectPeriodInventoryPageDomain,
    substate => substate.search
  );

const makeSelectFiltered = () =>
  createSelector(
    selectPeriodInventoryPageDomain,
    substate => substate.filtered
  );

export { makeSelectData, makeSelectSearch, makeSelectFiltered };
