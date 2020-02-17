import axios from 'axios';
import { 
  GET_ALL_PRODUCTS, 
  PRODUCT_ERROR 
} from './constants';

//Get all products
export const getAllProducts = () => async dispatch => {
  try {
    const allProducts = await axios.get('/api/products');

    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: allProducts.data
    });

  } catch (error) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: error.response.data.errors
    });
  }
};

