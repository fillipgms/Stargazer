import React from "react";

import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom";
import { ProfileLogOff } from ".";

import { MdKeyboardArrowDown } from "react-icons/md";
import { RiMenu4Fill } from "react-icons/ri";

const Header = () => {
    const {
        signed,
        user,
        profileMenu,
        setProfileMenu,
        scroll,
        setScroll,
        menuActive,
        setMenuActive,
    } = useStateContext();

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
                <div
                    className="flex justify-center items-center cursor-pointer"
                    onClick={() => setProfileMenu(!profileMenu)}
                >
                    <div>
                        <span className="text-white text-14">
                            Bem-vindo(a),
                        </span>{" "}
                        <span className="text-white font-bold ml-1 text-14">
                            {signed && user.displayName}
                        </span>
                    </div>
                    <MdKeyboardArrowDown
                        className="text-gray-400 text-14 transition-transform"
                        style={
                            profileMenu
                                ? { transform: "rotate(180deg)" }
                                : { transform: "rotate(0)" }
                        }
                    />
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
            {profileMenu ? <ProfileLogOff /> : ""}
        </header>
    );
};

export default Header;
