import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the unitPage state domain
 */

const selectLoginPageDomain = state => state.loginPage || initialState;

const makeSelectUser = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate.user
  );

const makeSelectMessage = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate.message
  );

const makeSelectLoading = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate.isLoading
  );

export { makeSelectMessage, makeSelectLoading, makeSelectUser };
