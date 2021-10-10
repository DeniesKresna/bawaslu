/*
 *
 * Layout Dashboard actions
 *
 */

import { CHANGE_NOTIF_STATUS, SET_LOADING, CHANGE_PASSWORD } from './constants';

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

/**
 * Changes user password
 *
 * @param  {boolean} payload The password parameter
 *
 * @return {object} An action object with a type of CHANGE_PASSWORD
 */
 export function changePassword(payload) {
  return {
    type: CHANGE_PASSWORD,
    payload
  };
}