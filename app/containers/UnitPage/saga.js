// import { take, call, put, select } from 'redux-saga/effects';
import { call, select, put, takeLatest } from '@redux-saga/core/effects';
import request from '../../utils/api';
import { makeSelectData, makeSelectSearch } from './selectors';
import { getDataSuccess, getDataFailed } from './actions';
import { GET_DATA, CHANGE_DATA, CHANGE_ROW, DELETE_ROW } from './constants';
import { changeNotifStatus } from '../Layouts/LayoutDashboard/actions';

const key = 'units';

/**
 * Get Pagination Unit Data
 */
export function* getData() {
  try {
    const oldData = yield select(makeSelectData());
    const search = yield select(makeSelectSearch());
    const url = key + '?search=' + search + '&page=' + oldData.current_page + '&page_size=' + oldData.per_page;

    const data = yield call(request, "GET", url);
    yield put(getDataSuccess(data));
  } catch (error) {
    yield put(getDataFailed());
  }
}

/**
 * Set Unit Data
 */
 export function* setData(action) {
  try {
    const url = key;
    const data = yield call(request, "POST", url, action.payload);
    yield call(getData);
    yield put(changeNotifStatus({
      open: true,
      title: 'Sukses',
      message: 'Berhasil Simpan Satuan',
      color: 'success'
    }));
  } catch (error) {
    yield put(changeNotifStatus({
      open: true,
      title: 'Gagal',
      message: 'Gagal Simpan Satuan',
      color: 'error'
    }));
  }
}

/**
 * Delete Unit Data
 */
 export function* deleteData(action) {
  try {
    const url = key;
    const data = yield call(request, "DELETE", url + '/' + action.payload.ID);
    yield call(getData);
    yield put(changeNotifStatus({
      open: true,
      title: 'Sukses',
      message: 'Berhasil Hapus Satuan',
      color: 'success'
    }));
  } catch (error) {
    yield put(changeNotifStatus({
      open: true,
      title: 'Gagal',
      message: 'Gagal Hapus Satuan',
      color: 'error'
    }));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
 export default function* rootSaga() {
  yield takeLatest([GET_DATA, CHANGE_DATA], getData);
  yield takeLatest([CHANGE_ROW], setData);
  yield takeLatest([DELETE_ROW], deleteData);
}