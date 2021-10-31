/*
 *
 * InventoryPage actions
 *
 */

import { CHANGE_DATA, CHANGE_SEARCH, CHANGE_FILTERED, GET_DATA, GET_DATA_SUCCESS, CHANGE_ROW, DELETE_ROW, EXPORT_DATA, GET_ADDITIONAL_DATA } from './constants';

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
 * Changes the Filtered
 *
 * @param  {string} payload
 *
 * @return {object} An action object with a type of CHANGE_FILTERED
 */
 export function changeFiltered(payload) {
  return {
    type: CHANGE_FILTERED,
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

/**
 * Export the whole Data
 *
 * @return {object} An action object with a type of EXPORT_DATA
 */
 export function exportData() {
  return {
    type: EXPORT_DATA,
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