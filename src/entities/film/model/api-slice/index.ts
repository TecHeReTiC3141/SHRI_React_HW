import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FullMovieInfo, ShortMovieInfo } from "@/shared/api/films";

export interface SearchFilmsResponse {
    search_result: ShortMovieInfo[];
    total_pages: number;
}

export const apiSlice = createApi({
    reducerPath: "apiSlice",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3030/api/v1" }),
    prepareHeaders: (headers, {getState}) => {
        // const token = (getState() as RootState).auth.token
        // if (token) {
        //     headers.set('x-access-token', `${token}`)
        // }
        headers.set("content-type", "application/json");
        return headers
    },
    endpoints: ({query}) => ({
        getSearchFilms: query<SearchFilmsResponse, void>({
            query: () => ({ url: "/search" })
        }),
        getFilmById: query<FullMovieInfo, number>({
            query: (id) => {
                console.log("in getFilmById", id);
                return `/movie/${id}`;
            },
        }),
    })
});
export const { useGetSearchFilmQuery } = apiSlice;
