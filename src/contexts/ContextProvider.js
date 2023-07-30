import React, { createContext, useContext, useEffect, useState } from "react";
import { app } from "../services/firebase";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    sendPasswordResetEmail,
} from "firebase/auth";
import { getFirestore, onSnapshot } from "firebase/firestore";
import { Navigate } from "react-router-dom";
import { doc } from "firebase/firestore";
import axios from "axios";
import { CoinList } from "../services/coinGeckoApi";

export const db = getFirestore(app);

const StateContext = createContext();
const provider = new GoogleAuthProvider();

export const ContextProvider = ({ children }) => {
    const auth = getAuth(app);
    const db = getFirestore(app);

    const [scroll, setScroll] = useState(undefined);
    const [profileMenu, setProfileMenu] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    const [screenSize, setScreenSize] = useState(undefined);
    const [loginError, setLoginError] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [user, setUser] = useState("");
    const [currency, setCurrency] = useState("BRL");
    const [symbol, setSymbol] = useState("R$");
    const [favorites, setFavorites] = useState([]);
    const [coins, setCoins] = useState();

    useEffect(() => {
        if (user) {
            const coinRef = doc(db, "favorites", user.uid);

            var desisncrever = onSnapshot(coinRef, (coin) => {
                if (coin.exists()) {
                    console.log(coin.data().coins);
                    setFavorites(coin.data().coins);
                } else {
                    console.log("Sem favoritos");
                }
            });
            return () => {
                desisncrever();
            };
        }
    }, [user]);

    useEffect(() => {
        if (currency === "BRL") setSymbol("R$");
        else if (currency === "USD") setSymbol("$");
    }, [currency]);

    useEffect(() => {
        const loadStoreAuth = () => {
            const sessionUser = localStorage.getItem("@AuthFirebase:user");
            if (sessionUser) {
                setUser(JSON.parse(sessionUser));
            }
        };
        loadStoreAuth();
    }, []);

    const signInGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                setUser(user);
                localStorage.setItem(
                    "@AuthFirebase:user",
                    JSON.stringify(user)
                );
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
            });
        return;
    };

    const createUser = async (e) => {
        e.preventDefault();
        if (password === passwordRepeat) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (result) => {
                    const user = result.user;
                    setUser(user);
                    await updateProfile(user, {
                        displayName: username,
                    });
                    localStorage.setItem(
                        "@AuthFirebase:user",
                        JSON.stringify(user)
                    );
                })
                .catch((error) => {
                    setLoginError(error);
                });
        } else {
            setLoginError("senhas diferentes");
        }
    };

    const signInUser = async (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                const user = result.user;
                setUser(user);
                localStorage.setItem(
                    "@AuthFirebase:user",
                    JSON.stringify(user)
                );
            })
            .catch((error) => {
                setLoginError(error);
            });
    };

    const passworReset = async (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email);

        return <Navigate to="/login" />;
    };

    function signOut() {
        localStorage.removeItem("@AuthFirebase:user");
        setUser(null);

        return <Navigate to="/" />;
    }

    return (
        <StateContext.Provider
            value={{
                db,
                menuActive,
                setMenuActive,
                screenSize,
                setScreenSize,
                scroll,
                setScroll,
                signInGoogle,
                signed: !!user,
                user,
                signOut,
                username,
                setUsername,
                email,
                setEmail,
                password,
                setPassword,
                setPasswordRepeat,
                passwordRepeat,
                createUser,
                signInUser,
                loginError,
                setLoginError,
                profileMenu,
                setProfileMenu,
                currency,
                setCurrency,
                symbol,
                favorites,
                coins,
                passworReset,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
