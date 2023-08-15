import React, { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { Loading } from ".";
import { useStateContext } from "../contexts/ContextProvider";

const GuiasPublicados = () => {
    const { db } = useStateContext();

    const [loading, setLoading] = useState(true);
    const [guiasGerais, setGuiasGerais] = useState([]);
    const [guiasEspecificos, setGuiasEspecificos] = useState([]);

    useEffect(() => {
        const guiasRef = collection(db, "guias");

        const guiasGeraisQuery = query(
            guiasRef,
            where("categoria", "==", "geral")
        );
        const guiasEspecificosQuery = query(
            guiasRef,
            where("categoria", "==", "moeda especifica")
        );

        const unsubscribeGerais = onSnapshot(guiasGeraisQuery, (snapshot) => {
            const guiasGeraisData = snapshot.docs.map((doc) => doc.data());
            setGuiasGerais(guiasGeraisData);
        });

        const unsubscribeEspecificos = onSnapshot(
            guiasEspecificosQuery,
            (snapshot) => {
                const guiasEspecificosData = snapshot.docs.map((doc) =>
                    doc.data()
                );
                setGuiasEspecificos(guiasEspecificosData);
            }
        );

        setLoading(false);

        return () => {
            unsubscribeGerais();
            unsubscribeEspecificos();
        };
    }, []);

    if (loading) {
        return <Loading />;
    }

    console.log(guiasEspecificos);

    return (
        <div className="bg-dark-bg rounded-md h-fit">
            <header className="border-b-pink text-white border-b-2 py-2 px-4">
                Nossos guias já publicados
            </header>
            <main className="px-4">
                {guiasEspecificos.map((guia) => (
                    <div>{guia.nome}</div>
                ))}
                {guiasGerais.map((guia) => (
                    <div>{guia.nome}</div>
                ))}
            </main>
        </div>
    );
};

export default GuiasPublicados;
