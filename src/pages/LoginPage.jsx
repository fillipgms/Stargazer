import React, { useEffect } from "react";
import { Login } from "../components";

const LoginPage = () => {
    useEffect(() => {
        document.title = "Login";
    });

    return (
        <div className="h-screen bg-wallpaper bg-cover">
            <Login />
        </div>
    );
};

export default LoginPage;
