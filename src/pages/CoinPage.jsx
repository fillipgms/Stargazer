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
        <div>
            <h1>{coin.name}</h1>
        </div>
    );
};

export default CoinPage;