import { GET_COMPANY_PRODUCTS, COMPANY_PRODUCTS_ERROR, LOGOUT } from '../actions/constants';

const initialState = {
  products: [],
  loading: true,
	error: {}
};

export default function(state= initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case GET_COMPANY_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false
      }
    case COMPANY_PRODUCTS_ERROR:
      return {
        ...state,
        error: payload,
        products: [],
        loading: false
      }
    case LOGOUT:
      return initialState
    default:
      return state;
  };
};