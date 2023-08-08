import React from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillGearFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { RiAdminFill } from "react-icons/ri";

const ProfileLogoff = () => {
    const { user, setProfileMenu, signOut, signed, isAdmin } =
        useStateContext();

    const signout = () => {
        signOut();
        setProfileMenu(false);
    };

    const handleCloseProfile = () => {
        setProfileMenu(false);
    };

    return (
        <div className="absolute right-4 md:m-0 mx-3 top-12 bg-dark-bg shadow-2xl dark:bg-dark p-8 rounded-md w-64 z-50">
            <div className="flex justify-between items-center">
                <span className="font-semibold text-lg text-white">
                    Meu perfil
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
                    <p className="font-semibold items-center flex gap-2 text-xl text-white">
                        {signed && user.displayName}
                        {isAdmin ? (
                            <GoVerified className="text-pink flex text-lg" />
                        ) : (
                            ""
                        )}
                    </p>
                    <p className="font-semibold ml-2 text-lg text-white">
                        {signed && user.email}
                    </p>
                </div>
            </div>
            <div className="border-color border-b-1">
                {isAdmin ? (
                    <Link
                        to="/admin"
                        onClick={handleCloseProfile}
                        className="flex items-center py-3 px-5 dark:text-white gap-3  "
                    >
                        <RiAdminFill />
                        Administração
                    </Link>
                ) : (
                    ""
                )}
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
