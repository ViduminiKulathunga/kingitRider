import {
  SET_MEMBERS,
  SET_MEMBER,
  POST_MEMBER,
  LOADING_DATA,
  LOADING_UI,
  LOADING_DATA_OFFSCREAN,
  SET_ERRORS,
  CLEAR_ERRORS,
  STOP_LOADING_UI,
  SET_DRIVER_PERFORMANCE,
  SET_DRIVER_PROFILE,
  STOP_LOADING__OFFSCREAN_UI,
  SET_DRIVER_ALCOHOL_PROFILE,
  POST_USERLOG,
  DELETE_USER,
} from "../types";
import axios from "axios";

export const getMembers = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/userss")
    .then((res) => {
      dispatch({ type: SET_MEMBERS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_MEMBERS, payload: [] });
    });
};

//Get User
export const getMember = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      //console.log(res.data);
      dispatch({ type: SET_MEMBER, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

//Get DriverLog
export const getDriverPerformance = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/driverperformance")
    .then((res) => {
      console.log(res.data);
      dispatch({ type: SET_DRIVER_PERFORMANCE, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

export const getDriverCommissionAlcohol = (month, year) => (dispatch) => {
  dispatch({ type: LOADING_DATA_OFFSCREAN });
  axios
    .get(`/driver/${month}/${year}/salary`)
    .then((res) => {
      console.log(res.data, " res.data res.data");
      dispatch({ type: SET_DRIVER_PROFILE, payload: res.data });
      dispatch({ type: STOP_LOADING__OFFSCREAN_UI });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const viewDrunkenLog = (handle, month, year) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/driver/${handle}/${month}/${year}/alcohol`)
    .then((res) => {
      dispatch({ type: SET_DRIVER_ALCOHOL_PROFILE, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const registerUser = (newUser) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/registeruser", newUser)
    .then((res) => {
      dispatch({ type: POST_MEMBER, payload: res.data.message });
      //console.log(res.data.message);

      dispatch({ type: STOP_LOADING_UI });
      dispatch(clearErrors());
      //dispatch({type: CLEAR_ERRORS});
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const deleteUser = (handle) => (dispatch) => {
  axios
    .delete(`/user/${handle}`)
    .then(() => {
      dispatch({ type: DELETE_USER, payload: handle });
    })
    .catch((err) => console.log(err));
};

export const updateUserLog = (handle, updateUserLog) => (dispatch) => {
  axios
    .post(`/userlog/${handle}`, updateUserLog)
    .then((res) => {
      console.log("Success");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
