import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Advertisement, Cards, Footer } from "../components";
import { container, itemA, icons } from "../data/dummy";
import { TopThreeCoins } from "../services/coinGeckoApi";

import logo from "../data/logo.png";

import { AiFillStar } from "react-icons/ai";

const Home = () => {
    useEffect(() => {
        document.title = "Home";
    });
    const navigate = useNavigate();

    const [threeCoins, setThreeCoins] = useState([]);

    const fetchTrending = async () => {
        const { data } = await axios.get(TopThreeCoins());

        setThreeCoins(data);
    };

    useEffect(() => {
        fetchTrending();
    }, []);

    return (
        <>
            <section className="h-screen bg-main-dark-bg w-full flex flex-col md:flex-row">
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
                        {threeCoins.map((coin, index) => (
                            <motion.div
                                className="shadow-pink-blue-glow bg-glassmorphism rounded-full md:h-32 md:w-32 h-20 w-20 md:p-4 p-3 backdrop-blur-glassmorphism cursor-pointer"
                                variants={itemA}
                                key={index}
                                onClick={() => navigate(`/coins/${coin.id}`)}
                            >
                                <img
                                    src={coin.image}
                                    alt={coin.name}
                                    draggable="false"
                                    className="rounded-full"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <Advertisement />

            <div className="mt-16">
                <div className="text-center">
                    <h3 className="text-pink md:text-4xl text-2xl">
                        Descura Cripto
                    </h3>
                    <h5 className="text-white md:text-2xl text-lg">
                        Desvendando o universo das criptomoedas
                    </h5>
                </div>
                <Cards items={icons} />
            </div>

            <Footer />
        </>
    );
};

export default Home;
