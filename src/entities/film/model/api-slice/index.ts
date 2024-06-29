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

export const apiSlice = createApi({
    reducerPath: "apiSlice",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3030/api/v1" }),
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set('x-access-token', `${token}`)
        }
        headers.set("content-type", "application/json");
        return headers
    },
    endpoints: ({query, mutation}) => ({
        getSearchFilms: query<SearchFilmsResponse, { title?: string, genre?: string, release_year?: string, page?: number }>({
            query: ({ title = "", genre = "", release_year = "", page = 1 }) => {
                const params = new URLSearchParams();
                if (title) params.append("title", title);
                if (genre) params.append("genre", genre);
                if (release_year) params.append("release_year", release_year);
                if (page) params.append("page", page.toString());
                console.log(page.toString());
                return { url: `/search?${params.toString()}` };
            }
        }),
        getFilmById: query<FullMovieInfo, number>({
            query: (id) => {
                console.log("in getFilmById", id);
                return `/movie/${id}`;
            },
        }),
        login: mutation<LoginRequest, LoginRequest>({
            query: (request: LoginRequest) => ({
                url: "/login",
                method: "POST",
                body: request,
            }),
        })
    })
});
export const { useGetSearchFilmsQuery, useGetFilmByIdQuery, useLoginMutation } = apiSlice;
