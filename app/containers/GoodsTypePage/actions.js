/*
 *
 * GoodsTypePage actions
 *
 */

import { CHANGE_DATA, CHANGE_SEARCH, GET_DATA, GET_LIST, GET_LIST_SUCCESS, GET_DATA_SUCCESS, CHANGE_ROW, DELETE_ROW } from './constants';

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
 * Get the entity list
 *
 * @return {object} An action object with a type of GET_LIST
 */
 export function getList() {
  return {
    type: GET_LIST,
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
 * Get the entity data
 *
 * @param  {object} payload
 *
 * @return {object} An action object with a type of GET_LIST_SUCCESS
 */
 export function getListSuccess(payload) {
  return {
    type: GET_LIST_SUCCESS,
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