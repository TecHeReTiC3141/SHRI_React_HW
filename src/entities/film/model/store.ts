import { configureStore } from "@reduxjs/toolkit";
import FilmReducer from "@/entities/film/model/film-slice";
import AuthReducer from "@/entities/film/model/auth-slice";
import { apiSlice } from "@/entities/film/model/api-slice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        film: FilmReducer,
        auth: AuthReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
