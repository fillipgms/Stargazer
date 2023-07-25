import React from "react";
import { useState, useEffect } from "react";

import { Loading, Footer } from "../components";
import { Advertisement, TopNews } from "../components";
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

    if (isLoading && page === 1) {
        return <Loading />;
    }

    if (error && page === 1) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <section>
                <TopNews />
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
            <Footer />
        </>
    );
};

export default News;
