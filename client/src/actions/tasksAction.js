import axios from "axios";
import {
  fetchAllMonthAndTasks
} from './monthActions'
import {
  GET_ERRORS,
  ADD_TASK,
  LOAD_TIME,
  LOADING_STATE
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

export const deleteTask = (id, taskID) => dispatch => {
  axios
    .delete(`${host}/tasks/task/${id}/${taskID}`)
    .then(res => {
      dispatch(
        fetchAllMonthAndTasks()
      )
    }).catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const loadTime = (id, task_id) => dispatch => {
  dispatch(setLoading())
  axios.get(`${host}/tasks/${id}/${task_id}`)
    .then((res) => {
      dispatch({
        type: LOAD_TIME,
        payload: res.data[0].time
      })
    })
    .catch(err =>
      dispatch({
        type: LOAD_TIME,
        payload: null
      })
    );
};

export const postTime = (id, task_id, data, props) => dispatch => {
  axios
    .put(`http://localhost:4000/api/tasks/${id}/${task_id}`, data)
    .then(() => {
      props.history.push('/dashboard')
    }).catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setLoading = () => {
  return {
    type: LOADING_STATE
  }
}