import React, { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import {
    BiSolidBook,
    BiSolidBookReader,
    BiSolidBookmarkHeart,
} from "react-icons/bi";

import rocket from "../data/rocket.svg";
import telescope from "../data/telescope.svg";
import galaxy from "../data/galaxy.png";
import { Loading } from "../components";

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
                    <Loading />
                ) : (
                    guiasOrdenados.map((guia) => {
                        let icon = Math.floor(Math.random() * 3) + 1;
                        const guideName = guia.nome.replace(/\s+/g, "_");

                        icon == 1
                            ? (icon = <BiSolidBook />)
                            : icon === 2
                            ? (icon = <BiSolidBookReader />)
                            : (icon = <BiSolidBookmarkHeart />);

                        return (
                            <div
                                className="bg-dark-bg rounded-sm py-2 px-4 cursor-pointer"
                                key={guia.uid}
                                onClick={() =>
                                    guiaEspecifico(guideName, guia.uid)
                                }
                            >
                                <div className="flex gap-4 text-white items-center">
                                    <div className="text-pink text-4xl">
                                        {icon}
                                    </div>
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
