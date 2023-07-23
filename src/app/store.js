import { configureStore } from "@reduxjs/toolkit";

import { cryptoNewsApi } from "../services/cryptoCompareApi";

export default configureStore({
    reducer: {
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cryptoNewsApi.middleware),
});
