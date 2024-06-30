import styles from "./styles.module.css";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { EmptyStar, FilledStar, HoverStart } from "@/shared/ui/icons";
import classNames from "classnames";
import { RateMovieResponse, useRateMovieMutation } from "@/entities/film/model/api-slice";
import { useAppDispatch, useAppSelector } from "@/entities/film/model";
import { updateFilmRating } from "@/entities/film/model/film-slice";
import { selectUserMarkById, setUserMark } from "@/entities/film/model/auth-slice";
import { UnknownAction } from "@reduxjs/toolkit";

const DEBOUNCE_DELAY = 400;

interface StarRatingProps {
    className?: string;
    disabled: boolean;
    rating: number;
    movieId: string;
}

export function StarRating({ rating, disabled, className, movieId }: StarRatingProps) {

    const [ value, setValue ] = useState<number>(rating);
    const [ hoveredValue, setHoveredValue ] = useState<number>(-1);
    const [ debouncedRating, setDebouncedRating ] = useState<number>(-1);

    const [ rateMovie ] = useRateMovieMutation();

    const userMark = useAppSelector(state => selectUserMarkById(state, movieId));

    const dispatch = useAppDispatch();

    function handleMouseEnter(event: MouseEvent<HTMLButtonElement>, index: number) {
        if (disabled) return;
        setHoveredValue(index + 1);
    }

    useEffect(() => {
        if (disabled) return;
        setValue(userMark ?? rating);
    }, [ disabled, userMark, rating ]);

    function handleClick(mark: number) {
        if (value === hoveredValue) return;
        setValue(mark);
        setDebouncedRating(mark);
    }

    const handleRatingSubmit = useCallback(async (mark: number) => {
        console.log("in handle submit");
        try {
            const response: RateMovieResponse = await rateMovie({
                movieId,
                user_rate: mark,
            }).unwrap();
            if (response.error) {
                console.error(response.error);
                return;
            }
            setValue(mark);
            dispatch(setUserMark({ movieId, mark }) as UnknownAction);
            dispatch(updateFilmRating(response));
        } catch (err) {
            console.error(err.message);
        }
    }, [dispatch, movieId, rateMovie]);


    useEffect(() => {
        const handler = setTimeout(async () => {
            if (disabled || debouncedRating === -1) return;
            await handleRatingSubmit(debouncedRating);
        }, DEBOUNCE_DELAY);

        return () => {
            clearTimeout(handler);
        };
    }, [handleRatingSubmit, debouncedRating, value, disabled]);

    return (
        <div className={classNames(styles.rating, className)} onMouseLeave={() => setHoveredValue(-1)}>
            {Array.from({ length: 5 }).map((_, index) => (
                    <button key={index} className={styles.ratingButton} disabled={disabled}
                            onClick={() => handleClick(index + 1)}
                            onMouseEnter={event => handleMouseEnter(event, index)}>
                        {hoveredValue !== -1 && (hoveredValue >= index + 1 ?
                            <HoverStart width={15} height={15}/> : <EmptyStar width={15} height={15}/>)}
                        {hoveredValue === -1 && (index + 1 <= value ?
                            <FilledStar width={15} height={15}/> : <EmptyStar width={15} height={15}/>)}
                        <p className={classNames(index + 1 > rating && styles.disabledText)}>{index + 1}</p>
                    </button>
                )
            )}
        </div>
    );
}