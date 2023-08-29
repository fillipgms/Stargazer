import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { MdPlayArrow } from "react-icons/md";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate, Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import axios from "axios";
import { CoinList } from "../services/coinGeckoApi";

import { Loading, Footer, Pagination } from "../components";

const FavoriteCoins = () => {
    const navigate = useNavigate();
    const [coins, setCoins] = useState([]);
    const { favorites, user, db, currency, screenSize, setScreenSize } =
        useStateContext();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [canScroll, setCanScroll] = useState(false);

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
        document.title = "Moedas favoritas";
    });

    useEffect(() => {
        fetchCoins();

        const handleScroll = () => {
            const totalHeight = document.body.scrollHeight;
            const visibleHeight = window.innerHeight;
            setCanScroll(totalHeight > visibleHeight);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [currency]);

    if (loading) {
        return <Loading />;
    }

    const isInFavorites = (coinId) => {
        return favorites.includes(coinId);
    };

    const favoriteCoin = async (coinId) => {
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
                <div className="flex md:px-48 px-10 flex-col pt-20 items-center justify-center gap-10">
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

                                if (favorites.includes(coin.id))
                                    return (
                                        <div className="w-full rounded-md overflow-hidden shadow-xl hover:shadow-glow transition-all">
                                            <header className="bg-dark-bg font-bold text-white flex w-full px-4 items-center justify-between py-2 border-b-2 border-pink">
                                                <div className="flex items-center justify-center gap-3">
                                                    <span className="flex items-center justify-center md:gap-1">
                                                        <h1>
                                                            #
                                                            {
                                                                coin.market_cap_rank
                                                            }{" "}
                                                            <span>
                                                                {coin.name}
                                                            </span>
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
                                                <div className="flex items-center justify-center gap-2">
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
                                                            favoriteCoin(
                                                                coin.id
                                                            )
                                                        }
                                                    >
                                                        {isInFavorites(
                                                            coin.id
                                                        ) ? (
                                                            <AiFillStar />
                                                        ) : (
                                                            <AiOutlineStar />
                                                        )}
                                                    </span>
                                                </div>
                                            </header>
                                            <section
                                                onClick={() =>
                                                    navigate(
                                                        `/coins/${coin.id}`
                                                    )
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
                            })
                    )}
                    <div
                        className={
                            favorites.length < 3
                                ? "absolute w-full bottom-0"
                                : "m-5 w-full"
                        }
                    >
                        {favorites.length >= 10 ? (
                            <>
                                <Pagination
                                    totalItems={favorites.length}
                                    itemsPerPage={itemsPerPage}
                                    currentPage={page}
                                    onPageChange={handlePageChange}
                                />
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </section>
            <span
                style={
                    canScroll
                        ? { position: "initial" }
                        : { position: "absolute", bottom: 0, width: "100%" }
                }
            >
                <Footer />
            </span>
        </>
    );
};

export default FavoriteCoins;
