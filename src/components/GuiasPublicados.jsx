import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useStateContext } from "../contexts/ContextProvider";
import { TbEdit } from "react-icons/tb";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { BiTrashAlt } from "react-icons/bi";

const GuiasPublicados = () => {
    const {
        setGuideDescription,
        setGuideName,
        setCategory,
        guiasEspecificos,
        guiasGerais,
        setGuiasGerais,
        db,
        setGuideUid,
    } = useStateContext();

    const [loading, setLoading] = useState(false);
    const [geralVisivel, setGeralVisivel] = useState(false);
    const [especificoVisivel, setEspecificoVisivel] = useState(false);

    const handleEdit = async (guia) => {
        setGuideName(guia.nome);
        setGuideDescription(guia.descricao);
        setCategory(guia.categoria);
        setGuideUid(guia.uid);
    };

    const handleDelete = async (guia) => {
        const shouldDelete = window.confirm(
            `Tem certeza que deseja deletar ${guia.nome}?`
        );

        if (shouldDelete) {
            try {
                const guiaRef = doc(db, "guias", guia.uid);
                await deleteDoc(guiaRef);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleDragEnd = async (result) => {
        setLoading(true);
        const { source, destination, type } = result;

        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        )
            return;

        const updatedGuias = Array.from(guiasGerais);
        const [reorderedGuia] = updatedGuias.splice(source.index, 1);
        updatedGuias.splice(destination.index, 0, reorderedGuia);

        // Atualizar no Firebase primeiro
        await Promise.all(
            updatedGuias.map(async (guia, index) => {
                const guiaRef = doc(db, "guias", guia.uid);
                await updateDoc(guiaRef, { index: index });
            })
        );

        // Agora tratar a atualização do estado local
        if (type === "DEFAULT") {
            const guiasOrdenados = [...guiasGerais];
            const sourceIndex = source.index;
            const destinationIndex = destination.index;
            const [guiaRemovido] = guiasOrdenados.splice(sourceIndex, 1);
            guiasOrdenados.splice(destinationIndex, 0, guiaRemovido);
            setGuiasGerais(guiasOrdenados);
        }
        setLoading(false);
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
                        loading ? (
                            <div className="flex items-center justify-center py-3">
                                <div role="status">
                                    <svg
                                        aria-hidden="true"
                                        class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-pink"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"
                                        />
                                    </svg>
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <DragDropContext onDragEnd={handleDragEnd}>
                                <Droppable droppableId="guias">
                                    {(provided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {guiasGerais.map((guia, index) => (
                                                <Draggable
                                                    key={guia.uid}
                                                    draggableId={guia.uid}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <div
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <span className="flex justify-between pl-4 items-center">
                                                                {guia.nome
                                                                    .length > 15
                                                                    ? `${guia.nome.substring(
                                                                          0,
                                                                          15
                                                                      )}...`
                                                                    : guia.nome}
                                                                <span className="flex items-center gap-1">
                                                                    <TbEdit
                                                                        onClick={() =>
                                                                            handleEdit(
                                                                                guia
                                                                            )
                                                                        }
                                                                        className="cursor-pointer"
                                                                    />
                                                                    <BiTrashAlt
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                guia
                                                                            )
                                                                        }
                                                                        className="cursor-pointer"
                                                                    />
                                                                </span>
                                                            </span>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        )
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
                                      <span className="flex items-center gap-1">
                                          <TbEdit
                                              onClick={() => handleEdit(guia)}
                                              className="cursor-pointer"
                                          />
                                          <BiTrashAlt
                                              onClick={() => handleDelete(guia)}
                                              className="cursor-pointer"
                                          />
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
