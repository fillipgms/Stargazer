import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate, Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import axios from "axios";
import { CoinList } from "../services/coinGeckoApi";

import { Loading, Footer, Pagination } from "../components";

const FavoriteCoins = () => {
    const navigate = useNavigate();
    const [coins, setCoins] = useState([]);
    const { favorites, user, db, currency } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

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
                console.log("removido!");
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

                console.log("adicionado!");
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
            <section>
                <div className="flex md:px-48 px-10 flex-col pt-20 items-center justify-center gap-5">
                    {favorites.length === 0 ? (
                        <div className="text-white absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-dark-bg px-5 py-10 flex flex-col text-center w-1/4 rounded-md">
                            <span>
                                Você ainda não tem nenhuma moeda favorita,
                                Adicione agora!
                            </span>
                            <Link
                                to="/coins"
                                className="text-pink font-bold mt-3 flex items-center justify-center gap-3"
                            >
                                <BsFillRocketTakeoffFill />
                                Descobrir moedas favoritas
                            </Link>
                        </div>
                    ) : (
                        coins
                            .slice((page - 1) * 10, (page - 1) * 10 + 10)
                            .map((coin) => {
                                const profit =
                                    coin.price_change_percentage_24h > 0;

                                if (favorites.includes(coin.id))
                                    return (
                                        <div
                                            key={coin.id}
                                            className="bg-dark-bg rounded-md overflow-hidden flex flex-col w-full"
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
                                                    #{coin.market_cap_rank}{" "}
                                                    {coin.name}
                                                </h1>
                                            </div>
                                            <div
                                                onClick={() =>
                                                    navigate(
                                                        `/coins/${coin.id}`
                                                    )
                                                }
                                                className="cursor-pointer flex"
                                            >
                                                <div className="w-1/3">
                                                    <img
                                                        className="w-1/2"
                                                        src={coin.image}
                                                        alt={coin.name}
                                                    />
                                                </div>
                                                <div>
                                                    <div className="border-2 rounded-md border-pink text-white">
                                                        <span className="py-1 px-4">
                                                            R${" "}
                                                            {coin.current_price.toFixed(
                                                                2
                                                            )}{" "}
                                                        </span>
                                                        <span
                                                            style={{
                                                                color:
                                                                    profit > 0
                                                                        ? "rgb(14, 203, 129)"
                                                                        : "red",
                                                                fontWeight: 500,
                                                            }}
                                                            className="border-l-2 border-pink py-1 px-2"
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
                            })
                    )}
                </div>
            </section>
            <div
                className={
                    favorites.length < 3 ? "absolute w-full bottom-0" : "mt-5"
                }
            >
                {favorites.length > 10 ? (
                    <Pagination
                        totalItems={favorites.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={page}
                        onPageChange={handlePageChange}
                    />
                ) : (
                    ""
                )}
                <Footer />
            </div>
        </>
    );
};

export default FavoriteCoins;
