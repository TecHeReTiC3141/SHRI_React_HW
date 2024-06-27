import { configureStore } from "@reduxjs/toolkit";
import FilmReducer from "@/entities/film/model/filmSlice";

export const store = configureStore({
    reducer: {
        film: FilmReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;