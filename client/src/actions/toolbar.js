import {
  TOGGLE_TOOLBAR
} from '../actions/constants';


export const toggleToolbar = () => dispatch => {
  dispatch({
    type: TOGGLE_TOOLBAR
  });
};

