import axios from 'axios';
import {
  GET_COMPANY,
  COMPANY_ERROR,
  GET_FAV_PRODUCTS,
  FAV_PRODUCTS_ERROR,
  GET_RECENT_PRODUCTS,
  RECENT_PRODUCTS_ERROR,
  GET_RECENT_ORDERS,
  RECENT_ORDERS_ERROR,
} from './constants';

//get user company
export const getCurrentCompany = () => async dispatch => {
  try {
    const company = await axios.get('/api/companies/me');
 
    dispatch({
      type: GET_COMPANY,
      payload: company.data
    });
  } catch (error) {
    dispatch({
      type: COMPANY_ERROR,
      payload: error.response.data.errors
    });
  }
};

//get company recent products
export const getRecentProducts = () => async dispatch => {
  try {
    const recentProducts = await axios.get('api/products/recent');

    dispatch({
      type: GET_RECENT_PRODUCTS,
      payload: recentProducts.data
    })
  } catch (error) {
    dispatch({
      type: RECENT_PRODUCTS_ERROR,
      payload: error.response.data.errors
    });
  }
};

//get company favorite products
export const getFavoriteProducts = () => async dispatch => {
  try {
    const favoriteProducts = await axios.get('api/products/favorites');

    dispatch({
      type: GET_FAV_PRODUCTS,
      payload: favoriteProducts.data
    })
  } catch (error) {
    dispatch({
      type: FAV_PRODUCTS_ERROR,
      payload: error.response.data.errors
    });
  }
};

//get company recent orders
export const getRecentOrders = () => async dispatch => {
  try {
    const getRecentOrders = await axios.get('api/orders/procurement/recent');

    dispatch({
      type: GET_RECENT_ORDERS,
      payload: getRecentOrders.data
    })
  } catch (error) {
    dispatch({
      type: RECENT_ORDERS_ERROR,
      payload: error.response.data.errors
    });
  }
};