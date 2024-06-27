import { ShortMovieInfo } from "@/shared/api/films";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface FilmRowProps {
    film: ShortMovieInfo,
    action: ReactNode,
}

export function FilmRow({ film, action }: FilmRowProps) {
    return (
        <Link to={`/${film.id}`}>
            <img src={film.poster} alt={film.title} width={480}/>
            <div>
                <h3>{film.title}</h3>
                <p>Жанр {film.genre}</p>
                <p>Год выпуска {film.release_year}</p>
                <p>Описание {film.description}</p>
            </div>
            {action}
        </Link>
    );
}