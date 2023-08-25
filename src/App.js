import React from "react";
import "./App.css";

import AppRoutes from "./routes/routes";
import { Sidebar, Header } from "./components";

import { useStateContext } from "./contexts/ContextProvider";

const App = () => {
    return (
        <div className="relative bg-main-dark-bg min-h-screen">
            <Sidebar />
            <Header />
            <AppRoutes />
        </div>
    );
};

export default App;
