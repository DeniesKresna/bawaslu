/*
 *
 * Layout Dashboard actions
 *
 */

import { CHANGE_NOTIF_STATUS } from './constants';

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