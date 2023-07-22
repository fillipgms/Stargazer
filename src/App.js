import React from "react";
import "./App.css";

import AppRoutes from "./routes/routes";
import { Routes, Route } from "react-router-dom";
import { Sidebar, Header, SignUp, Login } from "./components";

import { useStateContext } from "./contexts/ContextProvider";

const App = () => {
    const { SignUpPopUp, LoginPopUp } = useStateContext();

    return (
        <div className="relative bg-main-dark-bg min-h-screen">
            <Sidebar />
            <Header />
            <AppRoutes />
        </div>
    );
};

export default App;
