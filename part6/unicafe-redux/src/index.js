import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer from "./reducer";
import "./index.css";

const store = createStore(reducer);

const App = () => {
	return (
		<div>
			<button onClick={e => store.dispatch({ type: "GOOD" })}>good</button>
			<button onClick={e => store.dispatch({ type: "OK" })}>neutral</button>
			<button onClick={e => store.dispatch({ type: "BAD" })}>bad</button>
			<div>good {store.getState().good}</div>
			<div>neutral {store.getState().ok}</div>
			<div>bad {store.getState().bad}</div>
		</div>
	);
};

const renderApp = () => {
	ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
