import React from "react";
import { useState, useEffect } from "react";

import { Loading } from "../components";
import { Advertisement } from "../components";
import { useGetCryptoNewsQuery } from "../services/cryptoCompareApi";

const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = () => {
    const {
        data: cryptoNews,
        isLoading,
        error,
    } = useGetCryptoNewsQuery({
        newsCategory: "Cryptocurrency",
        count: 10,
    });

    const [isDataReady, setIsDataReady] = useState(false);

    useEffect(() => {
        // Verifica se os dados estão carregados
        if (cryptoNews) {
            setIsDataReady(true);
        }
    }, [cryptoNews]);

    // Caso ainda esteja carregando os dados
    if (isLoading || !isDataReady) {
        return <Loading />;
    }

    // Caso ocorra um erro ao buscar os dados
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <section>
            <div className="flex md:px-48 px-10 flex-col pt-20 items-center justify-center">
                <a
                    href={cryptoNews[0].url}
                    target="_blank"
                    className="relative overflow-hidden box-border inline-block rounded-lg w-full"
                >
                    <img
                        src={cryptoNews[0]?.imageurl || demoImage}
                        className="aspect-video w-full object-cover"
                    />
                    <h1 className="absolute bottom-0 bg-pink py-3 px-2 rounded-tr-xl shadow-pink-blue-glow">
                        {cryptoNews[0].title.length > 100
                            ? `${cryptoNews.value[0].title.substring(
                                  0,
                                  100
                              )}...`
                            : cryptoNews[0].title}
                    </h1>
                </a>

                <div className="grid md:grid-cols-2 grid-cols-1 md:[&>*:nth-child(1)]:row-span-2 my-10 gap-5">
                    <a
                        href={cryptoNews[1].url}
                        target="_blank"
                        className="bg-dark-bg rounded-md overflow-hidden"
                    >
                        <div className="flex justify-center items-center">
                            <img
                                src={cryptoNews[1]?.imageurl || demoImage}
                                className="w-full aspect-video object-cover"
                            />
                        </div>
                        <aside>
                            <h1 className="bg-pink px-10 py-2">
                                {cryptoNews[1].title}
                            </h1>
                            <p className="text-white px-10 my-5">
                                {cryptoNews[1].body.length > 100
                                    ? `${cryptoNews[1].body.substring(
                                          0,
                                          100
                                      )}...`
                                    : cryptoNews[1].body}
                            </p>
                        </aside>
                    </a>

                    {cryptoNews.map((news, index) => {
                        if (index <= 1 || index > 3) {
                            return null;
                        }
                        return (
                            <a
                                key={index}
                                href={news.url}
                                target="_blank"
                                className="bg-dark-bg rounded-md overflow-hidden flex flex-col"
                            >
                                <header className="bg-pink py-2 px-4">
                                    <h1>{news.title}</h1>
                                </header>
                                <div className="py-2 px-4  gap-3 flex text-white items-center align-center flex-1">
                                    <img
                                        src={news?.imageurl || demoImage}
                                        className="aspect-square h-[100px]"
                                    />
                                    <p>
                                        {news.body.length > 100
                                            ? `${news.body.substring(
                                                  0,
                                                  100
                                              )}...`
                                            : news.body}
                                    </p>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
            <div className="my-10">
                <Advertisement />
            </div>
            <div className="flex md:px-48 px-10 flex-col items-center justify-center w-full gap-10">
                {cryptoNews.map((news, index) => {
                    if (index <= 3) {
                        return null;
                    }
                    return (
                        <a
                            href={news.url}
                            target="_blank"
                            className="bg-dark-bg relative rounded-md overflow-hidden"
                        >
                            <header className="bg-pink py-2 px-4">
                                <h1>{news.title}</h1>
                            </header>
                            <div className="flex py-2 px-4 gap-3 text-white items-center align-center ">
                                <img
                                    src={news?.imageurl || demoImage}
                                    className="aspect-square h-full"
                                />
                                <p>
                                    {news.body.length > 100
                                        ? `${news.body.substring(0, 100)}...`
                                        : news.description}
                                </p>
                            </div>
                        </a>
                    );
                })}
            </div>
        </section>
    );
};

export default News;
