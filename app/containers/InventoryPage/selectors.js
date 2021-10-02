import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the inventory state domain
 */

const selectInventoryPageDomain = state => state.inventoryPage || initialState;

const makeSelectData = () =>
  createSelector(
    selectInventoryPageDomain,
    substate => substate.data
  );

const makeSelectSearch = () =>
  createSelector(
    selectInventoryPageDomain,
    substate => substate.search
  );

export { makeSelectData, makeSelectSearch };
