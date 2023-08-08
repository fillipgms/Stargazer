import {
    Home,
    LoginPage,
    News,
    RegisterPage,
    Crypto,
    CoinPage,
    FavoriteCoins,
    LoggedHome,
    PasswordReset,
    Admin,
    ErrorPage,
} from "../pages";
import { PrivateRoutes, LoggedRoutes, AdminRoutes } from ".";
import { Routes, Route, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const AppRoutes = () => {
    const { signed } = useStateContext();

    return (
        <Routes>
            <Route
                path="/"
                exact
                element={signed ? <LoggedHome /> : <Home />}
            />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/index" element={<Navigate to="/" replace />} />
            <Route path="/news" element={<News />} />
            <Route path="/coins" element={<Crypto />} />
            <Route path="/coins/:id" element={<CoinPage />} />
            <Route path="/favorite-coins" element={<LoggedRoutes />}>
                <Route path="/favorite-coins" element={<FavoriteCoins />} />
            </Route>
            <Route path="/signup" element={<PrivateRoutes />}>
                <Route path="/signup" exact element={<RegisterPage />} />
            </Route>
            <Route path="/signin" element={<PrivateRoutes />}>
                <Route path="/signin" exact element={<LoginPage />} />
            </Route>
            <Route path="/passwordreset" element={<PrivateRoutes />}>
                <Route
                    path="/passwordreset"
                    exact
                    element={<PasswordReset />}
                />
            </Route>
            <Route path="/guide" exact element="Guia" />
            <Route path="/admin/*" element={<AdminRoutes />}>
                <Route path="/admin/*" exact element={<Admin />} />
            </Route>

            <Route path="ErrorPage" element={<ErrorPage />} />
            <Route path="*" element={<Navigate to="/ErrorPage" replace />} />
        </Routes>
    );
};

export default AppRoutes;
