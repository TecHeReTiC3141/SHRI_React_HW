import { FullMovieInfo } from "@/shared/api/films";
import { ReactNode } from "react";

import styles from "./styles.module.css";
import Image from "next/image";

interface FilmCardProps {
    film: FullMovieInfo,
    action: ReactNode,
}

export function FilmCard({ film, action }: FilmCardProps) {
    return (
        <div className={styles.filmCard}>
            <Image src={film.poster} loading="lazy" alt={film.title} width={480} height={600} className={styles.poster}/>
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