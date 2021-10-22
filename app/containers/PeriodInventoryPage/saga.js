// import { take, call, put, select } from 'redux-saga/effects';
import { call, select, put, takeLatest } from '@redux-saga/core/effects';
import request, {requestFile} from '../../utils/api';
import { makeSelectData, makeSelectSearch } from './selectors';
import { getDataSuccess, getDataFailed } from './actions';
import { getList as getUnitList } from '../UnitPage/actions';
import { getList as getRoomList } from '../RoomPage/actions';
import { getList as getConditionList } from '../ConditionPage/actions';
import { getList as getGoodsTypeList } from '../GoodsTypePage/actions';
import { getList as getPeriodList } from '../PeriodPage/actions';
import { GET_DATA, CHANGE_DATA, CHANGE_ROW, DELETE_ROW, EXPORT_DATA, GET_ADDITIONAL_DATA } from './constants';
import { changeNotifStatus, changeLoading } from '../Layouts/LayoutDashboard/actions';

const key = 'inventories';

/**
 * Get Pagination Inventory Data
 */
export function* getData() {
  try {
    yield put(changeLoading(true));
    const oldData = yield select(makeSelectData());
    const search = yield select(makeSelectSearch());
    const url = key + '?search=' + search + '&page=' + oldData.current_page + '&page_size=' + oldData.per_page;

    const data = yield call(request, "GET", url);
    yield put(getDataSuccess(data.Data));
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
 * Set Inventory Data
 */
 export function* setData(action) {
  try {
    yield put(changeLoading(true));
    let url = key;

    let method = "POST";
    if(action.payload.ID !== undefined ){
      if(action.payload.ID != null){
        method = "PATCH";
        url = url + "/" + action.payload.ID;
      }
    }
    const data = yield call(request, method, url, action.payload);
    yield call(getData);
    yield put(changeNotifStatus({
      open: true,
      title: 'Sukses',
      message: data.Message,
      color: 'success'
    }));
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
 * Delete Inventory Data
 */
 export function* deleteData(action) {
  try {
    yield put(changeLoading(true));
    const url = key;
    const data = yield call(request, "DELETE", url + '/' + action.payload.ID);
    yield call(getData);
    yield put(changeNotifStatus({
      open: true,
      title: 'Sukses',
      message: data.Message,
      color: 'success'
    }));
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
 * Export Inventory Data
 */
 export function* exportData() {
  try {
    yield put(changeLoading(true));
    const url = key + "/getexcel"
    const data = yield call(requestFile, "GET", url);
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
 * Get Inventory Detail Additional Data
 */
 export function* getAdditionalData() {
  yield put(getUnitList());
  yield put(getConditionList());
  yield put(getGoodsTypeList());
  yield put(getRoomList());
  yield put(getPeriodList());
}

/**
 * Root saga manages watcher lifecycle
 */
 export default function* rootSaga() {
  yield takeLatest([GET_DATA, CHANGE_DATA], getData);
  yield takeLatest([CHANGE_ROW], setData);
  yield takeLatest([DELETE_ROW], deleteData);
  yield takeLatest([EXPORT_DATA], exportData);
  yield takeLatest([GET_ADDITIONAL_DATA], getAdditionalData);
}