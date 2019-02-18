import {
    ADD_TASK,
    FETCH_ALL_TASKS,
    TASKS_LOADING,
    DELETE_TASK
} from '../actions/types.js'
import isEmpty from '../validation/is-empty'

const initialState = {
    loading: false,
    tasks: [],
    task: {}

}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                tasks: [action.payload, ...state.tasks]
            }
        case TASKS_LOADING:
            return {
                ...state,
                loading: true
            }
        case FETCH_ALL_TASKS:
            return {
                ...state,
                tasks: action.payload,
                loading: false

            }
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload)
            }
        default:
            return state

    }
}