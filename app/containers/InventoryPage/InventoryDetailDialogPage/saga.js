import { call, put, takeLatest } from '@redux-saga/core/effects';
import request from '../../../utils/api';
import { getRowDataSuccess, getActivePeriodSuccess, updateInventoryPeriod } from './actions';
import { GET_ROW_DATA, GET_ACTIVE_PERIOD, SET_INVENTORY_PERIOD } from './constants';
import { changeNotifStatus, changeLoading } from '../../Layouts/LayoutDashboard/actions';

const key = 'inventories';

/**
 * Get Inventory Detail Data
 */
export function* getData(action) {
  try {
    yield put(changeLoading(true));
    const url = key + '/detail/' + action.payload;

    const data = yield call(request, "GET", url);
    yield put(getRowDataSuccess(data.Data));
    yield put(changeLoading(false));
  } catch (error) {
    yield put(changeNotifStatus({
      open: true,
      title: 'Gagal',
      message: error.Message,
      color: 'error'
    }));
    yield put(changeLoading(false));
  }
}

/**
 * Get Active Period Data
 */
 export function* getActivePeriod() {
  try {
    yield put(changeLoading(true));
    const url = 'periods/active';
    const data = yield call(request, "GET", url);
    yield put(getActivePeriodSuccess(data.Data));
    yield put(changeLoading(false));
  } catch (error) {
    yield put(changeNotifStatus({
      open: true,
      title: 'Gagal',
      message: error.Message,
      color: 'error'
    }));
    yield put(changeLoading(false));
  }
}

/**
 * Set Inventory Period
 */
 export function* setInventoryPeriod(action) {
  try {
    yield put(changeLoading(true));
    const url = '/inventories-period';
    const data = yield call(request, "POST", url, action.payload);
    yield put(changeLoading(false));
    alert(data.Message);
  } catch (error) {
    yield put(changeNotifStatus({
      open: true,
      title: 'Gagal',
      message: error.Message,
      color: 'error'
    }));
    yield put(changeLoading(false));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
 export default function* rootSaga() {
  yield takeLatest([GET_ROW_DATA], getData);
  yield takeLatest([GET_ACTIVE_PERIOD], getActivePeriod);
  yield takeLatest([SET_INVENTORY_PERIOD], setInventoryPeriod);
}