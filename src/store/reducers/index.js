import { combineReducers } from "redux";
import map from "./map";
import authReducer from "./auth";

export default combineReducers({
    map: map,
    auth: authReducer,
});
