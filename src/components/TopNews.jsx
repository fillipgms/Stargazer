import React, { useEffect, useState } from "react";
import { getCryptoNews } from "../services/newsApi";

const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const TopNews = () => {
    const [cryptoHeadlines, setCryptoHeadlines] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const headlines = await getCryptoNews(1, 4);
            setCryptoHeadlines(headlines);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching crypto news:", error);
            setError(error.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="flex md:px-48 px-10 flex-col pt-20 items-center justify-center">
            {cryptoHeadlines[0] && (
                <a
                    href={cryptoHeadlines[0]?.url}
                    target="_blank"
                    className="relative overflow-hidden box-border inline-block rounded-lg w-full"
                >
                    <img
                        src={cryptoHeadlines[0]?.urlToImage || demoImage}
                        className="aspect-video w-full object-cover"
                    />
                    <h1 className="absolute bottom-0 bg-pink py-3 px-2 rounded-tr-xl shadow-pink-blue-glow">
                        {cryptoHeadlines[0]?.title.length > 100
                            ? `${cryptoHeadlines[0]?.title.substring(
                                  0,
                                  100
                              )}...`
                            : cryptoHeadlines[0]?.title}
                    </h1>
                </a>
            )}

            <div className="grid md:grid-cols-2 grid-cols-1 md:[&>*:nth-child(1)]:row-span-2 my-10 gap-5">
                <a
                    href={cryptoHeadlines[1]?.url}
                    target="_blank"
                    className="bg-dark-bg rounded-md overflow-hidden"
                >
                    <div className="flex justify-center items-cent">
                        <img
                            src={cryptoHeadlines[1]?.urlToImage || demoImage}
                            className="w-full aspect-video object-cover"
                        />
                    </div>
                    <div>
                        <h1 className="bg-pink px-10 py-2">
                            {cryptoHeadlines[1]?.title}
                        </h1>
                        <p className="text-white px-10 my-5">
                            {cryptoHeadlines[1]?.description.length > 150
                                ? `${cryptoHeadlines[1]?.description.substring(
                                      0,
                                      150
                                  )}...`
                                : cryptoHeadlines[1]?.description}
                        </p>
                    </div>
                </a>

                {cryptoHeadlines.slice(2, 4).map((news, index) => (
                    <a
                        key={index}
                        href={news?.url}
                        target="_blank"
                        className="bg-dark-bg rounded-md overflow-hidden flex flex-col"
                    >
                        <header className="bg-pink py-2 px-4">
                            <h1>{news?.title}</h1>
                        </header>
                        <div className="py-2 px-4 gap-4 flex text-white items-center align-center flex-1">
                            <img
                                src={news?.urlToImage || demoImage}
                                className="aspect-square h-[100px]"
                            />
                            <p>
                                {news?.description.length > 150
                                    ? `${news?.description.substring(
                                          0,
                                          150
                                      )}...`
                                    : news?.description}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default TopNews;
