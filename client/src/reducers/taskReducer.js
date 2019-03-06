import {
    ADD_TASK,
    LOAD_TIME,
    LOADING_STATE
} from '../actions/types.js'


const initialState = {

    time: [],
    loading: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_STATE:
            return {
                ...state,
                loading: true
            };
        case ADD_TASK:
            return {
                ...state,
                month: action.payload,
                loading: false,
            }
        case LOAD_TIME:
            return {
                ...state,

                time: action.payload,
                loading: false,

            }
        default:
            return state

    }
}