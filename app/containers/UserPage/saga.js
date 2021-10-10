// import { take, call, put, select } from 'redux-saga/effects';
import { call, select, put, takeLatest } from '@redux-saga/core/effects';
import request from '../../utils/api';
import { makeSelectData, makeSelectSearch } from './selectors';
import { getDataSuccess, getDataFailed, getRolesSuccess } from './actions';
import { GET_DATA, CHANGE_DATA, CHANGE_ROW, DELETE_ROW, GET_ROLES, RESET_ROW } from './constants';
import { changeNotifStatus, changeLoading } from '../Layouts/LayoutDashboard/actions';

const key = 'users';

/**
 * Get Pagination User Data
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
 * Set User Data
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
    let bodyData = {...action.payload}
    bodyData.RoleID = parseInt(bodyData.RoleID)
    const data = yield call(request, method, url, bodyData);
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
 * Delete User Data
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
 * Get Roles Data
 */
 export function* getRoles() {
  try {
    yield put(changeLoading(true));
    const oldData = yield select(makeSelectData());
    const search = yield select(makeSelectSearch());
    const url = 'roles/list';

    const data = yield call(request, "GET", url);
    yield put(getRolesSuccess(data.Data));
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
 * Reset User Password
 */
 export function* resetPassword(action) {
  try {
    yield put(changeLoading(true));
    let url = key;
    url = url + "/reset/" + action.payload.ID;

    const data = yield call(request, "GET", url);
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
  yield takeLatest([GET_ROLES], getRoles);
  yield takeLatest([CHANGE_ROW], setData);
  yield takeLatest([RESET_ROW], resetPassword);
  yield takeLatest([DELETE_ROW], deleteData);
}