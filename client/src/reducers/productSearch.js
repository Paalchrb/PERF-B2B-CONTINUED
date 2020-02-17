import { GET_ALL_PRODUCTS, PRODUCT_ERROR } from '../actions/constants';

const initialState = {
  products: [],
  loading: true,
	error: {}
};

export default function(state= initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false
      }
    case PRODUCT_ERROR:
      return {
        ...state,
        error: payload,
        products: [],
        loading: false
      }
    default:
      return state;
  };
};