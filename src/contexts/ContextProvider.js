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
    onAuthStateChanged,
} from "firebase/auth";
import {
    getFirestore,
    onSnapshot,
    getDoc,
    setDoc,
    query,
    where,
    getDocs,
} from "firebase/firestore";
import { Navigate } from "react-router-dom";
import { doc, collection } from "firebase/firestore";
import axios from "axios";
import { CoinList } from "../services/coinGeckoApi";

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
    const [guides, setGuides] = useState([]);
    const [coins, setCoins] = useState();
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState("geral");
    const [guideName, setGuideName] = useState("");
    const [guideDescription, setGuideDescription] = useState("");
    const [guiasGerais, setGuiasGerais] = useState([]);
    const [guiasEspecificos, setGuiasEspecificos] = useState([]);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
                setIsAdmin(false);
                setLoading(false);
            }
        });

        return () => {
            unsubscribeAuth();
        };
    }, []);

    useEffect(() => {
        if (user && user.uid) {
            const fetchIsAdminStatus = async () => {
                try {
                    const db = getFirestore(app);
                    const userRef = doc(db, "usuarios", user.uid);
                    const snapshot = await getDoc(userRef);
                    if (snapshot.exists()) {
                        const isAdmin = snapshot.data().isAdmin || false;
                        setIsAdmin(isAdmin);
                    } else {
                        console.log("Usuário não encontrado.");
                    }
                } catch (error) {
                    console.log("Erro:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchIsAdminStatus();
        } else {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            const coinRef = doc(db, "favorites", user.uid);

            var desisncrever = onSnapshot(coinRef, (coin) => {
                if (coin.exists()) {
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
            .then(async (result) => {
                const user = result.user;
                setUser(user);
                localStorage.setItem(
                    "@AuthFirebase:user",
                    JSON.stringify(user)
                );

                await createUserDocument(user, {
                    displayName: user.displayName,
                    isAdmin,
                });
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
                    await createUserDocument(user, {
                        displayName: username,
                        isAdmin,
                    });
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

    const createUserDocument = async (user, additionalData) => {
        if (!user || !user.uid) {
            console.log("Invalid user object or missing UID.");
            return;
        }

        if (
            !additionalData ||
            !additionalData.displayName ||
            additionalData.isAdmin === undefined
        ) {
            console.log(
                "Invalid additional data or missing displayName or isAdmin."
            );
            return;
        }

        try {
            const userRef = doc(db, "usuarios", user.uid);

            const snapshot = await getDoc(userRef);
            console.log("snapshot.exists:", snapshot.exists());

            if (!snapshot.exists()) {
                const { email } = user;
                const { displayName, isAdmin } = additionalData;

                await setDoc(userRef, {
                    displayName: displayName,
                    email: email,
                    isAdmin: isAdmin,
                });

                console.log("User document created successfully!");
            } else {
                console.log("User document already exists.");
            }
        } catch (error) {
            console.log("Error in creating user document:", error);
        }
    };

    const createGuide = async (e) => {
        e.preventDefault();

        const guideName = e.target.guide_name.value;
        const guideCategory = e.target.categoria.value;
        const guideDescription = e.target.guide_description.value;

        if (guideCategory === "geral") {
            const collectionName = guideName.replace(/\s+/g, "_").toLowerCase();

            try {
                // Obtenha o número total de guias
                const guiasRef = collection(db, "guias");
                const guiasSnapshot = await getDocs(guiasRef);
                const newIndex = guiasSnapshot.size + 1;

                // Crie o novo guia com o campo index definido
                const docRef = doc(db, "guias", collectionName);
                await setDoc(docRef, {
                    categoria: guideCategory,
                    nome: guideName,
                    descricao: guideDescription,
                    index: newIndex, // Defina o campo index aqui
                });
            } catch (error) {
                console.error("Erro ao criar o documento:", error);
            }
        } else {
            const collectionName = guideName.replace(/\s+/g, "_").toLowerCase();

            try {
                // Obtenha o número total de guias
                const guiasRef = collection(db, "guias");

                // Crie o novo guia com o campo index definido
                const docRef = doc(db, "guias", collectionName);
                await setDoc(docRef, {
                    categoria: guideCategory,
                    nome: guideName,
                    descricao: guideDescription,
                });
            } catch (error) {
                console.error("Erro ao criar o documento:", error);
            }
        }

        setGuideName("");
        setGuideDescription("");
    };

    useEffect(() => {
        const guiasRef = collection(db, "guias");

        const guiasGeraisQuery = query(
            guiasRef,
            where("categoria", "==", "geral")
        );
        const guiasEspecificosQuery = query(
            guiasRef,
            where("categoria", "==", "moeda especifica")
        );

        const unsubscribeGerais = onSnapshot(guiasGeraisQuery, (snapshot) => {
            const guiasGeraisData = snapshot.docs.map((doc) => doc.data());
            setGuiasGerais(guiasGeraisData);
        });

        const unsubscribeEspecificos = onSnapshot(
            guiasEspecificosQuery,
            (snapshot) => {
                const guiasEspecificosData = snapshot.docs.map((doc) =>
                    doc.data()
                );
                setGuiasEspecificos(guiasEspecificosData);
            }
        );

        setLoading(false);

        return () => {
            unsubscribeGerais();
            unsubscribeEspecificos();
        };
    }, []);

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
                isAdmin,
                loading,
                category,
                setCategory,
                createGuide,
                guideName,
                setGuideName,
                guideDescription,
                setGuideDescription,
                guides,
                setGuides,
                guiasGerais,
                setGuiasGerais,
                guiasEspecificos,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
