import {
  GET_ALL_ORDERS,
  GET_SINGLE_ORDER,
  ORDER_ERROR,
  LOGOUT

} from '../actions/constants';

const initialState = {
  selectedOrder: null,
	orders: null,
  loading: true,
	error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_ORDERS:
      return {
        ...state,
        orders: payload,
        loading: false
      }
      case GET_SINGLE_ORDER:
      return {
        ...state,
        selectedOrder: payload,
        loading: false
      }
    case ORDER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case LOGOUT:
      return initialState
    default:
      return state;
  }
}