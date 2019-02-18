import axios from "axios";
import setAuthToken from '../service/setAuthToken'
import jwt_decode from 'jwt-decode'
import {
  REGISTER_USER,
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";

const host =
  process.env.NODE_ENV === "production" ?
  "https://glacial-refuge-80009.herokuapp.com/api" :
  "http://localhost:4000/api";


export const registerUser = (userData, history) => dispatch => {
  axios
    .post(`${host}/users/register`, userData)
    .then(res => {
      history.push('/login')
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = (userData) => dispatch => {
  axios
    .post(`${host}/users/login`, userData)
    .then(res => {
      const {
        token
      } = res.data
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      const decoded = jwt_decode(token)
      dispatch(setCurrentUser(decoded))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken')
  setAuthToken(false)
  dispatch(setCurrentUser({}))
}