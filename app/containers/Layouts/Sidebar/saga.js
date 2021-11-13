// import { take, call, put, select } from 'redux-saga/effects';
import { call, select, put, takeLatest } from '@redux-saga/core/effects';
import request from '../../../utils/api';
import { getUserSuccess } from './actions';
import { GET_USER } from './constants';
import { changeNotifStatus, changeLoading } from '../../Layouts/LayoutDashboard/actions';

/**
 * Get User
 */
export function* getUser() {
  try {
    yield put(changeLoading(true));
    const url = 'users/me'

    const data = yield call(request, "GET", url);
    yield put(getUserSuccess(data.Data));
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
  yield takeLatest([GET_USER], getUser);
}