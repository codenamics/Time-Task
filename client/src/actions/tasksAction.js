import axios from "axios";

import {
  GET_ERRORS,
  ADD_TASK,
} from "./types";

const host = "http://localhost:4000/api";


export const addTasks = (taskData) => dispatch => {
  axios
    .post(`${host}/tasks/addTask`, taskData)
    .then(res => {
      dispatch({
        type: ADD_TASK,
        payload: res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};