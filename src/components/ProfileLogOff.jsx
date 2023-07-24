import React from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillGearFill } from "react-icons/bs";

const demoImage =
    "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";

const ProfileLogoff = () => {
    const { user, setProfileMenu, signOut, signed } = useStateContext();

    const signout = () => {
        signOut();
        setProfileMenu(false);
    };

    return (
        <div className="absolute right-4 md:m-0 mx-3 top-20 bg-dark-bg shadow-pink-blue-glow dark:bg-dark p-8 rounded-md w-64 z-50 clip">
            <div className="flex justify-between items-center">
                <span className="font-semibold text-lg text-white">
                    Ajustes Rápidos
                </span>
                <span
                    onClick={() => setProfileMenu(false)}
                    className="cursor-pointer text-white"
                >
                    <AiOutlineClose />
                </span>
            </div>
            <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6 overflow-hidden">
                <div>
                    <p className="font-semibold text-xl text-white">
                        {signed && user.displayName}
                    </p>
                    <p className="font-semibold ml-2 text-lg text-white">
                        {signed && user.email}
                    </p>
                </div>
            </div>
            <div className="border-color border-b-1">
                <Link
                    to="/profile"
                    className="flex items-center py-3 px-5 dark:text-white gap-3  "
                >
                    <BsFillGearFill />
                    Configurações
                </Link>
            </div>

            <div className="mt-5">
                <button
                    type="button"
                    className="bg-pink w-full flex items-center justify-center py-1 rounded-md"
                    onClick={signout}
                >
                    Sair
                </button>
            </div>
        </div>
    );
};

export default ProfileLogoff;
