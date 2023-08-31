import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { cardsContainer, card } from "../data/dummy";

const Cards = ({ items }) => {
    return (
        <section className=" mb-24 bg-main-dark-bg flex items-center justify-center flex-col">
            <motion.div
                className="flex md:w-full w-9/12 md:justify-evenly md:gap-0 gap-20 justify-center mt-10 flex-wrap"
                variants={cardsContainer}
                initial="hidden"
                whileInView="show"
            >
                {items.map((item) => (
                    <motion.div
                        className="bg-dark-bg flex flex-col items-center py-5 h-96 w-72 shadow-pink-blue-glow md:rounded-sm relative px-5 rounded-md"
                        variants={card}
                    >
                        <div className="bg-black-bg w-36 p-5 rounded-md shadow-black-gray-shadow">
                            {item.icon}
                        </div>
                        <p className="text-white mt-5 text-base">{item.text}</p>
                        <motion.span
                            className="absolute bottom-4 w-10/12 bg-pink  rounded-md font-bold  text-center flex items-center justify-center"
                            whileTap={{ scale: 0.9 }}
                        >
                            <Link
                                to={`/${item.link}`}
                                className="w-full text-black py-2"
                            >
                                Explore
                            </Link>
                        </motion.span>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Cards;
