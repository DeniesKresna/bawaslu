import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the barcodePage state domain
 */

const selectBarcodePageDomain = state => state.barcodePage || initialState;

const makeSelectData = () =>
  createSelector(
    selectBarcodePageDomain,
    substate => substate.data
  );

const makeSelectDataExist = () =>
  createSelector(
    selectBarcodePageDomain,
    substate => substate.dataExist
  );

const makeSelectGoodsTypeDataExist = () =>
  createSelector(
    selectBarcodePageDomain,
    substate => substate.goodsTypeData
  );

export { makeSelectData, makeSelectDataExist, makeSelectGoodsTypeDataExist };
