/*
 *
 * BarcodePage actions
 *
 */

import { GET_DATA, GET_DATA_SUCCESS } from './constants';

/**
 * Get the entity data
 *
 * @param  {object} payload
 *
 * @return {object} An action object with a type of GET_DATA
 */
 export function getData(payload) {
  return {
    type: GET_DATA,
    payload
  };
}

/**
 * Get the entity data
 *
 * @param  {object} payload
 *
 * @return {object} An action object with a type of GET_DATA
 */
 export function getDataSuccess(payload) {
  return {
    type: GET_DATA_SUCCESS,
    payload
  };
}
