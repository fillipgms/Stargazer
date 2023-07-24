import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./contexts/ContextProvider";
import { Provider } from "react-redux";

import store from "./app/store";
import App from "./App";

import "./index.css";

ReactDOM.render(
    <ContextProvider>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </ContextProvider>,
    document.getElementById("root")
);
