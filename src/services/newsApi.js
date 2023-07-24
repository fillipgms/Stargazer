import axios from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const API_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`;

export const getCryptoNews = async (page, pageSize) => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                q: "criptomoeda OR bitcoin OR ethereum OR blockchain", // Termos de pesquisa para notícias sobre criptomoedas
                language: "pt",
                pageSize,
                page,
            },
        });

        return response.data.articles;
    } catch (error) {
        console.error("Error fetching crypto news:", error);
        return [];
    }
};

export const newsApi = createApi({
    reducerPath: "newsApi",
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            async queryFn({ newsCategory, count }) {
                const news = await getCryptoNews(newsCategory, count);
                return { data: news };
            },
        }),
    }),
});

export const { useGetCryptoNewsQuery } = newsApi;
