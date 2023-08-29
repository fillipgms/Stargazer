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
            <div className="bg-dark-bg w-full rounded-md ">
                <div>
                    <div className="text-white text-center font-semibold text-lg py-2 px-4 border-b-2 border-pink">
                        Bombando agora
                    </div>
                    <div className="flex justify-between py-2 px-4 overflow-auto gap-3 moedas">
                        {trendindCoins.map((coin) => (
                            <img
                                src={coin.image}
                                alt={coin.name}
                                className="w-20 cursor-pointer"
                                onClick={() => navigate(`/coins/${coin.id}`)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopCrypto;
