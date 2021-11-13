import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sidebar state domain
 */

const selectSidebarDomain = state => state.sidebar || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Sidebar
 */

const makeSelectSidebar = () =>
  createSelector(
    selectSidebarDomain,
    substate => substate,
  );

const makeSelectUser = () =>
  createSelector(
    selectSidebarDomain,
    substate => substate.user
  );

export { makeSelectUser };
