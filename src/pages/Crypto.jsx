import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CoinList } from "../services/coinGeckoApi";
import { useStateContext } from "../contexts/ContextProvider";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";

import { Footer, Loading, Pagination } from "../components";

const Crypto = () => {
    const navigate = useNavigate();

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const { currency, user, db, favorites } = useStateContext();

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));

        setCoins(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCoins();
    }, [currency]);

    if (loading) {
        return <Loading />;
    }

    const isInFavorites = (coinId) => {
        return favorites.includes(coinId);
    };

    const favoriteCoin = async (coinId) => {
        if (!user) {
            navigate("/signup");
            return;
        }

        const coinRef = doc(db, "favorites", user.uid);

        if (isInFavorites(coinId)) {
            try {
                await setDoc(
                    coinRef,
                    {
                        coins: favorites.filter((wish) => wish !== coinId),
                    },
                    { merge: true }
                );
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                await setDoc(
                    coinRef,
                    {
                        coins: favorites ? [...favorites, coinId] : [coinId],
                    },
                    { merge: true }
                );
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
        window.scrollTo(0, 0);
    };
    const itemsPerPage = 10;

    return (
        <>
            <section className="mb-5">
                <div className="flex md:px-48 px-10 flex-col pt-20 items-center justify-center gap-5">
                    {coins
                        .slice((page - 1) * 10, (page - 1) * 10 + 10)
                        .map((coin) => {
                            const profit = coin.price_change_percentage_24h > 0;

                            return (
                                <div
                                    key={coin.id}
                                    className="bg-dark-bg rounded-md overflow-hidden flex flex-col"
                                >
                                    <div className="bg-pink py-2 px-4 flex items-center gap-3">
                                        <button
                                            className="cursor-pointer text-lg"
                                            onClick={() =>
                                                favoriteCoin(coin.id)
                                            } // Passa o ID da moeda para a função de favoritar
                                        >
                                            {isInFavorites(coin.id) ? (
                                                <AiFillStar />
                                            ) : (
                                                <AiOutlineStar />
                                            )}
                                        </button>
                                        <h1>
                                            #{coin.market_cap_rank} {coin.name}
                                        </h1>
                                    </div>
                                    <div
                                        onClick={() =>
                                            navigate(`/coins/${coin.id}`)
                                        }
                                        className="cursor-pointer flex"
                                    >
                                        <div className="w-1/2">
                                            <img
                                                src={coin.image}
                                                alt={coin.name}
                                            />
                                        </div>
                                        <div>
                                            <div className="border-2 py-1 px-5 rounded-md border-pink text-white">
                                                R${" "}
                                                {coin.current_price.toFixed(2)}{" "}
                                                <span
                                                    style={{
                                                        color:
                                                            profit > 0
                                                                ? "rgb(14, 203, 129)"
                                                                : "red",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {profit && "+"}
                                                    {coin.price_change_percentage_24h.toFixed(
                                                        2
                                                    )}
                                                    %
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    <Pagination
                        totalItems={coins.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={page}
                        onPageChange={handlePageChange}
                    />
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Crypto;
