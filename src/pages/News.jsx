import React from "react";
import { useState, useEffect } from "react";

import { Footer, Loading } from "../components";
import { Advertisement, TopNews } from "../components";
import { getCryptoNews } from "../services/newsApi";

const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = () => {
    const pageSize = 10;
    const [page, setPage] = useState(1);
    const [cryptoNews, setCryptoNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNews();
    }, [page]);

    useEffect(() => {
        document.title = "Notícias";
    });

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
        const loadMoreThreshold = 500;

        if (distanceFromBottom < loadMoreThreshold && !isLoading) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [page, isLoading]);

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
                <TopNews />
                <Advertisement />
                <div className="grid md:px-48 px-10 md:grid-cols-3 grid-cols-1 items-center justify-center w-full gap-10 py-10">
                    {cryptoNews.map((news, index) => {
                        if (index <= 3) {
                            return null;
                        }

                        const isLargeNews = index === 0 || index % 4 === 0;

                        if (isLargeNews) {
                            return (
                                <a
                                    className="md:col-span-3 flex bg-dark-bg rounded-md overflow-hidden flex-col md:flex-row"
                                    href={news.url}
                                    target="_blank"
                                >
                                    <div className="md:w-96">
                                        <img
                                            src={news.urlToImage || demoImage}
                                            className="w-full h-full aspect-video object-cover"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <h1 className="bg-pink text-black px-10 py-2 font-semibold">
                                            {news.title}
                                        </h1>
                                        <p className="text-white px-10 my-5">
                                            {news.description.length > 100
                                                ? `${news.description.substring(
                                                      0,
                                                      100
                                                  )}...`
                                                : news.description}
                                        </p>
                                    </div>
                                </a>
                            );
                        } else {
                            return (
                                <a
                                    href={news.url}
                                    target="_blank"
                                    className="bg-dark-bg rounded-md overflow-hidden h-full"
                                >
                                    <div className="flex justify-center items-center">
                                        <img
                                            src={news.urlToImage || demoImage}
                                            className="w-full aspect-video object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h1 className="bg-pink text-black px-10 py-2 font-semibold">
                                            {news.title}
                                        </h1>
                                        <p className="text-white px-10 my-5">
                                            {news.description.length > 100
                                                ? `${news.description.substring(
                                                      0,
                                                      100
                                                  )}...`
                                                : news.description}
                                        </p>
                                    </div>
                                </a>
                            );
                        }
                    })}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default News;
