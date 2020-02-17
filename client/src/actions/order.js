import axios from 'axios';
import {
  GET_ALL_ORDERS,
  GET_SINGLE_ORDER,
  ORDER_ERROR
} from '../actions/constants';

//Get all orders from current company
export const getAllOrders = () => async dispatch => {
  try {
    const res = await axios.get('/api/orders/me'); 
 
    dispatch({
      type: GET_ALL_ORDERS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: ORDER_ERROR,
      payload: error
     });
  }
};

//Get user order by id
export const getOrderById = (orderId) => async dispatch => {
  try {
    const res = await axios(`/api/orders/${orderId}`); 

    dispatch({
      type: GET_SINGLE_ORDER,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: ORDER_ERROR,
      payload: error
     });
  }
};

