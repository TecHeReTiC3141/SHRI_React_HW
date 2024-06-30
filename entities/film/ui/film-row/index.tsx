import { ShortMovieInfo } from "@/shared/api/films";

import styles from "./styles.module.css";
import { StarRating } from "@/features/star-rating";
import Image from "next/image";
import Link from "next/link";

interface FilmRowProps {
    film: ShortMovieInfo,
}

export function FilmRow({ film }: FilmRowProps) {
    return (
        <Link href={`/${film.id}`} className={styles.filmRow}>
            <Image width={320} height={400} src={film.poster} alt={film.title} className={styles.filmRowImage}/>
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
                <StarRating disabled={true} rating={Math.round(+film.rating)} className={styles.rating} movieId={film.id}/>
            </div>
        </Link>
    );
}