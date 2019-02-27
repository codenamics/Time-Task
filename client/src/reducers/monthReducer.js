import {

    FETCH_ALL_MONTHS_AND_TASKS,
    ADD_TASK,
    ADD_MONTH
} from '../actions/types.js'
import isEmpty from '../validation/is-empty'

const initialState = {
    loading: false,
    month: [],
    tasks: [],
    task: {}

}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_MONTH:
            return {
                ...state,
                month: [action.payload, ...state.month]
            }
        case FETCH_ALL_MONTHS_AND_TASKS:
            return {
                ...state,
                month: action.payload,
                loading: false
            }
        case ADD_TASK:
            return {
                ...state,
                month: action.payload
            }
            // case TASKS_LOADING:
            //     return {
            //         ...state,
            //         loading: true
            //     }
            // case FETCH_ALL_TASKS:
            //     return {
            //         ...state,
            //         tasks: action.payload,
            //         loading: false

            //     }
            // case DELETE_TASK:
            //     return {
            //         ...state,
            //         tasks: state.tasks.filter(task => task._id !== action.payload)
            //     }
        default:
            return state

    }
}