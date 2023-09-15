import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../services/coinGeckoApi";
import { useStateContext } from "../contexts/ContextProvider";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdPlayArrow } from "react-icons/md";
import { basicInfo } from "../data/dummy";

import { CoinChart, Footer, Loading } from "../components";

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

    const marketCap = coin?.market_data.market_cap[currency.toLowerCase()]
        .toFixed(2)
        .replace(/\D/g, "")
        .replace(/(\d)(\d{14})$/, "$1.$2")
        .replace(/(\d)(\d{11})$/, "$1.$2")
        .replace(/(\d)(\d{8})$/, "$1.$2")
        .replace(/(\d)(\d{5})$/, "$1.$2")
        .replace(/(\d)(\d{2})$/, "$1,$2");

    const volume = coin?.market_data.total_volume[currency.toLowerCase()]
        .toFixed(2)
        .replace(/\D/g, "")
        .replace(/(\d)(\d{14})$/, "$1.$2")
        .replace(/(\d)(\d{11})$/, "$1.$2")
        .replace(/(\d)(\d{8})$/, "$1.$2")
        .replace(/(\d)(\d{5})$/, "$1.$2")
        .replace(/(\d)(\d{2})$/, "$1,$2");

    const avaliacao = coin?.market_data.fully_diluted_valuation[
        currency.toLowerCase()
    ]
        .toFixed(2)
        .replace(/\D/g, "")
        .replace(/(\d)(\d{14})$/, "$1.$2")
        .replace(/(\d)(\d{11})$/, "$1.$2")
        .replace(/(\d)(\d{8})$/, "$1.$2")
        .replace(/(\d)(\d{5})$/, "$1.$2")
        .replace(/(\d)(\d{2})$/, "$1,$2");

    const circulacao = coin?.market_data.circulating_supply
        .toFixed(2)
        .replace(/\D/g, "")
        .replace(/(\d)(\d{14})$/, "$1.$2")
        .replace(/(\d)(\d{11})$/, "$1.$2")
        .replace(/(\d)(\d{8})$/, "$1.$2")
        .replace(/(\d)(\d{5})$/, "$1.$2")
        .replace(/(\d)(\d{2})$/, "$1,$2");

    const total = coin?.market_data.total_supply
        .toFixed(2)
        .replace(/\D/g, "")
        .replace(/(\d)(\d{14})$/, "$1.$2")
        .replace(/(\d)(\d{11})$/, "$1.$2")
        .replace(/(\d)(\d{8})$/, "$1.$2")
        .replace(/(\d)(\d{5})$/, "$1.$2")
        .replace(/(\d)(\d{2})$/, "$1,$2");

    const profit24h = coin?.market_data.price_change_percentage_24hd > 0;
    const profit14d = coin?.market_data.price_change_percentage_7d > 0;
    const profit30d = coin?.market_data.price_change_percentage_14d > 0;

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
                                <span>R$ {marketCap}</span>
                            </div>
                            <div className={containerClass}>
                                <h3 className="flex items-center gap-1">
                                    {" "}
                                    Volume Total
                                    <AiOutlineInfoCircle />
                                </h3>
                                <span>R$ {volume}</span>
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
                                    Mudança de Preço (14d)
                                    <AiOutlineInfoCircle />
                                </h3>
                                <span
                                    style={{
                                        color:
                                            profit30d > 0
                                                ? "#7fa2e0"
                                                : "#c7a3ff",
                                        fontWeight: 500,
                                        borderColor:
                                            profit30d > 0
                                                ? "#7fa2e0"
                                                : "#c7a3ff",
                                    }}
                                >
                                    {coin?.market_data.price_change_percentage_30d.toFixed(
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
                                <span>{total}</span>
                            </div>
                            <div className={containerClass}>
                                <h3 className="flex items-center gap-1">
                                    {" "}
                                    Avaliação Totalmente Diluida
                                    <AiOutlineInfoCircle />
                                </h3>
                                <span>R$ {avaliacao}</span>
                            </div>
                            <div className={containerClass}>
                                <h3 className="flex items-center gap-1">
                                    {" "}
                                    Moedas em circulação
                                    <AiOutlineInfoCircle />
                                </h3>
                                <span>R$ {circulacao}</span>
                            </div>
                        </div>
                    </section>
                </main>
            </section>
            <Footer />
        </>
    );
};

export default CoinPage;
