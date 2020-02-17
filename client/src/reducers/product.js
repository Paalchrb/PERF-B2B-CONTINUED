import {
  GET_SINGLE_PRODUCT,
  SINGLE_PRODUCT_ERROR
} from '../actions/constants';

const initialState = {
  selectedProduct: null,
  loading: true,
	error: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SINGLE_PRODUCT:
      return {
        ...state,
        selectedProduct: payload,
        loading: false
      }
    case SINGLE_PRODUCT_ERROR:
      return {
        ...state,
        selectedProduct: null,
        error: payload,
        loading: false
      }
    default:
      return state;
  }
}