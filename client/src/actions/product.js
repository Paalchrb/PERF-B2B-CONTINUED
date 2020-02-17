import axios from 'axios';
import {
  GET_SINGLE_PRODUCT,
  SINGLE_PRODUCT_ERROR
} from '../actions/constants';

//Get product by id
export let getProductById = (productId) => async dispatch => {
  try {
    let res = await axios(`/api/products/${productId}`); 

    dispatch({
      type: GET_SINGLE_PRODUCT,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: SINGLE_PRODUCT_ERROR,
      payload: error.response.data.errors
    });
  }
};
