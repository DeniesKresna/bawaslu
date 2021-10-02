import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the inventory detail state domain
 */

const selectInventoryDetailPageDomain = state => state.inventoryDetailPage || initialState;

const makeSelectRowData = () =>
  createSelector(
    selectInventoryDetailPageDomain,
    substate => substate.rowData
  );

const makeSelectUnitList = () =>
createSelector(
  selectInventoryDetailPageDomain,
  substate => substate.unitList
);

const makeSelectRoomList = () =>
createSelector(
  selectInventoryDetailPageDomain,
  substate => substate.roomList
);

const makeSelectConditionList = () =>
createSelector(
  selectInventoryDetailPageDomain,
  substate => substate.conditionList
);

const makeSelectGoodsTypeList = () =>
createSelector(
  selectInventoryDetailPageDomain,
  substate => substate.goodsTypeList
);

const makeSelectHistoryList = () =>
createSelector(
  selectInventoryDetailPageDomain,
  substate => substate.historyList
);

const makeSelectIsBusy = () =>
createSelector(
  selectInventoryDetailPageDomain,
  substate => substate.busy
);

export { makeSelectRowData, makeSelectUnitList, makeSelectRoomList, makeSelectConditionList, makeSelectGoodsTypeList, makeSelectHistoryList, makeSelectIsBusy };
