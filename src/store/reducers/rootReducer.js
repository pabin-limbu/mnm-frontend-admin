import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import authReducers from "./auth.reducers";

const rootreducer = combineReducers({
  auth: authReducers,
  user: userReducer,
});

export default rootreducer;
