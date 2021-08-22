import { combineReducers } from "redux";
import clockReducer from "./clock";

const rootReducer = combineReducers({
    clock: clockReducer,
});

export default rootReducer;