import React, { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { BsFillRocketTakeoffFill } from "react-icons/bs";

import rocket from "../data/rocket.svg";
import telescope from "../data/telescope.svg";
import galaxy from "../data/galaxy.png";

const Guide = () => {
    const { guiasGerais } = useStateContext();

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Guias";
    });

    const guiasOrdenados = [...guiasGerais].sort((a, b) => a.index - b.index);

    const guiaEspecifico = (nome, guideUid) => {
        navigate(`/guias/${encodeURIComponent(nome)}`);
        Cookies.set("uid", guideUid);
    };

    return (
        <section className="flex md:px-48 px-10 flex-col pt-20 items-center justify-center gap-10">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                {guiasOrdenados.length == 0 ? (
                    <div className="text-white absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-dark-bg px-5 py-10 flex flex-col text-center w-1/4 rounded-md">
                        <span>Não adicionamos nenhum guia ainda por aqui!</span>
                        <Link
                            to="/home"
                            className="text-pink font-bold mt-3 flex items-center justify-center gap-3"
                        >
                            <BsFillRocketTakeoffFill />
                            Conhecer outros conteúdos
                        </Link>
                    </div>
                ) : (
                    guiasOrdenados.map((guia) => {
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
                                onClick={() =>
                                    guiaEspecifico(guideName, guia.uid)
                                }
                            >
                                <div className="flex gap-4 text-white items-center">
                                    <img
                                        src={icon}
                                        className="w-1/6"
                                        alt="Icon"
                                    />
                                    {guia.nome}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </section>
    );
};

export default Guide;
