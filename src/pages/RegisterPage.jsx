import React, { useEffect } from "react";
import { SignUp } from "../components";

const RegisterPage = () => {
    useEffect(() => {
        document.title = "Registro";
    });

    return (
        <div className="min-h-screen bg-wallpaper bg-cover">
            <SignUp />
        </div>
    );
};

export default RegisterPage;
