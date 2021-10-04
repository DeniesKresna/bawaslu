import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the historyPage state domain
 */

const selectHistoryPageDomain = state => state.historyPage || initialState;

const makeSelectData = () =>
  createSelector(
    selectHistoryPageDomain,
    substate => substate.data
  );

const makeSelectSearch = () =>
  createSelector(
    selectHistoryPageDomain,
    substate => substate.search
  );

const makeSelectList = () =>
  createSelector(
    selectHistoryPageDomain,
    substate => substate.list
  );

export { makeSelectData, makeSelectSearch, makeSelectList };
