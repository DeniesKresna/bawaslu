/*
 *
 * BarcodePage actions
 *
 */

import { GET_DATA, GET_GOODS_TYPE, GET_GOODS_TYPE_SUCCESS, GET_DATA_SUCCESS, GET_DATA_FAILED, SET_DATA_EXIST} from './constants';

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

/**
 * Get the entity data
 *
 * @return {object} An action object with a type of GET_DATA_FAILED
 */
 export function getDataFailed() {
  return {
    type: GET_DATA_FAILED
  };
}

/**
 * Set the data exist status
 *
 * @return {object} An action object with a type of SET_DATA_EXIST
 */
 export function setDataExist() {
  return {
    type: SET_DATA_EXIST,
  };
}

/**
 * Get the goods type data
 *
 * @return {object} An action object with a type of GET_GOODS_TYPE
 */
 export function getGoodsType() {
  return {
    type: GET_GOODS_TYPE
  };
}

/**
 * Get the goods type data success
 *
 * @param  {object} payload
 *
 * @return {object} An action object with a type of GET_GOODS_TYPE_SUCCESS
 */
 export function getGoodsTypeSuccess(payload) {
  return {
    type: GET_GOODS_TYPE_SUCCESS,
    payload
  };
}
