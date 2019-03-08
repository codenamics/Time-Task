import axios from "axios";
import {
    saveAs
} from "file-saver";
import {
    FETCH_ALL_MONTHS_AND_TASKS,
    GET_ERRORS,
    ADD_MONTH,
    DELETE_MONTH,
    LOADING_DONE,
    LOADING_STATE,
    LOADING_STATE_PDF,
    LOADING_DONE_PDF
} from "./types";

// const host = "https://vast-everglades-35412.herokuapp.com/api";
const host = "http://localhost:4000/api";

export const addMonth = (data, props) => dispatch => {
    axios
        .post(`${host}/tasks`, data)
        .then(res => {
            dispatch({
                type: ADD_MONTH,
                payload: res.data
            })
            props.history.push("/dashboard");
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const deleteMonth = (id) => dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone')) {
        axios
            .delete(`${host}/tasks/${id}`)
            .then(res => {
                dispatch({
                    type: DELETE_MONTH,
                    payload: id
                })
            })
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            );
    }
};

export const fetchAllMonthAndTasks = () => dispatch => {
    axios
        .get(`${host}/tasks`)
        .then(res => {
            dispatch({
                type: FETCH_ALL_MONTHS_AND_TASKS,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch({
                type: FETCH_ALL_MONTHS_AND_TASKS,
                payload: null
            })
        );
};

export const genPDF = (id, props) => dispatch => {
    dispatch(setLoadingPDF())
    axios
        .post(
            `${host}/tasks/create-pdf/${id}`
        )
        .then(() =>
            axios.get(
                `${host}/tasks/fetch-pdf`, {
                    responseType: "blob"
                }
            )
        )
        .then(res => {
            const pdfBlob = new Blob([res.data], {
                type: "application/pdf"
            });

            return saveAs(pdfBlob, "newPdf.pdf");
        })
        .then(() => {
            dispatch({
                type: LOADING_DONE,
            })
            props.history.push("/success");
        })
        .catch(err => console.log(err));
};

export const setLoadingPDF = () => {
    return {
        type: LOADING_STATE
    }
}