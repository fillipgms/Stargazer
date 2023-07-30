import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../services/coinGeckoApi";
import { useStateContext } from "../contexts/ContextProvider";

import { Loading } from "../components";

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
    }, []);

    if (!coin) {
        return <Loading />;
    }

    return (
        <section className="flex md:px-48 px-10 flex-col pt-20 items-center justify-center gap-10">
            <header className="w-full">
                <h1>{coin.name}</h1>
            </header>
        </section>
    );
};

export default CoinPage;
