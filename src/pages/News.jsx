import React from "react";

import { Loading } from "../components";
import { Advertisement } from "../components";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

const demoImage =
    "https://m.economictimes.com/thumb/msid-90582586,width-1200,height-900,resizemode-4,imgsize-186060/top-cryptocurrency-prices-today-bitcoin-dogecoin-ethereum-shiba-inu-fall-up-to-10.jpg";

const News = () => {
    const { data: cryptoNews } = useGetCryptoNewsQuery({
        newsCategory: "Cryptocurrency",
        count: 10,
    });

    if (!cryptoNews?.value) return <Loading />;

    console.log(cryptoNews);

    return (
        <section>
            <div className="flex md:px-48 px-10 flex-col pt-20 items-center justify-center">
                <a
                    href={cryptoNews.value[0].url}
                    target="_blank"
                    className="relative overflow-hidden box-border inline-block rounded-lg w-full"
                >
                    <img
                        src={
                            cryptoNews.value[0]?.image?.thumbnail?.contentUrl ||
                            demoImage
                        }
                        className=" aspect-video w-full object-cover"
                    />
                    <h1 className="absolute bottom-0 bg-pink py-3 px-2 rounded-tr-xl shadow-pink-blue-glow">
                        {cryptoNews.value[0].name > 10
                            ? `${cryptoNews.value[0].name.substring(0, 10)}...`
                            : cryptoNews.value[0].name}
                    </h1>
                </a>

                <div className="grid md:grid-cols-2 grid-cols-1 md:[&>*:nth-child(1)]:row-span-2 my-10 gap-5">
                    <a
                        href={cryptoNews.value[1].url}
                        target="_blank"
                        className="bg-dark-bg rounded-sm overflow-hidden"
                    >
                        <div className="flex justify-center items-center py-5">
                            <img
                                src={
                                    cryptoNews.value[1]?.image?.thumbnail
                                        ?.contentUrl || demoImage
                                }
                                className="w-full aspect-video object-cover"
                            />
                        </div>
                        <aside>
                            <h1 className="bg-pink px-10 py-2">
                                {cryptoNews.value[1].name}
                            </h1>
                            <p className="text-white px-10 my-5">
                                {cryptoNews.value[1].description > 50
                                    ? `${cryptoNews.value[1].description.substring(
                                          0,
                                          50
                                      )}...`
                                    : cryptoNews.value[1].description}
                            </p>
                        </aside>
                    </a>

                    {cryptoNews.value.map((news, index) => {
                        if (index <= 1 || index > 3) {
                            return null;
                        }
                        return (
                            <a
                                href={news.url}
                                target="_blank"
                                className="bg-dark-bg rounded-sm overflow-hidden"
                            >
                                <img
                                    src={
                                        news?.image?.thumbnail?.contentUrl ||
                                        demoImage
                                    }
                                    className="aspect-square"
                                />
                                <aside>
                                    <h1 className="bg-pink">{news.name}</h1>
                                    <p>
                                        {news.description > 50
                                            ? `${news.description.substring(
                                                  0,
                                                  50
                                              )}...`
                                            : news.description}
                                    </p>
                                </aside>
                            </a>
                        );
                    })}
                </div>
            </div>
            <div className="mt-10">
                <Advertisement />
            </div>
            <div className="flex md:px-48 px-10 flex-col items-center justify-center">
                {cryptoNews.value.map((news, index) => {
                    if (index <= 3) {
                        return null;
                    }
                    return (
                        <>
                            <div>
                                <img
                                    src={
                                        news?.image?.thumbnail?.contentUrl ||
                                        demoImage
                                    }
                                />
                            </div>
                        </>
                    );
                })}
            </div>
        </section>
    );
};

export default News;
