import React, { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";

const Guide = () => {
    const { guiasGerais } = useStateContext();

    useEffect(() => {
        document.title = "Guias";
    });

    return <div>GUIAS E GUIAS</div>;
};

export default Guide;
