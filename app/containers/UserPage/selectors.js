import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the user state domain
 */

const selectUserPageDomain = state => state.userPage || initialState;

const makeSelectData = () =>
  createSelector(
    selectUserPageDomain,
    substate => substate.data
  );

const makeSelectSearch = () =>
  createSelector(
    selectUserPageDomain,
    substate => substate.search
  );

const makeSelectRoles = () =>
  createSelector(
    selectUserPageDomain,
    substate => substate.roles
  );

export { makeSelectData, makeSelectSearch, makeSelectRoles };
