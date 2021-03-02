import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  STOP_LOADING__OFFSCREAN_UI,
  LOADING_DATA_OFFSCREAN,
} from "../types";

const initialState = {
  loading: false,
  errors: null,
  loadingOffScrean: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      };
      case LOADING_DATA_OFFSCREAN:
        return {
          ...state,
          loadingOffScrean: true,
        };
    case STOP_LOADING__OFFSCREAN_UI:
      return {
        ...state,
        loadingOffScrean: false,
      };
    default:
      return state;
  }
}
