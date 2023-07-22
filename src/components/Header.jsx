import React from "react";

import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom";

import { RiMenu4Fill } from "react-icons/ri";

const Header = () => {
    const signed = false;

    const { scroll, setScroll, menuActive, setMenuActive } = useStateContext();

    const notScrolled =
        "flex justify-between fixed md:bg-transparent bg-main-dark-bg w-full right-0 z-10 text-white text-sm";

    const scrolled =
        "flex justify-between fixed bg-glassmorphism w-full backdrop-blur-glassmorphism right-0 z-10 text-white border-b-gray-100 border-b text-sm";

    window.addEventListener("scroll", () => {
        setScroll(window.scrollY);
    });

    return (
        <header className={scroll >= 50 ? scrolled : notScrolled}>
            <div className="flex">
                <button
                    className="bg-main-bg py-5 px-5 text-black md:text-2xl  text-sm"
                    onClick={() => setMenuActive(!menuActive)}
                >
                    <RiMenu4Fill />
                </button>
            </div>
            {signed ? (
                <div>Bem vindo</div>
            ) : (
                <div className="flex gap-3 py-[0.70rem] px-4 ">
                    <Link
                        className="border px-4 h-fit py-2 rounded-full bg-glassmorphism backdrop-blur-glassmorphism font-bold"
                        to={"/signin"}
                    >
                        Iniciar Seção
                    </Link>
                    <button className="border px-4 h-fit py-2 rounded-full bg-main-bg text-black font-bold">
                        Criar conta
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
