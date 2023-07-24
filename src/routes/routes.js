import { Home, LoginPage, News, RegisterPage } from "../pages";
import PrivateRoutes from ".";
import { Routes, Route, Navigate } from "react-router-dom";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/index" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/coins" element="Coins" />
            <Route path="/favorite-coins" element="favorite Coins" />
            <Route path="/profile" exact element="Profile" />
            <Route path="/signup" element={<PrivateRoutes />}>
                <Route path="/signup" exact element={<RegisterPage />} />
            </Route>
            <Route path="/signin" element={<PrivateRoutes />}>
                <Route path="/signin" exact element={<LoginPage />} />
            </Route>
            <Route path="/guide" exact element="Guia" />

            <Route path="ErrorPage" element="erro" />
            <Route path="*" element={<Navigate to="/ErrorPage" replace />} />
        </Routes>
    );
};

export default AppRoutes;
