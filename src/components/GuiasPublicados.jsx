import React, { useState } from "react";
import { Loading } from ".";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useStateContext } from "../contexts/ContextProvider";
import { TbEdit } from "react-icons/tb";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { doc, updateDoc, getDocs, collection } from "firebase/firestore";

const GuiasPublicados = () => {
    const {
        loading,
        setGuideDescription,
        setGuideName,
        setCategory,
        guiasEspecificos,
        guiasGerais,
        setGuiasGerais,
        db,
    } = useStateContext();

    const [geralVisivel, setGeralVisivel] = useState(false);
    const [especificoVisivel, setEspecificoVisivel] = useState(false);

    if (loading) {
        return <Loading />;
    }

    const handleEdit = (guia) => {
        setGuideName(guia.nome);
        setGuideDescription(guia.descricao);
        setCategory(guia.categoria);
    };

    const handleDragEnd = async (result) => {
        if (!result.destination) {
            return;
        }

        const updatedGuias = Array.from(guiasGerais);
        const [reorderedGuia] = updatedGuias.splice(result.source.index, 1);
        updatedGuias.splice(result.destination.index, 0, reorderedGuia);

        // Atualize a ordem no Firebase
        updatedGuias.forEach(async (guia, index) => {
            const guideName = guia.nome.replace(/\s+/g, "_").toLowerCase();

            const guiaRef = doc(db, "guias", guideName);
            updateDoc(guiaRef, { index: index });
        });
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
                            className="text-white text-14 transition-transform"
                            style={
                                geralVisivel
                                    ? { transform: "rotate(180deg)" }
                                    : { transform: "rotate(0)" }
                            }
                        />
                    </span>
                    {geralVisivel ? (
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="guias">
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {guiasGerais.map((guia, index) => (
                                            <Draggable
                                                key={guia.nome}
                                                draggableId={guia.nome}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        {guia.nome}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    ) : (
                        ""
                    )}
                </div>

                <div className="py-2">
                    <span
                        className="flex align-center justify-between cursor-pointer"
                        onClick={() => setEspecificoVisivel(!especificoVisivel)}
                    >
                        <h3 className="text-white">Guias Especificos</h3>
                        <MdKeyboardArrowDown
                            className="text-white text-14 transition-transform"
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
                                      onClick={() => handleEdit(guia)}
                                  >
                                      {guia.nome}
                                      <TbEdit />
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
