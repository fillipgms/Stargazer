import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { doc, getDoc } from "firebase/firestore";
import Cookies from "js-cookie";
import icon from "../data/icon.png";

import { Footer, Loading } from "../components";
import { RiH1 } from "react-icons/ri";

const GuiasEspecificos = () => {
    const { db } = useStateContext();
    const { nome } = useParams();
    const [guiaInfo, setGuiaInfo] = useState(null);
    const guideUid = Cookies.get("uid");

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

    return (
        <>
            {guiaInfo ? (
                <>
                    <header className="w-full h-fit">
                        <div className="bg-pink-sky bg-cover h-52 relative">
                            <img
                                src={icon}
                                className="md:w-32 w-20 rounded-full absolute bottom-0 left-10 border-4 border-main-dark transform translate-y-1/2"
                            />
                        </div>
                        <h1 className="mt-4 md:ml-48 ml-32 text-white font-semibold uppercase">
                            {guiaInfo.nome}
                        </h1>
                    </header>
                    <main
                        className="py-10 md:px-48 px-10 text-white"
                        dangerouslySetInnerHTML={{ __html: guiaInfo.descricao }}
                    ></main>
                    <Footer />
                </>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default GuiasEspecificos;
