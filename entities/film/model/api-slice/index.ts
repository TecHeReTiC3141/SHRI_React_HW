import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/entities/film/model";


export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token?: string;
    error?: string;
}

export interface RateMovieRequest {
    movieId: string;
    user_rate: number;
}

export interface RateMovieResponse {
    movieId?: string,
    newAverageRate?: string,
    newTotalRatesCount?: number,
    error?: string,
}

export const apiSlice = createApi({
    reducerPath: "apiSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3030/api/v1",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            headers.set("content-type", "application/json");
            return headers;
        },
    }),

    endpoints: ({ mutation }) => ({
        login: mutation<LoginRequest, LoginResponse>({
            query: (request: LoginRequest) => ({
                url: "/login",
                method: "POST",
                body: request,
            }),
        }),
        rateMovie: mutation<RateMovieRequest, RateMovieRequest>({
            query: (request: LoginRequest) => ({
                url: "/rateMovie",
                method: "POST",
                body: request,
            }),
        }),
    })
});
export const { useLoginMutation, useRateMovieMutation } = apiSlice;
