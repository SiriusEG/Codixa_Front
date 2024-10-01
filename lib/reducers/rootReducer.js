import { combineReducers } from "redux";
import login from "./auth/logInSlice";
import user from "./user/userSlice";

const rootReducer = combineReducers({
  login,
  user,
});

export default rootReducer;
