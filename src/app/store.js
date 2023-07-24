import { configureStore } from "@reduxjs/toolkit";

import { newsApi } from "../services/newsApi";

export default configureStore({
    reducer: {
        [newsApi.reducerPath]: newsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(newsApi.middleware),
});
