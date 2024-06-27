import { configureStore } from "@reduxjs/toolkit";
import FilmReducer from "@/entities/film/model/film-slice";
import { apiSlice } from "@/entities/film/model/api-slice";

export const store = configureStore({
    reducer: {
        film: FilmReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;