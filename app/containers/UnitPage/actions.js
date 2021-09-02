/*
 *
 * UnitPage actions
 *
 */

import { CHANGE_DATA, CHANGE_SEARCH, GET_DATA, GET_DATA_SUCCESS, GET_DATA_FAILED, CHANGE_ROW, DELETE_ROW } from './constants';

/**
 * Changes the entity data
 *
 * @param  {object} payload The object from api
 *
 * @return {object} An action object with a type of CHANGE_DATA
 */
export function changeData(payload) {
  return {
    type: CHANGE_DATA,
    payload
  };
}

/**
 * Changes the Search
 *
 * @param  {string} payload
 *
 * @return {object} An action object with a type of CHANGE_SEARCH
 */
 export function changeSearch(payload) {
  return {
    type: CHANGE_SEARCH,
    payload
  };
}

/**
 * Get the entity data
 *
 * @return {object} An action object with a type of GET_DATA
 */
 export function getData() {
  return {
    type: GET_DATA,
  };
}

/**
 * Get the entity data
 *
 * @param {object} payload
 * 
 * @return {object} An action object with a type of GET_DATA_SUCCESS
 */
 export function getDataSuccess(payload) {
  return {
    type: GET_DATA_SUCCESS,
    payload
  };
}

/**
 * Get the entity data failed
 * 
 * @return {object} An action object with a type of GET_DATA_FAILED
 */
 export function getDataFailed() {
  return {
    type: GET_DATA_FAILED,
  };
}

/**
 * Changes the Row Data
 *
 * @param  {object} payload
 *
 * @return {object} An action object with a type of CHANGE_ROW
 */
 export function changeRow(payload) {
  return {
    type: CHANGE_ROW,
    payload
  };
}

/**
 * Delete the Row Data
 *
 * @param  {object} payload
 *
 * @return {object} An action object with a type of DELETE_ROW
 */
 export function deleteRow(payload) {
  return {
    type: DELETE_ROW,
    payload
  };
}