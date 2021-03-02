import {
  SET_MEMBERS,
  SET_MEMBER,
  POST_MEMBER,
  LOADING_DATA,
  SET_DRIVER_PERFORMANCE,
  SET_DRIVER_PROFILE,
  SET_DRIVER_ALCOHOL_PROFILE,
  POST_USERLOG,
  DELETE_USER,
} from "../types";

const initialState = {
  members: [],
  member: {
    credentials: {},
  },
  rankingDriver: {
    ranking: null,
  },
  drivers: {
    user: [],
    month: "",
    year: 0,
    createdAt: "",
    alcoholStatusPrevious: [],
  },
  performance: {
    driverCommission: [],
    alcoholStatus: [],
  },
  alcohol: {
    alcoholPerMonth: [],
  },
  loading: false,
  message: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_MEMBERS:
      return {
        ...state,
        members: action.payload,
        loading: false,
      };
    case SET_MEMBER:
      let showRanking =
        action.payload.credentials.role !== "driver"
          ? {ranking: null}
          : action.payload.ranking[0];
      return {
        ...state,
        member: action.payload,
        rankingDriver: showRanking,
      };
    case POST_MEMBER:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };
    case SET_DRIVER_PERFORMANCE:
      return {
        ...state,
        drivers: action.payload,
        loading: false,
      };
    case SET_DRIVER_PROFILE:
      return {
        ...state,
        performance: action.payload,
        loading: false,
      };
    case SET_DRIVER_ALCOHOL_PROFILE:
      return {
        ...state,
        alcohol: action.payload,
        loading: false,
      };
    case POST_USERLOG:
      return {
        ...state,
        loading: false,
      };
    case DELETE_USER:
      let index = state.members.findIndex(
        (user) => user.userId === action.payload
      );
      state.members.splice(index, 1);
      return {
        ...state,
      };
    default:
      return state;
  }
}
