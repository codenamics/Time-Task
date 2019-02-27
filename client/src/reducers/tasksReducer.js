// import {
//     ADD_TASK,

//     TASKS_LOADING,
//     DELETE_TASK,

// } from '../actions/types.js'


// const initialState = {
//     loading: false,

//     tasks: [],
//     task: {}

// }

// export default function (state = initialState, action) {
//     switch (action.type) {

//         // case ADD_TASK:
//         //     return {
//         //         ...state,
//         //         tasks: [action.payload, ...state.tasks]
//         //     }
//         case TASKS_LOADING:
//             return {
//                 ...state,
//                 loading: true
//             }

//             // case DELETE_TASK:
//             //     return {
//             //         ...state,
//             //         tasks: state.tasks.filter(task => task._id !== action.payload)
//             //     }
//         default:
//             return state

//     }
// }