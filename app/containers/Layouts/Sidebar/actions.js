/*
 *
 * Sidebar actions
 *
 */

import { DEFAULT_ACTION, GET_USER, GET_USER_SUCCESS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
/**
 * Get the user
 *
 * @return {object} An action object with a type of GET_USER
 */
 export function getUser() {
  return {
    type: GET_USER,
  };
}

/**
 * Get the user
 *
 * @param payload
 * 
 * @return {object} An action object with a type of GET_USER_SUCCESS
 */
 export function getUserSuccess(payload) {
  return {
    type: GET_USER_SUCCESS,
    payload
  };
}
