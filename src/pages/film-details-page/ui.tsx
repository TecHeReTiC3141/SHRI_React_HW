import { useParams } from "react-router-dom";
import { useGetFilmByIdQuery } from "@/entities/film/model/api-slice";
import { Loading } from "@/shared/ui/loading";
import { FilmCard } from "@/entities/film/ui/film-card";
import { ActorsGallery } from "@/entities/film/ui/actors-gallery";
import { FullMovieInfo } from "@/shared/api/films";

import styles from "./styles.module.css";
import { Shifter } from "@/features/shifters";
import { ArrowLeft, ArrowRight } from "@/shared/ui/icons";
import { StarRating } from "@/features/star-rating";
import { useAppDispatch, useAppSelector } from "@/entities/film/model";
import { selectIsAuthed, selectUserMarks } from "@/entities/film/model/auth-slice";
import { useEffect } from "react";
import { updateFilm } from "@/entities/film/model/film-slice";

export function FilmDetailsPage() {

    const dispatch = useAppDispatch();

    const film: FullMovieInfo = useAppSelector(state => state.film.film);

    const userMarks: {[key: string]: number} = useAppSelector(selectUserMarks);

    const { id } = useParams<{ id: number }>();

    const isAuthed = useAppSelector(selectIsAuthed);

    const { data, isLoading, error }: {
        data: FullMovieInfo,
        isLoading: boolean,
        error: { data: string }
    } = useGetFilmByIdQuery(id);

    useEffect(() => {
        document.title = data?.title || "Loading...";
        if (data) {
            dispatch(updateFilm(data));
        }
    }, [data, dispatch]);

    if (isLoading || !film) {
        return <Loading/>;
    }
    if (error) {
        console.error(id, error);
    }
    console.log(userMarks, userMarks[film.id] ?? Math.round( +film.rating));
    return (
        <div className={styles.page}>
            <FilmCard film={film} action={isAuthed ? <StarRating
                disabled={false} rating={userMarks[film.id] ?? Math.round( +film.rating)}
                className={styles.actionButton} movieId={film.id}/> : null}
            />
            <ActorsGallery actors={film.actors}
                           leftShifter={<Shifter disabled={false} onClick={() => console.log("Left")}
                                                 className={styles.shifterLeft}
                                                 icon={<ArrowLeft width={16} height={16}/>}/>}
                           rightShifter={<Shifter disabled={false} onClick={() => console.log("Right")}
                                                  className={styles.shifterRight}
                                                  icon={<ArrowRight width={16} height={16}/>}/>}/>
        </div>
    );
}