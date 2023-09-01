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

    const guiaEncontrado = guiasEspecificos.find(
        (guia) => guia.nome.toLowerCase() === coin.id.toLowerCase()
    );

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
                <main className="w-full flex">
                    <section className="w-full">
                        <CoinChart coin={coin} />
                    </section>
                    <aside className=""></aside>
                </main>
            </section>
            <Footer />
        </>
    );
};

export default CoinPage;
