import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../services/coinGeckoApi";
import { useStateContext } from "../contexts/ContextProvider";

import { CoinChart, Loading } from "../components";

const CoinPage = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState();

    const { currency, symbol } = useStateContext();

    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id));

        setCoin(data);
    };

    useEffect(() => {
        fetchCoin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!coin) {
        return <Loading />;
    }

    const price = coin?.market_data.current_price[currency.toLowerCase()]
        .toFixed(2)
        .replace(/\D/g, "")
        .replace(/(\d)(\d{8})$/, "$1.$2")
        .replace(/(\d)(\d{5})$/, "$1.$2")
        .replace(/(\d)(\d{2})$/, "$1,$2");

    // const high = coin?.high_24h
    //     .toFixed(2)
    //     .replace(/\D/g, "")
    //     .replace(/(\d)(\d{8})$/, "$1.$2")
    //     .replace(/(\d)(\d{5})$/, "$1.$2")
    //     .replace(/(\d)(\d{2})$/, "$1,$2");

    // const low = coin?.low_24h
    //     .toFixed(2)
    //     .replace(/\D/g, "")
    //     .replace(/(\d)(\d{8})$/, "$1.$2")
    //     .replace(/(\d)(\d{5})$/, "$1.$2")
    //     .replace(/(\d)(\d{2})$/, "$1,$2");

    return (
        <section className="flex md:px-48 px-10 flex-col pt-20 items-center justify-center gap-10">
            <header className="w-full flex border-b-2 border-pink py-2">
                <div className="text-white flex items-center gap-2">
                    <img src={coin?.image.small} alt={coin?.name} />
                    <span
                        className="tooltip tooltip-bottom cursor-help text-left before:bg-dark-bg before:shadow-md before:text-white before:py-2 before:px-4"
                        data-tip={"preço atual de " + coin?.name}
                    >
                        <h1>
                            {coin?.name}{" "}
                            <span className="opacity-75"> {coin?.symbol}</span>
                        </h1>
                        <h2>R$ {price}</h2>
                    </span>
                </div>
                <p>{coin?.market_cap_change_24h}</p>
            </header>
            <main className="w-full flex">
                <section className="w-full">
                    <CoinChart coin={coin} />
                </section>
                <aside className=""></aside>
            </main>
        </section>
    );
};

export default CoinPage;
