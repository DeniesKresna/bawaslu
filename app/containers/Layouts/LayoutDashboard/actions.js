/*
 *
 * Layout Dashboard actions
 *
 */

import { CHANGE_NOTIF_STATUS, SET_LOADING } from './constants';

/**
 * Changes the notif object
 *
 * @param  {object} payload The notif object
 *
 * @return {object} An action object with a type of CHANGE_NOTIF_STATUS
 */
export function changeNotifStatus(payload) {
  return {
    type: CHANGE_NOTIF_STATUS,
    payload
  };
}

/**
 * Changes the loading status
 *
 * @param  {boolean} payload The notif status
 *
 * @return {object} An action object with a type of SET_LOADING
 */
 export function changeLoading(payload) {
  return {
    type: SET_LOADING,
    payload
  };
}