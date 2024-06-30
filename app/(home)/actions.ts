"use server"

import { ShortMovieInfo } from "@/shared/api/films";

export interface SearchFilmsResponse {
    search_result: ShortMovieInfo[];
    total_pages: number;
}

export async function getFilms({ title = "", genre = "", release_year = "", page = 1 }) {
    const params = new URLSearchParams();
    if (title) params.append("title", title);
    if (genre) params.append("genre", genre);
    if (release_year) params.append("release_year", release_year);
    if (page) params.append("page", page.toString());
    try {

        const response = await fetch(`http://localhost:3030/api/v1/search?${params.toString()}`);
        return await response.json() as SearchFilmsResponse;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}