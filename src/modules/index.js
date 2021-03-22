import counter from "./counter";
import {combineReducers} from "redux";
import posts from "./posts";

const rootReducer = combineReducers({counter, posts})

export default rootReducer;