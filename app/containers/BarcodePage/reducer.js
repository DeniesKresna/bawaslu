/*
 *
 * BarcodePage reducer
 *
 */
import produce from 'immer';
import { GET_DATA, GET_DATA_SUCCESS } from './constants';

export const initialState = {
  data: null
};

/* eslint-disable default-case, no-param-reassign */
const barcodePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_DATA_SUCCESS:
        draft.data = action.payload;
        break;
    }
  });

export default barcodePageReducer;
