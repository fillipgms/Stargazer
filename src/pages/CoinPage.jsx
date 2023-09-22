import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../services/coinGeckoApi";
import { useStateContext } from "../contexts/ContextProvider";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlineInfoCircle, AiOutlineLink } from "react-icons/ai";
import { MdPlayArrow } from "react-icons/md";
import { basicInfo } from "../data/dummy";

import { Advertisement, CoinChart, Footer, Loading } from "../components";

const CoinPage = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState();
    const [guideOpen, setGuideOpen] = useState(false);

    const { currency, guiasEspecificos } = useStateContext();

    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id));

        setCoin(data);
    };

    useEffect(() => {
        fetchCoin();
    }, []);

    useEffect(() => {
        document.title = coin?.name;
    });

    if (!coin) {
        return <Loading />;
    }

    function formatNumber(num) {
        if (num >= 1e12) {
            return (num / 1e12).toFixed(1) + "T";
        } else if (num >= 1e9) {
            return (num / 1e9).toFixed(1) + "B";
        } else if (num >= 1e6) {
            return (num / 1e6).toFixed(1) + "M";
        } else {
            return num.toString();
        }
    }

    const price = coin?.market_data.current_price[currency.toLowerCase()]
        .toFixed(2)
        .replace(/\D/g, "")
        .replace(/(\d)(\d{8})$/, "$1.$2")
        .replace(/(\d)(\d{5})$/, "$1.$2")
        .replace(/(\d)(\d{2})$/, "$1,$2");

    const high = coin?.market_data.high_24h[currency.toLowerCase()]
        .toFixed(2)
        .replace(/\D/g, "")
        .replace(/(\d)(\d{8})$/, "$1.$2")
        .replace(/(\d)(\d{5})$/, "$1.$2")
        .replace(/(\d)(\d{2})$/, "$1,$2");

    const low = coin?.market_data.low_24h[currency.toLowerCase()]
        .toFixed(2)
        .replace(/\D/g, "")
        .replace(/(\d)(\d{8})$/, "$1.$2")
        .replace(/(\d)(\d{5})$/, "$1.$2")
        .replace(/(\d)(\d{2})$/, "$1,$2");

    const profit24h = coin?.market_data.price_change_percentage_24hd > 0;
    const profit7d = coin?.market_data.price_change_percentage_7d > 0;
    const profit14d = coin?.market_data.price_change_percentage_14d > 0;

    const guiaEncontrado = guiasEspecificos.find(
        (guia) => guia.nome.toLowerCase() === coin.id.toLowerCase()
    );

    const containerClass = "py-2 px-5 bg-dark-bg rounded-md";

    console.log(coin);

    return (
        <>
            <section className="flex md:px-48 px-10 flex-col pt-20 items-center justify-center gap-10">
                <header className="w-full">
                    <div className="flex border-b-2 border-pink py-2 justify-between">
                        <div className="text-white flex items-center gap-2">
                            <img src={coin?.image.small} alt={coin?.name} />
                            <span
                                className="tooltip tooltip-bottom cursor-help text-left"
                                data-tip={"preço atual de " + coin?.name}
                            >
                                <h1>
                                    {coin?.name}{" "}
                                    <span className="opacity-75">
                                        {" "}
                                        {coin?.symbol}
                                    </span>
                                </h1>
                                <h2>R$ {price}</h2>
                            </span>
                        </div>
                        <div
                            className="flex flex-col text-white tooltip tooltip-bottom"
                            data-tip={basicInfo.altasEbaixas.content}
                        >
                            <span className="flex items-center">
                                {" "}
                                <MdPlayArrow className="text-blue -rotate-90 text-lg" />
                                <p>R$ {high}</p>
                            </span>
                            <span className="flex items-center">
                                <MdPlayArrow className="text-violet rotate-90 text-lg" />{" "}
                                <p>R$ {low}</p>
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className="bg-dark-bg px-3 rounded-b-md py-2 text-white sticky">
                            <div
                                className="flex justify-between font-medium cursor-pointer "
                                onClick={() => setGuideOpen(!guideOpen)}
                            >
                                Nosso Guia{" "}
                                <MdKeyboardArrowDown
                                    className="text-white text-14 transition-transform"
                                    style={
                                        guideOpen
                                            ? { transform: "rotate(180deg)" }
                                            : { transform: "rotate(0)" }
                                    }
                                />
                            </div>

                            {guideOpen ? (
                                <div className="font-normal py-1">
                                    {guiaEncontrado ? (
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: guiaEncontrado.descricao,
                                            }}
                                        />
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <AiOutlineInfoCircle />
                                            ainda nao temos guia para essa
                                            moeda.
                                        </span>
                                    )}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </header>
                <main className="w-full">
                    <section className="w-full">
                        <CoinChart coin={coin} />
                    </section>
                    <section className="py-3 text-white">
                        <h2 className="text-xl font-semibold py-2">Mercado</h2>
                        <div className="grid grid-cols-[repeat(auto-fill,_minmax(270px,_1fr))] gap-2">
                            <div className={containerClass}>
                                <h3 className="flex items-center gap-1">
                                    {" "}
                                    Popularidade
                                    <AiOutlineInfoCircle />
                                </h3>
                                <span># {coin?.market_cap_rank}</span>
                            </div>
                            <div className={containerClass}>
                                <h3 className="flex items-center gap-1">
                                    {" "}
                                    Capitalização de Mercado
                                    <AiOutlineInfoCircle />
                                </h3>
                                <span>
                                    R${" "}
                                    {formatNumber(
                                        coin?.market_data.market_cap[
                                            currency.toLowerCase()
                                        ]
                                    )}
                                </span>
                            </div>
                            <div className={containerClass}>
                                <h3 className="flex items-center gap-1">
                                    {" "}
                                    Volume Total
                                    <AiOutlineInfoCircle />
                                </h3>
                                <span>
                                    R${" "}
                                    {formatNumber(
                                        coin?.market_data.total_volume[
                                            currency.toLowerCase()
                                        ]
                                    )}
                                </span>
                            </div>
                            <div className={containerClass}>
                                <h3 className="flex items-center gap-1">
                                    {" "}
                                    Mudança de Preço (24h)
                                    <AiOutlineInfoCircle />
                                </h3>
                                <span
                                    style={{
                                        color:
                                            profit24h > 0
                                                ? "#7fa2e0"
                                                : "#c7a3ff",
                                        fontWeight: 500,
                                        borderColor:
                                            profit24h > 0
                                                ? "#7fa2e0"
                                                : "#c7a3ff",
                                    }}
                                >
                                    {coin?.market_data.price_change_percentage_24h.toFixed(
                                        2
                                    )}{" "}
                                    %
                                </span>
                            </div>
                            <div className={containerClass}>
                                <h3 className="flex items-center gap-1">
                                    {" "}
                                    Mudança de Preço (7d)
                                    <AiOutlineInfoCircle />
                                </h3>
                                <span
                                    style={{
                                        color:
                                            profit7d > 0
                                                ? "#7fa2e0"
                                                : "#c7a3ff",
                                        fontWeight: 500,
                                        borderColor:
                                            profit7d > 0
                                                ? "#7fa2e0"
                                                : "#c7a3ff",
                                    }}
                                >
                                    {coin?.market_data.price_change_percentage_7d.toFixed(
                                        2
                                    )}{" "}
                                    %
                                </span>
                            </div>
                            <div className={containerClass}>
                                <h3 className="flex items-center gap-1">
                                    {" "}
                                    Mudança de Preço (14d)
                                    <AiOutlineInfoCircle />
                                </h3>
                                <span
                                    style={{
                                        color:
                                            profit14d > 0
                                                ? "#7fa2e0"
                                                : "#c7a3ff",
                                        fontWeight: 500,
                                        borderColor:
                                            profit14d > 0
                                                ? "#7fa2e0"
                                                : "#c7a3ff",
                                    }}
                                >
                                    {coin?.market_data.price_change_percentage_14d.toFixed(
                                        2
                                    )}{" "}
                                    %
                                </span>
                            </div>
                            <div className={containerClass}>
                                <h3 className="flex items-center gap-1">
                                    {" "}
                                    Quantidade total
                                    <AiOutlineInfoCircle />
                                </h3>
                                <span>
                                    {formatNumber(
                                        coin?.market_data.total_supply
                                    )}
                                </span>
                            </div>
                            <div className={containerClass}>
                                <h3 className="flex items-center gap-1">
                                    {" "}
                                    Avaliação Totalmente Diluida
                                    <AiOutlineInfoCircle />
                                </h3>
                                <span>
                                    R${" "}
                                    {formatNumber(
                                        coin?.market_data
                                            .fully_diluted_valuation[
                                            currency.toLowerCase()
                                        ]
                                    )}
                                </span>
                            </div>
                            <div className={containerClass}>
                                <h3 className="flex items-center gap-1">
                                    {" "}
                                    Moedas em circulação
                                    <AiOutlineInfoCircle />
                                </h3>
                                <span>
                                    R${" "}
                                    {formatNumber(
                                        coin?.market_data.circulating_supply
                                    )}
                                </span>
                            </div>
                        </div>
                    </section>
                    <section className="pb-10 pt-3 text-white">
                        <h2 className="text-xl font-semibold py-2">
                            {coin?.name} está em{" "}
                            {profit7d > 0 ? "alta" : "baixa"} essa semana.
                        </h2>
                        <p>
                            O preço de {coin?.name}{" "}
                            {profit7d > 0 ? "subiu" : "desceu"}{" "}
                            {coin?.market_data.price_change_percentage_7d.toFixed(
                                2
                            )}
                            % nos últimos 7 dias. O preço{" "}
                            {profit24h > 0 ? "subiu" : "caiu"}{" "}
                            {coin?.market_data.price_change_percentage_24h.toFixed(
                                2
                            )}
                            % nas últimas 24 horas. O preço atual é de R${" "}
                            {price} por {coin?.symbol}.
                        </p>
                    </section>
                </main>
            </section>
            <Advertisement />

            <section className="md:px-48 px-10 py-10 text-white">
                <h2 className="text-xl font-semibold py-2">
                    Sobre {coin?.name}
                </h2>
                <div className="grid grid-cols-[repeat(auto-fill,_minmax(270px,_1fr))] gap-2">
                    <div className={containerClass}>
                        <h3 className="flex items-center gap-1">
                            Camada
                            <AiOutlineInfoCircle />
                        </h3>

                        <span>{coin?.categories[2]}</span>
                    </div>

                    <div className={containerClass}>
                        <h3 className="flex items-center gap-1">
                            Código fonte
                            <AiOutlineInfoCircle />
                        </h3>
                        <a href={coin?.links.repos_url.github[0]}>Github</a>
                    </div>

                    <div className={containerClass}>
                        <h3 className="flex items-center gap-1">
                            Site oficial
                            <AiOutlineInfoCircle />
                        </h3>

                        <a href={coin?.links.homepage[0]}>
                            {coin?.links.homepage[0]
                                .replace("https://", "")
                                .replace("http://", "")
                                .replace("/", "")}
                        </a>
                    </div>

                    <div className={containerClass}>
                        <h3 className="flex items-center gap-1">
                            Comunidade
                            <AiOutlineInfoCircle />
                        </h3>

                        <a href={coin?.links.official_forum_url[0]}>
                            {coin?.links.official_forum_url[0]
                                .replace("https://", "")
                                .replace("http://", "")
                                .replace("/", "")}
                        </a>
                    </div>

                    <div className={containerClass}>
                        <h3 className="flex items-center gap-1">
                            Reddit
                            <AiOutlineInfoCircle />
                        </h3>

                        <a href={coin?.links.subreddit_url}>
                            {coin?.links.subreddit_url
                                .replace("https://", "")
                                .replace("http://", "")
                                .replace("/", "")}
                        </a>
                    </div>

                    <div className={containerClass}>
                        <h3 className="flex items-center gap-1">
                            Twitter
                            <AiOutlineInfoCircle />
                        </h3>

                        <a href={coin?.links.twitter_screen_name}>
                            twitter.com/{coin?.links.twitter_screen_name}
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default CoinPage;
