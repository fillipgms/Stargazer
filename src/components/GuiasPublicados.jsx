import React, { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { Loading } from ".";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useStateContext } from "../contexts/ContextProvider";
import { TbEdit } from "react-icons/tb";
import { BsFillTrash3Fill } from "react-icons/bs";

const GuiasPublicados = () => {
    const {
        loading,
        setGuideDescription,
        setGuideName,
        setCategory,
        guiasEspecificos,
        guiasGerais,
    } = useStateContext();

    const [geralVisivel, setGeralVisivel] = useState(false);
    const [especificoVisivel, setEspecificoVisivel] = useState(false);

    if (loading) {
        return <Loading />;
    }

    const handleEditClick = (guia) => {
        setGuideName(guia.nome);
        setGuideDescription(guia.descricao);
        setCategory(guia.categoria);
    };

    return (
        <div className="bg-dark-bg rounded-md h-fit">
            <header className="border-b-pink text-white border-b-2 py-2 px-4  font-semibold capitalize">
                Nossos guias já publicados
            </header>
            <main className="px-4">
                <div className="py-2">
                    <span
                        className="flex align-center justify-between cursor-pointer"
                        onClick={() => setGeralVisivel(!geralVisivel)}
                    >
                        <h3 className="text-white">Guias gerais</h3>
                        <MdKeyboardArrowDown
                            className="text-gray-400 text-14 transition-transform"
                            style={
                                geralVisivel
                                    ? { transform: "rotate(180deg)" }
                                    : { transform: "rotate(0)" }
                            }
                        />
                    </span>

                    <div className="flex flex-col gap-2">
                        {geralVisivel
                            ? guiasGerais.map((guia) => (
                                  <div
                                      key={guia.nome}
                                      className="flex items-center justify-between cursor-pointer pl-4"
                                      onClick={() => handleEditClick(guia)}
                                  >
                                      {guia.nome}
                                      <span>
                                          <TbEdit />
                                      </span>
                                  </div>
                              ))
                            : ""}
                    </div>
                </div>

                <div className="py-2">
                    <span
                        className="flex align-center justify-between cursor-pointer"
                        onClick={() => setEspecificoVisivel(!especificoVisivel)}
                    >
                        <h3 className="text-white">Guias Especificos</h3>
                        <MdKeyboardArrowDown
                            className="text-gray-400 text-14 transition-transform"
                            style={
                                especificoVisivel
                                    ? { transform: "rotate(180deg)" }
                                    : { transform: "rotate(0)" }
                            }
                        />
                    </span>

                    <div className="flex flex-col gap-2">
                        {especificoVisivel
                            ? guiasEspecificos.map((guia) => (
                                  <div
                                      key={guia.nome}
                                      className="flex items-center justify-between cursor-pointer pl-4"
                                      onClick={() => handleEditClick(guia)}
                                  >
                                      {guia.nome}
                                      <span>
                                          <TbEdit />
                                      </span>
                                  </div>
                              ))
                            : ""}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default GuiasPublicados;
