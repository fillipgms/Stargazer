import React from "react";

import { icons } from "../data/dummy";

const Cards = () => {
    return (
        <section className="min-h-screen bg-main-dark-bg flex items-center justify-center flex-col">
            <div className="text-center">
                <h3 className="text-pink text-4xl">Descura Cripto</h3>
                <h5 className="text-white text-2xl">
                    Desvendando o universo das criptomoedas
                </h5>
            </div>

            <div className="flex gap-28 mt-20 flex-wrap justify-center">
                <div className="bg-dark-bg h-96 w-72 shadow-pink-blue-glow rounded-sm">
                    <div>{icons.galaxy}</div>
                </div>
                <div className="bg-dark-bg h-96 w-72 shadow-pink-blue-glow rounded-sm"></div>
                <div className="bg-dark-bg h-96 w-72 shadow-pink-blue-glow rounded-sm"></div>
            </div>
        </section>
    );
};

export default Cards;
