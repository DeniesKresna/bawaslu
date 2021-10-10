/*
 *
 * InventoryDetailDialogPage actions
 *
 */

import { GET_ROW_DATA, GET_ROW_DATA_SUCCESS } from './constants';

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