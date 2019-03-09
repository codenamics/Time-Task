import {
    FETCH_ALL_MONTHS_AND_TASKS,
    ADD_MONTH,
    DELETE_MONTH,
    LOADING_STATE,
    LOADING_DONE,
    FILTER_MONTH

} from '../actions/types.js'

const initialState = {

    month: [],
    loading: false,

}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_STATE:
            return {
                ...state,
                loading: true
            }

        case LOADING_DONE:
            return {
                ...state,
                loading: false
            }

        case ADD_MONTH:
            return {
                ...state,
                month: [action.payload, ...state.month],
                loading: false,
            }
        case FETCH_ALL_MONTHS_AND_TASKS:
            return {
                ...state,
                month: action.payload,
                loading: false
            }
        case FILTER_MONTH:
            return {
                ...state,
                month: state.month.filter(month => month.name === action.payload)
            }

        case DELETE_MONTH:
            return {
                ...state,
                month: state.month.filter(month => month._id !== action.payload)
            }
        default:
            return state
    }
}