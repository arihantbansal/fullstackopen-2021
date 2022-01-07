import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import store from "redux/index";
import App from "./App";
import "./index.css";
import theme from "./theme";

ReactDOM.render(
	<Provider store={store}>
		<ChakraProvider theme={theme}>
			<Router>
				<App />
			</Router>
		</ChakraProvider>
	</Provider>,
	document.getElementById("root")
);
