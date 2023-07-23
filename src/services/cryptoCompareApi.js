import axios from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey =
    "6ed7a2e745fc3f0a959b63bddb765f0eb7a56cf00e1e36f815bcfbf960d99f38";

const cryptoCompareApi = axios.create({
    baseURL: "https://min-api.cryptocompare.com/data/v2",
    headers: {
        Authorization: `Apikey ${apiKey}`,
    },
});

export const getCryptoNews = async (newsCategory, count) => {
    try {
        const response = await cryptoCompareApi.get(
            `/news/?lang=PT&categories=${newsCategory}&excludeCategories=Sponsored&lTs=${Math.floor(
                Date.now() / 1000
            )}&limit=${count}`
        );
        return response.data.Data;
    } catch (error) {
        console.error("Error fetching crypto news:", error);
        return [];
    }
};

const cryptoNewsHeaders = {
    "X-BingApis-SDK": "true",
    "X-RapidAPI-Key":
        "6ed7a2e745fc3f0a959b63bddb765f0eb7a56cf00e1e36f815bcfbf960d99f38",
    "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
};

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
    reducerPath: "cryptoNewsApi",
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            async queryFn({ newsCategory, count }) {
                // Utilize a função getCryptoNews para buscar notícias da CryptoCompare
                const news = await getCryptoNews(newsCategory, count);
                // Remova essa linha se você deseja manter as chamadas ao Bing News Search também
                return { data: news };
            },
        }),
    }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
