import React from "react";

import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom";

import { RiMenu4Fill } from "react-icons/ri";

const Header = () => {
    const { signed, user } = useStateContext();

    const { scroll, setScroll, menuActive, setMenuActive } = useStateContext();

    const notScrolled =
        "transition-colors flex py-2 px-3 justify-between fixed md:bg-transparent bg-main-dark-bg w-full right-0 z-10 text-white text-sm";

    const scrolled =
        "transition-colors flex py-2 px-3 justify-between fixed bg-dark-bg w-full right-0 z-10 text-white border-b-gray-100 border-b text-sm";

    window.addEventListener("scroll", () => {
        setScroll(window.scrollY);
    });

    return (
        <header className={scroll >= 30 ? scrolled : notScrolled}>
            <div className="flex">
                <button
                    className="bg-main-bg p-4 text-black md:text-lg text-sm rounded"
                    onClick={() => setMenuActive(!menuActive)}
                >
                    <RiMenu4Fill />
                </button>
            </div>
            {signed ? (
                <div className="flex justify-center items-center">
                    <span className="text-gray-400 text-14">Bem-vindo,</span>{" "}
                    <span className="text-gray-400 font-bold ml-1 text-14">
                        {signed && user.displayName}
                    </span>
                </div>
            ) : (
                <div className="flex gap-3 justify-center items-center">
                    <Link
                        className="border px-4 h-fit py-2 rounded-full font-bold"
                        to={"/signin"}
                    >
                        Iniciar Seção
                    </Link>
                    <Link
                        className="border px-4 h-fit py-2 rounded-full bg-main-bg text-black font-bold"
                        to={"/signup"}
                    >
                        Criar conta
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Header;
