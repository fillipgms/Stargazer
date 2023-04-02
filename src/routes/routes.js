import { Home } from "../pages";
import { Routes, Route, Navigate } from "react-router-dom";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/home" element="Home" />
            <Route path="/index" element="index" />
            <Route path="/news" element="news" />
            <Route path="/coins" element="Coins" />
            <Route path="/favorite-coins" element="favorite Coins" />
            <Route path="/profile" exact element="Profile" />
            <Route path="/signup" exact element="Create Acount" />
            <Route path="/signin" exact element="Login" />
            <Route path="/guide" exact element="Guia" />

            <Route path="ErrorPage" element="erro" />
            <Route path="*" element={<Navigate to="/ErrorPage" replace />} />
        </Routes>
    );
};

export default AppRoutes;
