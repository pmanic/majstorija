import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

/*-----------------------------------------------KORISNIK-----------------------------------------------------*/

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data, //err object sa servera
      })
    );
};

// Login user - Get User Token
// export const loginUser = (userData) => (dispatch) => {
//   axios
//     .post("/api/users/login", userData)
//     .then((res) => {
//       // Save to local storage
//       const { token, role } = res.data;
//       // Set token to local storage
//       localStorage.setItem("jwtToken", token);
//       localStorage.setItem("role", role);
//       // Set token to Auth header
//       setAuthToken(token); //Dodaje authorization token na svaki request koji napravimo ako smo logovani (headers iz postmena)
//       // (Decode token) Extract user and user info from token with JWT decode
//       const decoded = jwt_decode(token);
//       // Set current user
//       dispatch(setCurrentUser(decoded));
//     })
//     .catch((err) =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data, //err object sa servera
//       })
//     );
// };

// Login user - Get User Token
export const logMeIn = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      // Save to local storage
      const { token, role } = res.data;
      // Set token to local storage
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("role", role);
      // Set token to Auth header
      setAuthToken(token); //Dodaje authorization token na svaki request koji napravimo ako smo logovani (headers iz postmena)
      // (Decode token) Extract user and user info from token with JWT decode
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data, //err object sa servera
      })
    );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// Logout User
export const logoutUser = () => (dispatch) => {
  // Remove token from localstorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false); //funckija setAuthToken proverava za token i ovde ga postavljamo na false, i to ga brise
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({})); //reduceru saljemo prazan objekat i time gubimo autentikaciju (payload je empty objekat)
};

/*-----------------------------------------------MAJSTOR-----------------------------------------------------*/

// Register Repairman
export const registerRepairman = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/registerrepairman", userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data, //err object sa servera
      })
    );
};

// Login repairman - Get Repairman Token
// export const loginRepairman = (userData) => (dispatch) => {
//   axios
//     .post("/api/users/loginrepairman", userData)
//     .then((res) => {
//       // Save to local storage
//       const { token, role } = res.data;
//       // Set token to local storage
//       localStorage.setItem("jwtToken", token);
//       localStorage.setItem("role", role);
//       // Set token to Auth header
//       setAuthToken(token); //Dodaje authorization token na svaki request koji napravimo ako smo logovani (headers iz postmena)
//       // (Decode token) Extract user and user info from token with JWT decode
//       const decoded = jwt_decode(token);
//       // Set current user
//       dispatch(setCurrentUser(decoded));
//     })
//     .catch((err) =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data, //err object sa servera
//       })
//     );
// };

/*-----------------------------------------------ADMIN-----------------------------------------------------*/

// Login admin - Get Admin Token
// export const loginAdmin = (userData) => (dispatch) => {
//   axios
//     .post("/api/users/loginadmin", userData)
//     .then((res) => {
//       // Save to local storage
//       const { token, role } = res.data;
//       // Set token to local storage
//       localStorage.setItem("jwtToken", token);
//       localStorage.setItem("role", role);
//       // Set token to Auth header
//       setAuthToken(token); //Dodaje authorization token na svaki request koji napravimo ako smo logovani (headers iz postmena)
//       // (Decode token) Extract user and user info from token with JWT decode
//       const decoded = jwt_decode(token);
//       // Set current user
//       dispatch(setCurrentUser(decoded));
//     })
//     .catch((err) =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data, //err object sa servera
//       })
//     );
// };
