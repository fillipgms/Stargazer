import React from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const GuiasEspecificos = () => {
    const { id } = useParams();
    const { guideUid } = useStateContext();

    console.log(guideUid);

    return (
        <section className="flex md:px-48 px-10 flex-col pt-20 items-center justify-center gap-10 text-white">
            <span>ID do guia: {id}</span>
        </section>
    );
};

export default GuiasEspecificos;
