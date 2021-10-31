/*
 *
 * InventoryDetailDialogPage actions
 *
 */

import { GET_ROW_DATA, GET_ROW_DATA_SUCCESS, GET_ACTIVE_PERIOD, GET_ACTIVE_PERIOD_SUCCESS, SET_INVENTORY_PERIOD } from './constants';

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
 * Get the Active Period data
 *
 * @return {object} An action object with a type of GET_ACTIVE_PERIOD
 */
 export function getActivePeriod() {
  return {
    type: GET_ACTIVE_PERIOD,
  };
}

/**
 * Successfully get the Active Period Data
 *
 * @param  {object} payload
 *
 * @return {object} An action object with a type of GET_ACTIVE_PERIOD_SUCCESS
 */
 export function getActivePeriodSuccess(payload) {
  return {
    type: GET_ACTIVE_PERIOD_SUCCESS,
    payload
  };
}

/**
 * Set the Inventory Period data
 *
 * @param  {object} payload
 * 
 * @return {object} An action object with a type of SET_INVENTORY_PERIOD
 */
 export function updateInventoryPeriod(payload) {
  return {
    type: SET_INVENTORY_PERIOD,
    payload
  };
}