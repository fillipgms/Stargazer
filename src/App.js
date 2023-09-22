import React from "react";
import "./App.css";

import AppRoutes from "./routes/routes";
import { Sidebar, Header } from "./components";

const App = () => {
    return (
        <div className="relative bg-main-dark-bg min-h-screen overflow-hidden">
            <Sidebar />
            <Header />
            <AppRoutes />
        </div>
    );
};

export default App;
