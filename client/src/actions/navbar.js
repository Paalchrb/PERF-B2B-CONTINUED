import {
  CHANGE_SEARCH_FIELD,
  SUBMIT_SEARCH
} from '../actions/constants';

//Update searchfield value
export const setSearchField = text => dispatch => {
  dispatch({
    type: CHANGE_SEARCH_FIELD,
    payload: text
  });
};

//Handle submit search
export const submitSearch = text => async dispatch => {
  dispatch({
    type: SUBMIT_SEARCH
  });  
};
