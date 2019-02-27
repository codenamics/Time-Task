import {
  combineReducers
} from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import tasksReducer from "./tasksReducer";
import monthReducer from "./monthReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  tasks: tasksReducer,
  month: monthReducer
});