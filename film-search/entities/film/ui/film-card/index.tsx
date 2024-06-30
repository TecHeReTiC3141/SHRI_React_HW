import { FullMovieInfo } from "@/shared/api/films";
import { ReactNode } from "react";

import styles from "./styles.module.css";

interface FilmCardProps {
    film: FullMovieInfo,
    action: ReactNode,
}

export function FilmCard({ film, action }: FilmCardProps) {
    return (
        <div className={styles.filmCard}>
            <img src={film.poster} alt={film.title} width={480} className={styles.poster}/>
            <div>
                <h3 className={styles.title}>{film.title}</h3>
                <p className={styles.line}><span className={styles.label}>Жанр: </span>{film.genre}</p>
                <p className={styles.line}><span className={styles.label}>Год выпуска:</span> {film.release_year}</p>
                <p className={styles.line}><span className={styles.label}>Рейтинг:</span> {film.rating}</p>
                <p className={styles.label}>Описание </p>
                <p className={styles.description}>{film.description}</p>
            </div>
            {action}

        </div>
    );
}