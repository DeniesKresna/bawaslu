/*
 *
 * UnitPage actions
 *
 */

import { GET_USER, GET_USER_SUCCESS, GET_USER_FAILED} from './constants';

/**
 * Get the entity data
 *
 * @param  {object} payload The object from api
 *
 * @return {object} An action object with a type of GET_USER
 */
export function getUser(payload) {
  return {
    type: GET_USER,
    payload
  };
}

/**
 * Success get user
 *
 * @param  {object} payload The object from api
 *
 * @return {object} An action object with a type of GET_USER_SUCCESS
 */
 export function getUserSuccess(payload) {
  return {
    type: GET_USER_SUCCESS,
    payload
  };
}

/**
 * Failed get user
 *
 * @param  {object} payload The object from api
 *
 * @return {object} An action object with a type of GET_USER_FAILED
 */
 export function getUserFailed(payload) {
  return {
    type: GET_USER_FAILED,
    payload
  };
}