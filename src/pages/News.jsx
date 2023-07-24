import React from "react";
import { useState, useEffect } from "react";

import { Loading, Footer } from "../components";
import { Advertisement } from "../components";
import { getCryptoNews } from "../services/newsApi";

const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = () => {
    const pageSize = 10; // Número de notícias por página
    const [page, setPage] = useState(1); // Número da página atual
    const [cryptoNews, setCryptoNews] = useState([]); // Lista de notícias exibidas
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNews();
    }, [page]);

    useEffect(() => {
        // Armazenar os dados no armazenamento local quando houver alteração na lista de notícias
        localStorage.setItem("cryptoNews", JSON.stringify(cryptoNews));
    }, [cryptoNews]);

    const fetchNews = async () => {
        try {
            const news = await getCryptoNews(page, pageSize);
            setCryptoNews((prevNews) => [...prevNews, ...news]);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching crypto news:", error);
            setError(error.message);
            setIsLoading(false);
        }
    };

    const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.offsetHeight;
        const scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;
        const distanceFromBottom = documentHeight - (scrollTop + windowHeight);
        const loadMoreThreshold = 500; // Distância em pixels antes do fim da página para carregar mais notícias

        if (distanceFromBottom < loadMoreThreshold && !isLoading) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        // Adicionar um ouvinte de evento de scroll para a janela
        window.addEventListener("scroll", handleScroll);

        // Remover o ouvinte de evento de scroll quando o componente for desmontado
        return () => window.removeEventListener("scroll", handleScroll);
    }, [page, isLoading]);

    useEffect(() => {
        // Quando a página for alterada, carregue as novas notícias
        fetchNews();
    }, [page]);

    if (isLoading && page === 1) {
        return <Loading />;
    }

    if (error && page === 1) {
        return <p>Error: {error}</p>;
    }

    console.log(cryptoNews);

    return (
        <>
            <section>
                <div className="flex md:px-48 px-10 flex-col pt-20 items-center justify-center">
                    <a
                        href={cryptoNews[0].url}
                        target="_blank"
                        className="relative overflow-hidden box-border inline-block rounded-lg w-full"
                    >
                        <img
                            src={cryptoNews[0]?.urlToImage || demoImage}
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
                                    src={cryptoNews[1]?.urlToImage || demoImage}
                                    className="w-full aspect-video object-cover"
                                />
                            </div>
                            <aside>
                                <h1 className="bg-pink px-10 py-2">
                                    {cryptoNews[1].title}
                                </h1>
                                <p className="text-white px-10 my-5">
                                    {cryptoNews[1].description.length > 100
                                        ? `${cryptoNews[1].description.substring(
                                              0,
                                              100
                                          )}...`
                                        : cryptoNews[1].description}
                                </p>
                            </aside>
                        </a>

                        {cryptoNews.map((news, index) => {
                            if (index <= 1 || index > 3) {
                                return null;
                            }
                            console.log(news);
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
                                    <div className="py-2 px-4  gap-4 flex text-white items-center align-center flex-1">
                                        <img
                                            src={news?.urlToImage || demoImage}
                                            className="aspect-square h-[100px]"
                                        />
                                        <p>
                                            {news.description.length > 150
                                                ? `${news.description.substring(
                                                      0,
                                                      150
                                                  )}...`
                                                : news.description}
                                        </p>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
                <Advertisement />
                <div className="flex md:px-48 px-10 flex-col items-center justify-center w-full gap-10 py-10">
                    {cryptoNews.map((news, index) => {
                        if (index <= 3) {
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
                                <div className="py-2 px-4  gap-4 flex text-white items-center align-center flex-1">
                                    <img
                                        src={news?.urlToImage || demoImage}
                                        className="aspect-square h-[100px]"
                                    />
                                    <p>
                                        {news.description.length > 150
                                            ? `${news.description.substring(
                                                  0,
                                                  150
                                              )}...`
                                            : news.description}
                                    </p>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </section>
        </>
    );
};

export default News;
