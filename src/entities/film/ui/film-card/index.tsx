import { FullMovieInfo } from "@/shared/api/films";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface FilmCardProps {
    film: FullMovieInfo,
    action: ReactNode,
}

export function FilmCard({ film, action }: FilmCardProps) {
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
            <h4>Актеры</h4>
            {film.actors.map(actor => (
                <div>
                    <p key={actor.name}>{actor.name}</p>
                    <img src={actor.photo} alt={actor.name} width={120}/>
                </div>
            ))}
        </Link>
    );
}