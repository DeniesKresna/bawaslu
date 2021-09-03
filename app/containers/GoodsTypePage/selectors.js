import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the goodTypes state domain
 */

const selectGoodsTypePageDomain = state => state.goodsTypePage || initialState;

const makeSelectData = () =>
  createSelector(
    selectGoodsTypePageDomain,
    substate => substate.data
  );

const makeSelectSearch = () =>
  createSelector(
    selectGoodsTypePageDomain,
    substate => substate.search
  );

export { makeSelectData, makeSelectSearch };
