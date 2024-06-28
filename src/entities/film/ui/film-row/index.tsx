import { ShortMovieInfo } from "@/shared/api/films";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

import styles from "@/entities/film/ui/film-row/styles.module.css";

interface FilmRowProps {
    film: ShortMovieInfo,
    action: ReactNode,
}

export function FilmRow({ film, action }: FilmRowProps) {
    console.log(styles);
    return (
        <Link to={`/${film.id}`} className={styles.filmRow}>
            <img src={film.poster} alt={film.title} className={styles.filmRowImage}/>
            <div>
                <h3 className={styles.filmRowTitle}>{film.title}</h3>
                <div className={styles.filmRowInfo}>

                    <div className="">
                        <p className={styles.filmRowFeature}>Жанр</p>
                        <p className={styles.filmRowFeature}>Год выпуска</p>
                        <p className={styles.filmRowFeature}>Описание</p>
                    </div>
                    <div className={styles.filmRowData}>

                        <p>{film.genre}</p>
                        <p>{film.release_year}</p>
                        <p>{film.description}</p>
                    </div>
                </div>
                {action}
            </div>
        </Link>
    );
}