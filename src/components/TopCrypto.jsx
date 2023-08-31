import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TrendingCoins } from "../services/coinGeckoApi";
import { useStateContext } from "../contexts/ContextProvider";

const TopCrypto = () => {
    const navigate = useNavigate();

    const { currency } = useStateContext();
    const [trendindCoins, setTrendingCoins] = useState([]);

    const fetchTrending = async () => {
        const { data } = await axios.get(TrendingCoins(currency));

        setTrendingCoins(data);
    };

    useEffect(() => {
        fetchTrending();
    }, [currency]);

    return (
        <div className="flex md:px-48 px-10 flex-col pt-20 pb-10 items-center justify-center">
            <div className="bg-dark-bg w-full rounded-md shadow-md">
                <div>
                    <div className="text-white text-center font-semibold text-lg py-2 px-4 border-b-2 border-pink">
                        Bombando agora
                    </div>
                    <div className="text-white tabela-moedas table-auto">
                        <div className="flex justify-between text-justify px-4 py-2 font-semibold">
                            <div className="flex-[15]">Nome</div>
                            <div className="flex-[17]">Preço</div>
                            <div>24h</div>
                        </div>
                        {trendindCoins.map((coin) => {
                            const price = coin?.current_price
                                .toFixed(2)
                                .replace(/\D/g, "")
                                .replace(/(\d)(\d{8})$/, "$1.$2")
                                .replace(/(\d)(\d{5})$/, "$1.$2")
                                .replace(/(\d)(\d{2})$/, "$1,$2");

                            const profit =
                                coin?.price_change_percentage_24h > 0;

                            return (
                                <div
                                    onClick={() =>
                                        navigate(`/coins/${coin.id}`)
                                    }
                                    className="hover:bg-black-bg cursor-pointer px-4 py-2 flex justify-between"
                                >
                                    <div className="flex items-center gap-1 flex-[15]">
                                        <img
                                            src={coin.image}
                                            className="w-10"
                                        />
                                        {coin.name}
                                    </div>
                                    <div className="flex-[17]"> R$ {price}</div>
                                    <div
                                        style={{
                                            color:
                                                profit > 0
                                                    ? "#7fa2e0"
                                                    : "#c7a3ff",
                                            fontWeight: 500,
                                            borderColor:
                                                profit > 0
                                                    ? "#7fa2e0"
                                                    : "#c7a3ff",
                                        }}
                                    >
                                        {coin.price_change_percentage_24h.toFixed(
                                            2
                                        )}
                                        %
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopCrypto;
