import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const PrivateRoutes = () => {
    const { signed } = useStateContext();

    return !signed ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
