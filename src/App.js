import React from "react";
import "./App.css";

import AppRoutes from "./routes/routes";
import { Routes, Route } from "react-router-dom";
import { Sidebar, Header } from "./components";

const App = () => {
    return (
        <div className="relative bg-main-dark-bg">
            <Sidebar />
            <Header />
            <div className="pl-[2.5rem]">
                <AppRoutes />
            </div>
        </div>
    );
};

export default App;
