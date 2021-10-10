// import { take, call, put, select } from 'redux-saga/effects';
import { call, select, put, takeLatest } from '@redux-saga/core/effects';
import request from '../../../utils/api'
import { CHANGE_PASSWORD } from './constants';
import { changeNotifStatus, changeLoading } from './actions';

/**
 * Set User Password
 */
 export function* setPassword(action) {
  try {
    yield put(changeLoading(true));
    const url = "users/change-password";
    const data = yield call(request, "POST", url, action.payload);
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
  yield takeLatest([CHANGE_PASSWORD], setPassword);
}