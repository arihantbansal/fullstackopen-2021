import { createStore, combineReducers } from "redux";
import notificationReducer from "./notificationReducer";

const reducer = combineReducers({
	notification: notificationReducer,
});

const store = createStore(reducer);

export default store;
