import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the inventory detail state domain
 */

const selectInventoryDetailDialogPageDomain = state => state.inventoryDetailDialogPage || initialState;

const makeSelectRowData = () =>
  createSelector(
    selectInventoryDetailDialogPageDomain,
    substate => substate.rowData
  );

const makeSelectIsBusy = () =>
  createSelector(
    selectInventoryDetailDialogPageDomain,
    substate => substate.busy
  );

const makeSelectActivePeriod = () =>
  createSelector(
    selectInventoryDetailDialogPageDomain,
    substate => substate.activePeriod
  );

export { makeSelectRowData, makeSelectIsBusy, makeSelectActivePeriod };
