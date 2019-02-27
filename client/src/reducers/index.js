import {
  combineReducers
} from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import monthReducer from "./monthReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,

  month: monthReducer
});