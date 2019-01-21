import { GET_ERROR, CLEARE_ERRORS } from "./types";
import { SET_CURRENT_USER } from "./types";

import jwt_decode from "jwt-decode";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const registerUser = (userData, history) => dispatch => {
  dispatch(cleareErrors());
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => {
      dispatch({
        type: GET_ERROR,
        payload: err.response.data
      });
    });
};

export const loginUser = userData => dispatch => {
  dispatch(cleareErrors());
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;

      localStorage.setItem("jwtToken", token);

      setAuthToken(token);

      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERROR,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

export const cleareErrors = () => {
  return {
    type: CLEARE_ERRORS
  };
};
