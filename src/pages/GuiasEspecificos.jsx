import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { doc, getDoc } from "firebase/firestore";
import Cookies from "js-cookie";

import { Loading } from "../components";

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
        <section className="flex md:px-48 px-10 flex-col pt-20 items-center justify-center gap-10 text-white">
            {guiaInfo ? (
                <>
                    <h2>{guiaInfo.nome}</h2>
                    <p>{guiaInfo.descricao}</p>
                </>
            ) : (
                <Loading />
            )}
        </section>
    );
};

export default GuiasEspecificos;
