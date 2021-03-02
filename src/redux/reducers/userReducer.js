import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  SUBMIT_PHOTO,
} from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  loading: false,
  users: [],
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        ...action.payload,
        loading: false,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case SUBMIT_PHOTO:
      let index = state.users.findIndex(
        (user) => user.handle === action.payload.handle
      );
      state.users[index] = action.payload;
      if (state.user.handle === action.payload.handle) {
        state.handle = action.payload;
      }
      return {
        authenticated: true,
        ...action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
