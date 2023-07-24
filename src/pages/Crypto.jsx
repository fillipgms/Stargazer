import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "../components";
import { CoinList } from "../services/coinGeckoApi";
import { useStateContext } from "../contexts/ContextProvider";

const Crypto = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    const { currency } = useStateContext();

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        console.log(data);

        setCoins(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCoins();
    }, [currency]);

    if (loading) {
        return <Loading />;
    }

    return <div>Crypto</div>;
};

export default Crypto;
