import { combineReducers } from 'redux';
//import reducers here
import alert from './alert';
import auth from './auth';
import dashboard from './dashboard';
import order from './order';
import navbar from './navbar';
import productSearch from './productSearch';
import shopCart from './shopCart';
import toolbar from './toolbar';
import myProducts from './myProducts';
import product from './product';

export default combineReducers({
  //export reducers here
  alert,
  auth,
  dashboard,
  order,
  navbar,
  productSearch,
  shopCart,
  toolbar,
  myProducts,
  product
});