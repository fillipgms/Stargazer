import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { doc, getDoc } from "firebase/firestore";
import Cookies from "js-cookie";
import icon from "../data/icon.png";

import { Footer, Loading } from "../components";

const GuiasEspecificos = () => {
    const { db } = useStateContext();
    const { nome } = useParams();
    const [guiaInfo, setGuiaInfo] = useState(null);
    const guideUid = Cookies.get("uid");

    const [canScroll, setCanScroll] = useState(false);

    useEffect(() => {
        document.title = `Guia/ ${nome}`;
    });

    useEffect(() => {
        if (guideUid) {
            const fetchGuiaInfo = async () => {
                try {
                    const guiaRef = doc(db, "guias", guideUid);
                    const guiaSnapshot = await getDoc(guiaRef);

                    if (guiaSnapshot.exists()) {
                        setGuiaInfo(guiaSnapshot.data());
                    } else {
                        console.log("Guia não encontrado");
                    }
                } catch (error) {
                    console.error("Erro ao buscar informações do guia:", error);
                }
            };

            fetchGuiaInfo();
        }
    }, [db, guideUid]);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.body.scrollHeight;
            const visibleHeight = window.innerHeight;
            setCanScroll(totalHeight > visibleHeight);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            {guiaInfo ? (
                <>
                    <header className="w-full h-fit">
                        <div className="bg-pink-sky bg-cover h-52 relative">
                            <img
                                src={icon}
                                className="md:w-32 w-20 rounded-full absolute bottom-0 left-10 border-4 border-main-dark transform translate-y-1/2"
                                alt="icon"
                            />
                        </div>
                    </header>
                    <main className="md:py-5 py-10 md:px-48 px-10 text-white">
                        <h1 className="font-semibold text-xl mb-2">
                            {guiaInfo.nome}
                        </h1>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: guiaInfo.descricao,
                            }}
                            className="descricao-do-guia"
                        />
                    </main>
                    {canScroll ? <Footer /> : ""}
                </>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default GuiasEspecificos;
