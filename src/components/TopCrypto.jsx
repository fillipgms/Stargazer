import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TrendingCoins } from "../services/coinGeckoApi";
import { useStateContext } from "../contexts/ContextProvider";
import { AiOutlineInfoCircle } from "react-icons/ai";

const TopCrypto = () => {
    const navigate = useNavigate();

    const { currency, setScreenSize, screenSize } = useStateContext();
    const [trendindCoins, setTrendingCoins] = useState([]);

    const fetchTrending = async () => {
        const { data } = await axios.get(TrendingCoins(currency));

        setTrendingCoins(data);
    };

    setScreenSize(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenSize(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        fetchTrending();
    }, [currency]);

    const classeLinha =
        screenSize >= 900
            ? "w-[calc(100%/3)] text-center capitalize"
            : "w-[calc(100%/2)] text-center capitalize";

    const classeTitulo = `${classeLinha} tooltip tooltip-bottom flex items-center justify-center gap-1`;

    return (
        <div className="flex items-center pt-32 pb-20 mb-10 justify-center bg-dark-wallpaper py-10 bg-cove w-full bg-cover bg-top">
            <div className="bg-dark-bg  rounded-md text-white py-2 w-9/12  shadow-lg">
                <h3 className="font-bold text-center">Bombando agora</h3>
                <div className="flex flex-col pt-4">
                    <div className="flex">
                        <h2 className={classeLinha}> moeda</h2>
                        <h2
                            className={classeTitulo}
                            data-tip={
                                "A variação no percentual do volume de negociação deste ativo em relação a 24 horas atrás."
                            }
                        >
                            24h
                            <AiOutlineInfoCircle />
                        </h2>
                        {screenSize >= 900 ? (
                            <h2
                                className={classeTitulo}
                                data-tip={
                                    "A capitalização de mercado é calculada multiplicando a oferta em circulação do ativo pelo seu preço atual. Uma capitalização de mercado alta significa que o ativo é muito valorizado. O ativo de maior capitalização de mercado hoje é o bitcoin."
                                }
                            >
                                {" "}
                                capitalização de mercado
                                <AiOutlineInfoCircle />
                            </h2>
                        ) : (
                            ""
                        )}
                    </div>
                    {trendindCoins.map((moeda) => {
                        const price = moeda?.current_price
                            .toFixed(2)
                            .replace(/\D/g, "")
                            .replace(/(\d)(\d{8})$/, "$1.$2")
                            .replace(/(\d)(\d{5})$/, "$1.$2")
                            .replace(/(\d)(\d{2})$/, "$1,$2");

                        const profit = moeda?.price_change_percentage_24h > 0;

                        return (
                            <div
                                className="px-5 py-2 flex gap-3 items-center hover:bg-black-bg justify-between cursor-pointer"
                                onClick={() => navigate(`/coins/${moeda.id}`)}
                            >
                                <div className="flex gap-3 w-[calc(100%/3)]">
                                    <img
                                        src={moeda.image}
                                        alt={moeda.name}
                                        className="w-10 h-10"
                                    />
                                    <div>
                                        <h2 className="font-semibold flex gap-1">
                                            {moeda.name}
                                            <span className="font-normal">
                                                {moeda.symbol}
                                            </span>
                                        </h2>
                                        <span>R$ {price}</span>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        color:
                                            profit > 0 ? "#7fa2e0" : "#c7a3ff",
                                        fontWeight: 500,
                                        borderColor:
                                            profit > 0 ? "#7fa2e0" : "#c7a3ff",
                                    }}
                                    className={classeLinha}
                                >
                                    {moeda.price_change_percentage_24h.toFixed(
                                        2
                                    )}
                                    %
                                </div>
                                {screenSize >= 900 ? (
                                    <div className={classeLinha}>
                                        R${" "}
                                        {moeda.market_cap
                                            .toFixed(2)
                                            .replace(/\D/g, "")
                                            .replace(/(\d)(\d{14})$/, "$1.$2")
                                            .replace(/(\d)(\d{11})$/, "$1.$2")
                                            .replace(/(\d)(\d{8})$/, "$1.$2")
                                            .replace(/(\d)(\d{5})$/, "$1.$2")
                                            .replace(/(\d)(\d{2})$/, "$1,$2")}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TopCrypto;
