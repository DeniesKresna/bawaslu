// import { take, call, put, select } from 'redux-saga/effects';
import { call, select, put, takeLatest } from '@redux-saga/core/effects';
import request from '../../utils/api';
import { makeSelectData, makeSelectSearch } from './selectors';
import { push } from 'react-router-redux';
import { getDataSuccess, getDataFailed } from './actions';
import { GET_DATA } from './constants';
import { changeNotifStatus, changeLoading } from '../Layouts/LayoutDashboard/actions';

const key = 'inventories';

/**
 * Get Pagination Inventory Data
 */
export function* getData(action) {
  try {
    yield put(changeLoading(true));
    const url = key + '-codename/detail';
    let payload = {...action.payload}
    payload.nup = parseInt(payload.nup)
    payload.code = payload.code
    const data = yield call(request, "POST", url, payload);
    yield put(getDataSuccess(data.Data));
    yield put(changeLoading(false));
  } catch (error) {
    console.log(error)
    yield put(getDataFailed());
    yield put(changeNotifStatus({
      open: true,
      title: 'Gagal',
      message: error.Message,
      color: 'error'
    }));
    yield put(changeLoading(false));
    if(confirm("Data tidak ditemukan. buat Inventaris baru?"))
        push("/admin/inventory/create")
  }
}

/**
 * Root saga manages watcher lifecycle
 */
 export default function* rootSaga() {
  yield takeLatest([GET_DATA], getData);
}