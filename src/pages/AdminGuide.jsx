import React, { useEffect } from "react";
import { categories } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import { BsFillRocketTakeoffFill } from "react-icons/bs";

const AdminGuide = () => {
    const { screenSize, setScreenSize } = useStateContext();

    setScreenSize(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenSize(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <section className="mb-5">
                <div className="flex md:px-48 px-10 flex-col pt-20 items-center justify-center gap-10">
                    {screenSize <= 900 ? (
                        <div className="text-white absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-dark-bg px-5 py-10 flex flex-col text-center rounded-md">
                            <span>
                                Essa página funciona melhor em um{" "}
                                <span className="text-pink flex gap-3 justify-center items-center">
                                    {" "}
                                    <BsFillRocketTakeoffFill /> Computador!
                                </span>
                            </span>
                        </div>
                    ) : (
                        <div className="w-full flex gap-6">
                            <div className="flex-1 flex items-center justify-center px-4 py-2">
                                <form
                                    action="#"
                                    className="flex flex-col gap-6 w-full"
                                >
                                    <div className="flex w-full gap-4 items-center">
                                        <label
                                            htmlFor="categoria"
                                            className="text-pink font-semibold"
                                        >
                                            Categoria do Guia:
                                        </label>
                                        <select
                                            id="categoria"
                                            className="py-1 flex-1 bg-transparent border-0 border-b-2 border-pink appearance-none text-white"
                                        >
                                            {categories.map((category) => (
                                                <option
                                                    value={category.value}
                                                    className="bg-dark-bg"
                                                >
                                                    {category.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div class="relative">
                                        <input
                                            id="guide_name"
                                            aria-describedby="outlined_guide_name_help"
                                            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-pink appearance-none  focus:outline-none focus:ring-0 focus:border-pink peer border-2"
                                            placeholder=" "
                                        />
                                        <label
                                            for="guide_name"
                                            class="absolute text-sm text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-main-dark-bg  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 left-1 select-none"
                                        >
                                            Guia para:
                                        </label>
                                    </div>
                                </form>
                            </div>
                            <div className="bg-dark-bg rounded-md h-fit">
                                <header className="border-b-pink text-white border-b-2 py-2 px-4">
                                    Nossos guias já publicados
                                </header>
                                <main className="px-4"></main>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default AdminGuide;
