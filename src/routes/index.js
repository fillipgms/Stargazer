import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export const PrivateRoutes = () => {
    const { signed } = useStateContext();

    return !signed ? <Outlet /> : <Navigate to="/" />;
};

export const LoggedRoutes = () => {
    const { signed } = useStateContext();

    return !signed ? <Navigate to="/signup" /> : <Outlet />;
};
