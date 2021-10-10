// import { take, call, put, select } from 'redux-saga/effects';
import { call, select, put, takeLatest } from '@redux-saga/core/effects';
import { push } from 'react-router-redux';
import request from '../../utils/api';
import { getUserSuccess, getUserFailed } from './actions';
import { GET_USER } from './constants';

const key = 'users';

/**
 * Get Pagination Unit Data
 */
export function* getData(action) {
  try {    
    const url = key + "/login";

    const data = yield call(request, "POST", url, action.payload);
    localStorage.clear();
    localStorage.setItem("token",data.Data.TokenData)
    yield put(getUserSuccess(data.Data.User));
    yield put(push('/admin/home'));
  } catch (error) {
    if(error.hasOwnProperty('Message'))
      alert(error.Message)
    else
      alert("tidak terkoneksi database");
  }
}

/**
 * Root saga manages watcher lifecycle
 */
 export default function* rootSaga() {
  yield takeLatest([GET_USER], getData);
}