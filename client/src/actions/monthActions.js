import axios from "axios";

import {
    FETCH_ALL_MONTHS_AND_TASKS,
    GET_ERRORS,
    ADD_MONTH
} from "./types";

const host = "http://localhost:4000/api";


export const addMonth = (data) => dispatch => {
    axios
        .post(`${host}/tasks`, data)
        .then(res => {
            dispatch({
                type: ADD_MONTH,
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


export const fetchAllMonthAndTasks = () => dispatch => {
    axios
        .get(`${host}/tasks`)
        .then(res => {
            dispatch({
                type: FETCH_ALL_MONTHS_AND_TASKS,
                payload: res.data
            })
            console.log(res.data)
        })
        .catch(err =>
            dispatch({
                type: FETCH_ALL_MONTHS_AND_TASKS,
                payload: null
            })
        );
};