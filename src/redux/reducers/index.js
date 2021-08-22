import { combineReducers } from "redux";
import animationReducer from "./animation";
import clockReducer from "./clock";

const rootReducer = combineReducers({
    clock: clockReducer,
    animation: animationReducer,
});

export default rootReducer;