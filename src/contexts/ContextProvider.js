import React, { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
    const [menuActive, setMenuActive] = useState(false);

    return (
        <StateContext.Provider value={{ menuActive, setMenuActive }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
