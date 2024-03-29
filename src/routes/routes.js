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
    AdminGuide,
    Guias,
    GuiasEspecificos,
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
            <Route path="/guias" exact element={<Guias />} />
            <Route path="/guias/:nome" element={<GuiasEspecificos />} />
            <Route path="/admin" element={<AdminRoutes />}>
                <Route
                    path="/admin"
                    element={<Navigate to="/admin/guide" replace />}
                />
            </Route>
            <Route path="/admin/guide" element={<AdminRoutes />}>
                <Route path="/admin/guide" element={<AdminGuide />} />
            </Route>

            <Route path="ErrorPage" element={<ErrorPage />} />
            <Route path="*" element={<Navigate to="/ErrorPage" replace />} />
        </Routes>
    );
};

export default AppRoutes;
