import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Loading } from "../components";

export const PrivateRoutes = () => {
    const { signed } = useStateContext();

    return !signed ? <Outlet /> : <Navigate to="/" />;
};

export const LoggedRoutes = () => {
    const { signed } = useStateContext();

    return !signed ? <Navigate to="/signup" /> : <Outlet />;
};

export const AdminRoutes = () => {
    const { isAdmin, loading } = useStateContext();

    return loading ? (
        <Loading />
    ) : isAdmin ? (
        <Outlet />
    ) : (
        <Navigate to="/ErrorPage" replace />
    );
};
