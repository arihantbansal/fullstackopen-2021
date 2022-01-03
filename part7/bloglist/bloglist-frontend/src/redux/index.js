import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import notificationReducer from "./notificationReducer";
import blogReducer from "./blogReducer";
import userReducer from "./userReducer";

const reducer = combineReducers({
	user: userReducer,
	blogs: blogReducer,
	notification: notificationReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
