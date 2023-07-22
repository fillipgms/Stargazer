import React from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

import { Advertisement, Cards, Timeline, Footer } from "../components";
import { container, itemA } from "../data/dummy";

import logo from "../data/logo.png";
import bitcoin from "../data/bitcoin.png";
import ethereum from "../data/ethereum.png";
import cardano from "../data/cardano.png";

import { AiFillStar } from "react-icons/ai";

const Home = () => {
    return (
        <>
            <section className="h-screen bg-main-dark-bg w-full flex flex-col md:flex-row ">
                <div className="md:w-9/12 w-full flex gap-3 flex-col items-center justify-center h-full px-10 md:px-48">
                    <h1 className="md:w-full text-2xl md:text-4xl text-white w-full">
                        <span className="text-pink">
                            <Typewriter
                                words={[
                                    "Descubra.",
                                    "Encontre.",
                                    "Melhore.",
                                    "Aprenda.",
                                ]}
                                loop={true}
                                cursor
                            />
                        </span>
                        <br />& Alcance as estrelas.
                    </h1>
                    <img
                        src={logo}
                        alt="stargazer logo"
                        className="w-full"
                        draggable="false"
                    />
                    <div className="px-0 flex justify-between w-full text-pink text-4xl">
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                    </div>
                </div>
                <div className="bg-wallpaper md:w-1/2 w-full h-full bg-cover md:rounded-bl-3xl md:rounded-tl-none bg-center relative rounded-tl-3xl">
                    <motion.div
                        className="flex md:h-full w-full md:w-min md:flex-col justify-between absolute md:-translate-x-1/2 md:py-20 px-10 -translate-y-1/2 md:translate-y-0"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.div
                            className="shadow-pink-blue-glow bg-glassmorphism rounded-full md:h-32 md:w-32 h-20 w-20 md:p-5 p-3 backdrop-blur-glassmorphism"
                            variants={itemA}
                        >
                            <img
                                src={bitcoin}
                                alt="bitcoin logo"
                                draggable="false"
                            />
                        </motion.div>
                        <motion.div
                            className="shadow-pink-blue-glow bg-glassmorphism rounded-full md:h-32 md:w-32 h-20 w-20 md:p-5 p-3 backdrop-blur-glassmorphism"
                            variants={itemA}
                        >
                            <img
                                src={ethereum}
                                alt="ethereum logo"
                                draggable="false"
                            />
                        </motion.div>
                        <motion.div
                            className="shadow-pink-blue-glow bg-glassmorphism rounded-full md:h-32 md:w-32 h-20 w-20 md:p-5 p-3 backdrop-blur-glassmorphism"
                            variants={itemA}
                        >
                            <img
                                src={cardano}
                                alt="cardano logo"
                                draggable="false"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>
            <Cards />
            <Advertisement />
            <Timeline />
            <Footer />
        </>
    );
};

export default Home;
