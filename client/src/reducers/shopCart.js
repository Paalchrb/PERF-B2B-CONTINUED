import {
  ADD_TO_CART_ERROR,
  ADD_TO_CART,
  UPDATE_ITEM_QUANTITY,
  ITEM_QUANTITY_ERROR,
  CREATE_NEW_ORDER,
  NEW_ORDER_ERROR,
  LOGOUT,
  TOGGLE_SHOPCART,
  REMOVE_CREATE_ORDER,
  SET_LOADING
} from '../actions/constants';

const initialState = {
  shopCartItems: [],
  orders: [],
  orderCreated: false,
  showCart: false,
  loading: true,
  error: {}
};

export default function(state=initialState, action) {
  const { type, payload } = action;
  let index = -1;
  let updatedCartItems = [];
  switch (type) {
    case ADD_TO_CART:
      index = state.shopCartItems.findIndex(product => product._id === payload._id);
      if (index !== -1) {
        updatedCartItems = [
          ...state.shopCartItems.slice(0, index),
        {
          ...state.shopCartItems[index],
          quantity:  +state.shopCartItems[index].quantity + 1
        },
        ...state.shopCartItems.slice(index + 1)
        ]
      } else { 
        updatedCartItems = [
          ...state.shopCartItems,
          payload
        ]
      }
      return {
        ...state,
        shopCartItems: updatedCartItems,
        loading: false
      };
    case ADD_TO_CART_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      }
    case UPDATE_ITEM_QUANTITY:
      // update quantity at selected item
      index = state.shopCartItems.findIndex(product => product._id === payload.productId);
      
      updatedCartItems = [
        ...state.shopCartItems.slice(0, index),
        {
          ...state.shopCartItems[index],
          quantity: payload.quantity
        },
        ...state.shopCartItems.slice(index + 1)
      ];

      return {
        ...state,
        shopCartItems: updatedCartItems,
        loading: false
      }
    case TOGGLE_SHOPCART:
      return {
        ...state,
        loading: false,
        showCart: !state.showCart
      }
    case REMOVE_CREATE_ORDER: 
      return {
        ...state,
        shopCartItems: [],
        isloading: false,
        orderCreated: false
      }
    case ITEM_QUANTITY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    case CREATE_NEW_ORDER:
      return {
        ...state,
        orders: [
          ...state.orders,
          payload
        ],
        loading: false,
        orderCreated: true
      }
    case NEW_ORDER_ERROR:
      return {
        ...state,
        orders: [],
        error: payload,
        loading: false
      }
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}