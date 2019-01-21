import axios from "axios";

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERROR,
  SET_CURRENT_USER,
  CLEARE_ERRORS
} from "./types";

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: {}
      })
    );
};

export const getCurrentProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

export const deleteAccount = () => dispatch => {
  if (window.confirm("آیا مطمئنید؟ احیای حساب کاربری امکان پذیر نخواهد بود")) {
    axios
      .delete("/api/profile")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERROR,
          payload: err.response.data
        })
      );
  }
};

export const createProfile = (profileData, history) => dispatch => {
  dispatch(cleareErrors());
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERROR,
        payload: err.response.data
      })
    );
};

export const addExperience = (experienceData, history) => dispatch => {
  dispatch(cleareErrors());
  axios
    .post("/api/profile/experience", experienceData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERROR,
        payload: err.response.data
      })
    );
};

export const addEducation = (educationData, history) => dispatch => {
  dispatch(cleareErrors());
  axios
    .post("/api/profile/education", educationData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERROR,
        payload: err.response.data
      })
    );
};

export const deleteExperience = exp_id => dispatch => {
  axios
    .delete(`/api/profile/experience/${exp_id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERROR,
        payload: err.response.data
      })
    );
};

export const deleteEducation = edu_id => dispatch => {
  axios
    .delete(`/api/profile/education/${edu_id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERROR,
        payload: err.response.data
      })
    );
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

export const cleareErrors = () => {
  return {
    type: CLEARE_ERRORS
  };
};
