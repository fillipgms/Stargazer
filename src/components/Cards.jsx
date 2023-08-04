import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { icons, cardsContainer, card } from "../data/dummy";
import { Scale } from "chart.js";

const Cards = () => {
    return (
        <section className=" mb-32 md:pt-0 pt-10 bg-main-dark-bg flex items-center justify-center flex-col">
            <div className="text-center">
                <h3 className="text-pink md:text-4xl text-2xl">
                    Descura Cripto
                </h3>
                <h5 className="text-white md:text-2xl text-lg">
                    Desvendando o universo das criptomoedas
                </h5>
            </div>

            <motion.div
                className="flex md:w-full w-9/12 md:justify-evenly md:gap-0 gap-20 justify-center mt-20 flex-wrap"
                variants={cardsContainer}
                initial="hidden"
                whileInView="show"
            >
                {icons.map((item) => (
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
