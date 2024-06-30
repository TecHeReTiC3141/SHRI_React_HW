"use server"

import { FullMovieInfo } from "@/shared/api/films";

export type FilmByIdResponse = FullMovieInfo | { error: string };

export async function getFilmById(id: string) {
    try {
        const response = await fetch(`http://localhost:3030/api/v1/movie/${id}`);
        return await response.json() as FilmByIdResponse;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}