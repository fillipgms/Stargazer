import React, { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import {
    BiSolidBook,
    BiSolidBookReader,
    BiSolidBookmarkHeart,
} from "react-icons/bi";
import { BsFillRocketTakeoffFill } from "react-icons/bs";

import { Loading } from "../components";

const Guide = () => {
    const { guiasGerais, loading } = useStateContext();

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Guias";
    });

    const guiasOrdenados = [...guiasGerais].sort((a, b) => a.index - b.index);

    const guiaEspecifico = (nome, guideUid) => {
        navigate(`/guias/${encodeURIComponent(nome)}`);
        Cookies.set("uid", guideUid);
    };

    if (loading) return <Loading />;

    return (
        <section className="flex md:px-48 px-10 flex-col pt-20 items-center justify-center gap-10">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                {guiasOrdenados.length === 0 ? (
                    <div className="text-white absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-dark-bg px-5 py-10 flex flex-col text-center w-1/4 rounded-md">
                        <span>
                            Infelizmente ainda não adicionamos nenhum guia à
                            coleção. Entre novamente mais tarde ou aproveite
                            nossos outros conteúdos!
                        </span>
                        <Link
                            to="/coins"
                            className="text-pink font-bold mt-3 flex items-center justify-center gap-3"
                        >
                            <BsFillRocketTakeoffFill />
                            Descobrir cripto moedas
                        </Link>
                    </div>
                ) : (
                    guiasOrdenados.map((guia) => {
                        let icon = Math.floor(Math.random() * 3) + 1;
                        const guideName = guia.nome.replace(/\s+/g, "_");

                        icon === 1
                            ? (icon = <BiSolidBook />)
                            : icon === 2
                            ? (icon = <BiSolidBookReader />)
                            : (icon = <BiSolidBookmarkHeart />);

                        return (
                            <div
                                className="flex items-center bg-dark-bg rounded-sm py-2 px-4 cursor-pointer hover:shadow-glow transition-all"
                                key={guia.uid}
                                onClick={() =>
                                    guiaEspecifico(guideName, guia.uid)
                                }
                            >
                                <div className="flex items-center gap-4 text-white">
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
