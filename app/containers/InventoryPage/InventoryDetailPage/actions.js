/*
 *
 * InventoryDetailPage actions
 *
 */

import { RESET, CHANGE_ROW_DATA, GET_ROW_DATA, GET_ROW_DATA_SUCCESS, DELETE_ROW_DATA, CHANGE_HISTORY_DATA, GET_ADDITIONAL_DATA } from './constants';

/**
 * reset the data
 *
 * @return {object} An action object with a type of CHANGE_ROW_DATA
 */
 export function reset(payload) {
  return {
    type: RESET,
  };
}

/**
 * Changes the entity data
 *
 * @param  {object} payload The object from api
 *
 * @return {object} An action object with a type of CHANGE_ROW_DATA
 */
export function changeRowData(payload) {
  return {
    type: CHANGE_ROW_DATA,
    payload
  };
}

/**
 * Get the entity data
 *
 * @param  {object} payload The ID of the inventory
 *
 * @return {object} An action object with a type of GET_ROW_DATA
 */
 export function getRowData(payload) {
  return {
    type: GET_ROW_DATA,
    payload
  };
}

/**
 * Get the entity data
 *
 * @param  {object} payload
 *
 * @return {object} An action object with a type of GET_ROW_DATA_SUCCESS
 */
 export function getRowDataSuccess(payload) {
  return {
    type: GET_ROW_DATA_SUCCESS,
    payload
  };
}

/**
 * Delete the Row Data
 *
 * @param  {object} payload
 *
 * @return {object} An action object with a type of DELETE_ROW_DATA
 */
 export function deleteRowData(payload) {
  return {
    type: DELETE_ROW_DATA,
    payload
  };
}

/**
 * Changes the history data
 *
 * @param  {object} payload The object from api
 *
 * @return {object} An action object with a type of CHANGE_HISTORY_DATA
 */
 export function changeHistoryData(payload) {
  return {
    type: CHANGE_HISTORY_DATA,
    payload
  };
}

/**
 * Get the additional data
 *
 * @return {object} An action object with a type of GET_ADDITIONAL_DATA
 */
 export function getAdditionalData() {
  return {
    type: GET_ADDITIONAL_DATA,
  };
}