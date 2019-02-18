import axios from "axios";
import setAuthToken from '../service/setAuthToken'
import jwt_decode from 'jwt-decode'
import {
  FETCH_ALL_TASKS,
  GET_ERRORS,
  TASKS_LOADING,
  DELETE_TASK,
  ADD_TASK
} from "./types";

const host =
  process.env.NODE_ENV === "production" ?
  "https://glacial-refuge-80009.herokuapp.com/api" :
  "http://localhost:4000/api";


export const addTasks = (taskData) => dispatch => {

  axios
    .post(`${host}/tasks`, taskData)
    .then(res => {
      dispatch({
        type: ADD_TASK,
        payload: res.data
      })
      console.log(res.data)
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};




export const fetchAllTasks = () => dispatch => {
  dispatch(setProfileLoading())
  axios
    .get(`${host}/tasks`)
    .then(res => {
      dispatch({
        type: FETCH_ALL_TASKS,
        payload: res.data
      })
      console.log(res.data)
    })
    .catch(err =>
      dispatch({
        type: FETCH_ALL_TASKS,
        payload: null
      })
    );
};

export const deleteTask = (id) => dispatch => {

  axios
    .delete(`${host}/tasks/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_TASK,
        payload: id

      })
      console.log(id)
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setProfileLoading = () => {
  return {
    type: TASKS_LOADING
  }
}