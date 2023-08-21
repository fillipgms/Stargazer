import React, { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";

import rocket from "../data/rocket.svg";
import telescope from "../data/telescope.svg";
import galaxy from "../data/galaxy.png";

const Guide = () => {
    const { guiasGerais } = useStateContext();

    useEffect(() => {
        document.title = "Guias";
    });

    return (
        <section className="flex md:px-48 px-10 flex-col pt-20 items-center justify-center gap-10">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                {guiasGerais.map((guia) => {
                    let icon = Math.floor(Math.random() * 3) + 1;

                    icon == 1
                        ? (icon = rocket)
                        : icon == 2
                        ? (icon = telescope)
                        : (icon = galaxy);

                    return (
                        <div className="bg-dark-bg rounded-sm py-2 px-4">
                            <div className="flex gap-4 text-white items-center">
                                <img src={icon} className="w-1/6" />
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
