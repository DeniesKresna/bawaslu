import { call, select, put, takeLatest } from '@redux-saga/core/effects';
import request from '../../../utils/api';
import { makeSelectRowData } from './selectors';
import { getList as getUnitList } from './../../UnitPage/actions';
import { getList as getRoomList } from './../../RoomPage/actions';
import { getList as getConditionList } from './../../ConditionPage/actions';
import { getList as getGoodsTypeList } from './../../GoodsTypePage/actions';
import { getRowDataSuccess } from './actions';
import { GET_ROW_DATA, GET_ADDITIONAL_DATA, CHANGE_ROW_DATA, DELETE_ROW_DATA } from './constants';
import { changeNotifStatus, changeLoading } from '../../Layouts/LayoutDashboard/actions';

const key = 'inventories';

/**
 * Get Pagination Inventory Detail Data
 */
export function* getData(action) {
  try {
    yield put(changeLoading(true));
    const url = key + '/detail?goods-type-id=' + action.payload.code + '&nup=' + action.payload.nup;

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
 * Set Inventory Detail Data
 */
 export function* setData(action) {
  try {
    yield put(changeLoading(true));
    let url = key;

    let method = "POST";
    if(action.payload.ID !== undefined ){
      if(action.payload.ID != null){
        url = url + "/" + action.payload.ID;
      }
    }
    const formData = new FormData();
    for (const key in action.payload){
      formData.append(key, action.payload[key]);
    }
    const data = yield call(request, method, url, formData);
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
 * Delete Inventory Detail Data
 */
 export function* deleteData(action) {
  try {
    yield put(changeLoading(true));
    const url = key;
    const data = yield call(get);
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
 * Get Inventory Detail Additional Data
 */
 export function* getAdditionalData() {
  yield put(getUnitList());
  yield put(getConditionList());
  yield put(getGoodsTypeList());
  yield put(getRoomList());
}

/**
 * Root saga manages watcher lifecycle
 */
 export default function* rootSaga() {
  yield takeLatest([GET_ROW_DATA], getData);
  yield takeLatest([CHANGE_ROW_DATA], setData);
  yield takeLatest([DELETE_ROW_DATA], deleteData);
  yield takeLatest([GET_ADDITIONAL_DATA], getAdditionalData);
}