import React, { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

import rocket from "../data/rocket.svg";
import telescope from "../data/telescope.svg";
import galaxy from "../data/galaxy.png";

const Guide = () => {
    const { guiasGerais, setGuideUid } = useStateContext();

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Guias";
    });

    const guiasOrdenados = [...guiasGerais].sort((a, b) => a.index - b.index);

    const guiaEspecifico = (nome, guiaUid) => {
        navigate(`/guias/${nome}`);
        setGuideUid(guiaUid);
    };

    return (
        <section className="flex md:px-48 px-10 flex-col pt-20 items-center justify-center gap-10">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                {guiasOrdenados.map((guia) => {
                    let icon = Math.floor(Math.random() * 3) + 1;
                    const guideName = guia.nome.replace(/\s+/g, "_");

                    icon == 1
                        ? (icon = rocket)
                        : icon === 2
                        ? (icon = telescope)
                        : (icon = galaxy);

                    return (
                        <div
                            className="bg-dark-bg rounded-sm py-2 px-4 cursor-pointer"
                            key={guia.uid}
                            onClick={() => guiaEspecifico(guideName, guia.uid)}
                        >
                            <div className="flex gap-4 text-white items-center">
                                <img src={icon} className="w-1/6" alt="Icon" />
                                {guia.nome}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Guide;
