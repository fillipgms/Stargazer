import React, { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
    const [scroll, setScroll] = useState(undefined);
    const [menuActive, setMenuActive] = useState(false);
    const [screenSize, setScreenSize] = useState(undefined);

    return (
        <StateContext.Provider
            value={{
                menuActive,
                setMenuActive,
                screenSize,
                setScreenSize,
                scroll,
                setScroll,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
