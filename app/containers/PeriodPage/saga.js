// import { take, call, put, select } from 'redux-saga/effects';
import { call, select, put, takeLatest } from '@redux-saga/core/effects';
import request from '../../utils/api';
import { makeSelectData, makeSelectSearch } from './selectors';
import { getDataSuccess, getListSuccess } from './actions';
import { GET_DATA, CHANGE_DATA, CHANGE_ROW, DELETE_ROW, GET_LIST } from './constants';
import { changeNotifStatus, changeLoading } from '../Layouts/LayoutDashboard/actions';

const key = 'periods';

/**
 * Get Pagination Period Data
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
 * Set Period Data
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
    console.log(error)
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
 * Get Period List
 */
 export function* getList() {
  try {
    yield put(changeLoading(true));
    const url = key + '/list';
    const data = yield call(request, "GET", url);
    yield put(getListSuccess(data.Data));
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
 * Delete Period Data
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
 * Root saga manages watcher lifecycle
 */
 export default function* rootSaga() {
  yield takeLatest([GET_DATA, CHANGE_DATA], getData);
  yield takeLatest([GET_LIST], getList);
  yield takeLatest([CHANGE_ROW], setData);
  yield takeLatest([DELETE_ROW], deleteData);
}