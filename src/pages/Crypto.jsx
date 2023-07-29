import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CoinList } from "../services/coinGeckoApi";
import { useStateContext } from "../contexts/ContextProvider";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdPlayArrow } from "react-icons/md";
import { doc, setDoc } from "firebase/firestore";

import { Footer, Loading, Pagination } from "../components";

const Crypto = () => {
    const navigate = useNavigate();

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const { currency, user, db, favorites, screenSize, setScreenSize } =
        useStateContext();

    setScreenSize(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenSize(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
                <div className="flex md:px-48 px-10 flex-col pt-20 items-center justify-center gap-10">
                    {coins
                        .slice((page - 1) * 10, (page - 1) * 10 + 10)
                        .map((coin) => {
                            const profit = coin.price_change_percentage_24h > 0;
                            const price = coin.current_price
                                .toFixed(2)
                                .replace(/\D/g, "")
                                .replace(/(\d)(\d{8})$/, "$1.$2")
                                .replace(/(\d)(\d{5})$/, "$1.$2")
                                .replace(/(\d)(\d{2})$/, "$1,$2");

                            const high = coin.high_24h
                                .toFixed(2)
                                .replace(/\D/g, "")
                                .replace(/(\d)(\d{8})$/, "$1.$2")
                                .replace(/(\d)(\d{5})$/, "$1.$2")
                                .replace(/(\d)(\d{2})$/, "$1,$2");

                            const low = coin.low_24h
                                .toFixed(2)
                                .replace(/\D/g, "")
                                .replace(/(\d)(\d{8})$/, "$1.$2")
                                .replace(/(\d)(\d{5})$/, "$1.$2")
                                .replace(/(\d)(\d{2})$/, "$1,$2");

                            return (
                                <div className="w-full rounded-md overflow-hidden shadow-xl">
                                    <header className="bg-dark-bg font-bold text-white flex w-full px-4 items-center justify-between py-2 border-b-2 border-pink">
                                        <div className="flex items-center justify-center gap-3">
                                            <span className="flex items-center justify-center md:gap-1">
                                                <h1>
                                                    #{coin.market_cap_rank}{" "}
                                                    <span>{coin.name}</span>
                                                </h1>
                                                {screenSize > 900 ? (
                                                    <span className="opacity-75 align-super text-sm">
                                                        {coin.symbol}
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-center gap-2 text-base">
                                            <span>R$ {price}</span>
                                            {screenSize > 900 ? (
                                                <span
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
                                                    className="border-2 py-1 px-2 rounded-md"
                                                >
                                                    {profit && "+"}
                                                    {coin.price_change_percentage_24h.toFixed(
                                                        2
                                                    )}
                                                    %
                                                </span>
                                            ) : (
                                                ""
                                            )}
                                            <span
                                                className="cursor-pointer text-lg text-pink"
                                                onClick={() =>
                                                    favoriteCoin(coin.id)
                                                }
                                            >
                                                {isInFavorites(coin.id) ? (
                                                    <AiFillStar />
                                                ) : (
                                                    <AiOutlineStar />
                                                )}
                                            </span>
                                        </div>
                                    </header>
                                    <section
                                        onClick={() =>
                                            navigate(`/coins/${coin.id}`)
                                        }
                                        className="cursor-pointer flex bg-dark-bg px-4 py-2 items-center gap-5"
                                    >
                                        {" "}
                                        <div className="w-20">
                                            <img
                                                src={coin.image}
                                                alt={coin.name}
                                            />
                                        </div>
                                        <div className="text-white">
                                            <span className="flex gap-1 items-center">
                                                <MdPlayArrow className="text-blue -rotate-90 text-lg" />
                                                <p>R$ {high}</p>
                                            </span>
                                            <span className="flex gap-1 items-center">
                                                <MdPlayArrow className="text-violet rotate-90 text-lg" />{" "}
                                                <p>R$ {low}</p>
                                            </span>
                                        </div>
                                    </section>
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
