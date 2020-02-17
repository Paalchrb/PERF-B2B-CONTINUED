import {
  GET_COMPANY,
  COMPANY_ERROR,
  GET_FAV_PRODUCTS,
  FAV_PRODUCTS_ERROR,
  GET_RECENT_PRODUCTS,
  RECENT_PRODUCTS_ERROR,
  GET_RECENT_ORDERS,
  RECENT_ORDERS_ERROR,
  LOGOUT
} from '../actions/constants';

const initialState = {
	company: null,
  recentProducts: [],
  favoriteProducts: [],
  recentOrders: [],
  loading: true,
	error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_COMPANY:
      return {
        ...state,
        company: payload,
        loading: false
      }
    case COMPANY_ERROR:
      return {
        ...state,
        error: payload,
        company: null,
        loading: false
      }
    case GET_RECENT_PRODUCTS:
      return {
        ...state,
        recentProducts: payload,
        loading: false
      }
      case RECENT_PRODUCTS_ERROR:
        return {
          ...state,
          error: payload,
          recentProducts: [],
          loading: false
        }
      case GET_FAV_PRODUCTS:
        return {
          ...state,
          favoriteProducts: payload,
          loading: false,
        }
      case FAV_PRODUCTS_ERROR:
        return {
          ...state,
          favoriteProducts: [],
          error: payload,
          loading: false
        }
      case GET_RECENT_ORDERS:
        return {
          ...state,
          recentOrders: payload,
          loading: false,
        }
      case RECENT_ORDERS_ERROR:
        return {
          ...state,
          recentOrders: [],
          error: payload,
          loading: false
        }
      case LOGOUT:
        return initialState
    default:
      return state;
  }
}