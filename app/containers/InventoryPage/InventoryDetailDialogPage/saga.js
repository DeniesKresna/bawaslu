import { call, put, takeLatest } from '@redux-saga/core/effects';
import request from '../../../utils/api';
import { getRowDataSuccess } from './actions';
import { GET_ROW_DATA } from './constants';
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
 * Root saga manages watcher lifecycle
 */
 export default function* rootSaga() {
  yield takeLatest([GET_ROW_DATA], getData);
}