import React from "react";
import { useParams } from "react-router-dom";

const GuiasEspecificos = () => {
    const { id } = useParams();

    return (
        <section className="flex md:px-48 px-10 flex-col pt-20 items-center justify-center gap-10">
            <span>ID do guia: {id}</span>
        </section>
    );
};

export default GuiasEspecificos;
