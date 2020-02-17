import axios from 'axios';
import {
  ADD_TO_CART_ERROR,
  ADD_TO_CART,
  UPDATE_ITEM_QUANTITY,
  CREATE_NEW_ORDER,
  NEW_ORDER_ERROR,
  TOGGLE_SHOPCART,
  REMOVE_CREATE_ORDER,
  SET_LOADING
} from '../actions/constants';

// Add item to cart:
export const addItemToCart = (productId, quantity = 1) => async dispatch => {
  try { 
    const product = await axios.get(`/api/products/${productId}`);
    const seller = await axios.get(`/api/companies/${product.data.companyId}`);
    
    const payload = {
      ...product.data,
      quantity,
      sellerName: seller.data.companyName
    };
    
    dispatch({
      type: ADD_TO_CART,
      payload
    });
  } catch (error) {
    dispatch({
      type: ADD_TO_CART_ERROR,
     
    });
  }
};

// Update shop cart item quantity
export const updateCartItemQuantity = (quantity, productId) => dispatch => {
    const payload = {
      productId,
      quantity
    };
    dispatch({
      type: UPDATE_ITEM_QUANTITY,
      payload
    });
};

// Create and send new order
export const createNewOrders = shopCartItems => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
  
    const body = {
      shopCartItems
    }
  
    const res = await axios.post('/api/orders', body, config);

    dispatch({
      type: CREATE_NEW_ORDER,
      payload: res.data
    })

    setTimeout(() => dispatch({ type: REMOVE_CREATE_ORDER }), 5000000);
    return res.data;
  } catch(error) {
    console.error(error);
    dispatch({
      type: NEW_ORDER_ERROR,
      payload: error
    });
  }
}

//toggle shopcartview on/off:
export const toggleShopCart = () => dispatch => {
  dispatch({
    type: TOGGLE_SHOPCART
  });
}

//set loading:
export const setLoading = () => dispatch => {
  dispatch({
    type: SET_LOADING
  })
}


