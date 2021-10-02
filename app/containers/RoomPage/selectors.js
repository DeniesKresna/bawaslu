import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the roomPage state domain
 */

const selectRoomPageDomain = state => state.roomPage || initialState;

const makeSelectData = () =>
  createSelector(
    selectRoomPageDomain,
    substate => substate.data
  );

const makeSelectSearch = () =>
  createSelector(
    selectRoomPageDomain,
    substate => substate.search
  );

const makeSelectList = () =>
  createSelector(
    selectRoomPageDomain,
    substate => substate.list
  );

export { makeSelectData, makeSelectSearch, makeSelectList };
