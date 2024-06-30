import { AnyAction, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import FilmReducer from "@/entities/film/model/film-slice";
import AuthReducer from "@/entities/film/model/auth-slice";
import FilterReducer from "@/entities/film/model/filter-slice";
import { apiSlice } from "@/entities/film/model/api-slice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        film: FilmReducer,
        auth: AuthReducer,
        filter: FilterReducer,
        [apiSlice.reducerPath!]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunkDispatch = ThunkDispatch<RootState, never, AnyAction>;


export const useAppDispatch = useDispatch.withTypes<AppThunkDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
