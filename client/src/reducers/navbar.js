import {
  CHANGE_SEARCH_FIELD,
  SUBMIT_SEARCH
} from '../actions/constants';


const initialState = {
  searchField: ''
}

export default function (state = initialState, action = {}) {
  const {
    type,
    payload
  } = action;

  switch (type) {
    case CHANGE_SEARCH_FIELD:
      return {
        ...state,
        searchField: payload
      };
    case SUBMIT_SEARCH:
      return {
        ...state,
      }
      default:
        return state;
  }
}