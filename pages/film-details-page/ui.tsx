"use client"

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
import {
    decrementActorsShift,
    incrementActorsShift,
    updateActorsShift,
    updateFilm
} from "@/entities/film/model/film-slice";
import classNames from "classnames";
import { useParams } from "next/navigation";

const ACTORS_ON_PAGE = 8;

interface FilmDetailsPageProps {
    filmData: FullMovieInfo,
}

export function FilmDetailsPage({filmData}: FilmDetailsPageProps) {
    const dispatch = useAppDispatch();

    const film: FullMovieInfo = useAppSelector(state => state.film.film);

    const actorsShift = useAppSelector(state => state.film.actorsShift);

    const userMarks: { [ key: string ]: number } = useAppSelector(selectUserMarks);

    const { filmId } = useParams();

    const isAuthed = useAppSelector(selectIsAuthed);

    useEffect(() => {
        dispatch(updateActorsShift(0));
    }, [ dispatch, filmId ]);
    
    useEffect(() => {
        document.title = filmData?.title || "Loading...";
        if (filmData) {
            dispatch(updateFilm(filmData));
        }
    }, [ filmData, dispatch ]);

    function shiftLeft() {
        dispatch(decrementActorsShift())
    }

    function shiftRight() {
        dispatch(incrementActorsShift())
    }

    if (!film) {
        return null;
    }

    return (
        <div className={styles.page}>
            <FilmCard film={film} action={isAuthed ? <StarRating
                disabled={false} rating={userMarks[ film.id ] ?? Math.round(+film.rating)}
                className={styles.actionButton} movieId={film.id}/> : null}
            />
            <ActorsGallery actors={film?.actors || []} shift={actorsShift}
                           leftShifter={<Shifter disabled={actorsShift === 0} onClick={shiftLeft}
                                                 className={classNames(actorsShift === 0 ? styles.shifterDisabled : styles.shifterLeft)}
                                                 icon={<ArrowLeft width={16} height={16}/>}/>}
                           rightShifter={<Shifter disabled={actorsShift + ACTORS_ON_PAGE >= film?.actors?.length}
                                                  onClick={shiftRight}
                                                  className={classNames(actorsShift + ACTORS_ON_PAGE >= film?.actors?.length ? styles.shifterDisabled : styles.shifterRight)}
                                                  icon={<ArrowRight width={16} height={16}/>}/>}/>
        </div>
    );
}