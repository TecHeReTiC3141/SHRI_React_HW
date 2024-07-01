import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FullMovieInfo, ShortMovieInfo } from "@/shared/api/films";
import { RootState } from "@/entities/film/model";

export interface SearchFilmsResponse {
    search_result: ShortMovieInfo[];
    total_pages: number;
}

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
    tagTypes: [ "Films" ],
    endpoints: ({ query, mutation }) => ({
        getSearchFilms: query<SearchFilmsResponse, {
            title?: string,
            genre?: string,
            release_year?: string,
            page?: number
        }>({
            query: ({ title = "", genre = "", release_year = "", page = 1 }) => {
                const params = new URLSearchParams();
                if (title) params.append("title", title);
                if (genre) params.append("genre", genre);
                if (release_year) params.append("release_year", release_year);
                if (page) params.append("page", page.toString());
                return { url: `/search?${params.toString()}` };
            },
        }),
        getFilmById: query<FullMovieInfo, number>({
            query: (id) => {
                return `/movie/${id}`;
            },
            providesTags: (result: FullMovieInfo) => [ { type: "Films", id: result.id } ],
        }),
        login: mutation<LoginRequest, LoginResponse>({
            query: (request: LoginRequest) => ({
                url: "/login",
                method: "POST",
                body: request,
            }),
        }),
        rateMovie: mutation<RateMovieRequest, RateMovieRequest>({
            query: (request: RateMovieRequest) => ({
                url: "/rateMovie",
                method: "POST",
                body: request,
            }),
            invalidatesTags: (result, error, arg) => [ { type: 'Films', id: arg.movieId } ],
        }),
    })
});
export const { useGetSearchFilmsQuery, useGetFilmByIdQuery, useLoginMutation, useRateMovieMutation } = apiSlice;
