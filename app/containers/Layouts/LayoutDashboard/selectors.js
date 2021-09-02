import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the unitPage state domain
 */

const selectLayoutDashboardDomain = state => state.layoutDashboard || initialState;

const makeSelectData = () =>
  createSelector(
    selectLayoutDashboardDomain,
    substate => substate
  );

const makeSelectNotifStatus = () =>
  createSelector(
    selectLayoutDashboardDomain,
    substate => substate.notifStatus
  );

export { makeSelectData, makeSelectNotifStatus };
