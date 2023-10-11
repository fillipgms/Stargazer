// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const cryptoNewsHeaders = {
//     "X-BingApis-SDK": "true",
//     "X-RapidAPI-Key": "12c8149dbdmsh6e303ad0965df5ep13a394jsn3325d102a06a",
//     "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
// };

// const baseUrl = "https://bing-news-search1.p.rapidapi.com/news";

// const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

// export const cryptoNewsApi = createApi({
//     reducerPath: "cryptoNewsApi",
//     baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
//     endpoints: (builder) => ({
//         getCryptoNews: builder.query({
//             query: ({ newsCategory, count }) =>
//                 createRequest(
//                     `/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&count=${count}&freshness=Month`
//                 ),
//         }),
//     }),
// });

// export const { useGetCryptoNewsQuery } = cryptoNewsApi;
