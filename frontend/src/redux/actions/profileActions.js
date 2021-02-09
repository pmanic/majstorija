import axios from "axios";

import {
  GET_USER_PROFILE,
  GET_USER_PROFILES,
  SET_CURRENT_USER,
  GET_REPAIRMAN_PROFILE,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  GET_REPAIRMAN_PROFILES,
  GET_REPAIRMAN_NOTIFICATIONS,
} from "./types";

/*-----------------------------------------------KORISNIK-----------------------------------------------------*/

//Get current user profile
export const getCurrentUserProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/userprofile")
    .then((res) =>
      dispatch({
        type: GET_USER_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_USER_PROFILE,
        payload: {},
      })
    );
};

export const updateUserProfile = (profileData, history) => (dispatch) => {
  axios
    .post("/api/userprofile/editprofile", profileData)
    .then((res) => history.push("/user/editprofile"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Get all user profiles
export const getUserProfiles = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/userprofile/all")
    .then((res) =>
      dispatch({
        type: GET_USER_PROFILES,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_USER_PROFILES,
        payload: null,
      })
    );
};

//Profile loading
export const setProfileLoading = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};

//Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};

export const deleteUser = () => (dispatch) => {
  axios
    .delete("/api/userprofile/deleteuser")
    .then((res) =>
      dispatch({
        type: SET_CURRENT_USER,
        payload: {},
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

/*-----------------------------------------------MAJSTOR-----------------------------------------------------*/

//Get current repairman profile
export const getCurrentRepairmanProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/repairmanprofile")
    .then((res) =>
      dispatch({
        type: GET_REPAIRMAN_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_REPAIRMAN_PROFILE,
        payload: {},
      })
    );
};

export const getCurrentRepairmanNotifications = () => (dispatch) => {
  axios
    .get("/api/notifications")
    .then((res) =>
      dispatch({
        type: GET_REPAIRMAN_NOTIFICATIONS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_REPAIRMAN_NOTIFICATIONS,
        payload: {},
      })
    );
};

//Update repairman profile
export const updateRepairmanProfile = (profileData, history) => (dispatch) => {
  axios
    .post("/api/repairmanprofile/editprofile", profileData)
    .then((res) => history.push("/repairman/editprofile"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Add experience to repairman profile
export const addExperience = (expData, history) => (dispatch) => {
  axios
    .post("/api/repairmanprofile/editprofile/experience", expData)
    .then((res) => history.push("/repairman/editprofile"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//change repairman duty
export const changeDuty = (handle) => (dispatch) => {
  axios
    .post(`/api/repairmanprofile/editprofile/changeduty/${handle}`)
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Add education to repairman profile
export const addEducation = (educData, history) => (dispatch) => {
  axios
    .post("/api/repairmanprofile/editprofile/education", educData)
    .then((res) => history.push("/repairman/editprofile"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Get all repairman profiles
export const getRepairmanProfiles = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/repairmanprofile/all")
    .then((res) =>
      dispatch({
        type: GET_REPAIRMAN_PROFILES,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_REPAIRMAN_PROFILES,
        payload: null,
      })
    );
};

//Get all repairmans on duty
export const getRepairmansOnDuty = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/repairmanprofile/allonduty")
    .then((res) =>
      dispatch({
        type: GET_REPAIRMAN_PROFILES,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_REPAIRMAN_PROFILES,
        payload: null,
      })
    );
};

export const getRepairmanProfileByHandle = (handle) => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/repairmanprofile/handle/${handle}`)
    .then((res) =>
      dispatch({
        type: GET_REPAIRMAN_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_REPAIRMAN_PROFILE,
        payload: null,
      })
    );
};

export const deleteExperience = (id) => (dispatch) => {
  axios
    .delete(`/api/repairmanprofile/experience/${id}`)
    .then((res) =>
      dispatch({
        type: GET_REPAIRMAN_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const deleteEducation = (id) => (dispatch) => {
  axios
    .delete(`/api/repairmanprofile/education/${id}`)
    .then((res) =>
      dispatch({
        type: GET_REPAIRMAN_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const deleteRepairman = () => (dispatch) => {
  axios
    .delete("/api/repairmanprofile/deleterepairman")
    .then((res) =>
      dispatch({
        type: SET_CURRENT_USER,
        payload: {},
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const searchRepairman = (search) => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .post("/api/repairmanprofile/search", search)
    .then((res) =>
      dispatch({
        type: GET_REPAIRMAN_PROFILES,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_REPAIRMAN_PROFILES,
        payload: null,
      })
    );
};

/*-----------------------------------------------ADMIN-----------------------------------------------------*/

export const deleteRepairmanById = (repairman) => (dispatch) => {
  axios.delete(`/api/repairmanprofile/deleterepairman/${repairman}`);
};

export const deleteUserById = (user) => (dispatch) => {
  axios.delete(`/api/userprofile/deleteuser/${user}`);
};
