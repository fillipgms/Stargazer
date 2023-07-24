import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { motion } from "framer-motion";

import { navContainer, navItems, navList } from "../data/dummy";
import logo from "../data/logo.png";

import { AiFillCloseCircle } from "react-icons/ai";
import { links } from "../data/dummy";

const Sidebar = () => {
    const signed = false;

    const { menuActive, setMenuActive } = useStateContext();

    const activeLink =
        "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-md text-md m-2 bg-pink text-white";
    const normalLink =
        "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-md text-md text-gray-200 hover:bg-light-gray m-2 dark:hover:bg-main-dark-bg/50";

    const handleCloseSideBar = () => {
        if (menuActive <= 900) {
            setMenuActive(false);
        }
    };

    return (
        <>
            <motion.div
                className="fixed left-0 h-full md:pb-10 md:w-72 w-full bg-main-dark-bg z-30 drop-shadow-xl sidebar md:rounded-r-md"
                initial="hidden"
                animate={menuActive ? "visible" : "hidden"}
                exit="hidden"
                variants={navContainer}
            >
                <div
                    className="flex items-center justify-between gap-3 mx-3 my-4 font-extrabold tracking-tight text-white text-3xl"
                    onClick={() => setMenuActive(!menuActive)}
                >
                    <img
                        src={logo}
                        alt="stargazer logo"
                        className="md:w-9/12 cursor-pointer w-48"
                    />
                    <AiFillCloseCircle className="cursor-pointer" />
                </div>
                <nav className="mt-10">
                    {links.map((item) => (
                        <motion.div
                            key={item.title}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={navList}
                        >
                            <p className="text-gray-400 m-3 mt-4 uppercase">
                                {item.title}
                            </p>
                            {item.links.map((link) => (
                                <NavLink
                                    to={`/${link.url}`}
                                    key={link.name}
                                    onClick={handleCloseSideBar}
                                    variants={navItems}
                                    className={({ isActive }) =>
                                        isActive ? activeLink : normalLink
                                    }
                                >
                                    {link.icon}
                                    <span className="capitalize">
                                        {link.name}
                                    </span>
                                </NavLink>
                            ))}
                        </motion.div>
                    ))}
                </nav>
            </motion.div>
        </>
    );
};

export default Sidebar;
