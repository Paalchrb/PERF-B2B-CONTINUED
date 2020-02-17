import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_LOADER
} from './constants';

//Load user
export const loadUser = () => async dispatch => {
  if(localStorage.token) {
    setAuthToken(localStorage.token)
  };

  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data 
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//Login User
export const login = (email, password) => async dispatch => {
  const config =  {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data 
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    };

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

//Logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};

// set loading
export const setLoader = () => dispatch => {
  dispatch({ type: SET_LOADER });
}