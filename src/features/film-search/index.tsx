import styles from "./styles.module.css";
import { MagnifyingGlass } from "@/shared/ui/icons";
import { useAppDispatch, useAppSelector } from "@/entities/film/model";
import { useSearchParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { updateTitleFilter } from "@/entities/film/model/film-slice";


const DEBOUNCE_DELAY = 300;


export function FilmSearch() {

    const dispatch = useAppDispatch();

    const [, setSearchParams] = useSearchParams();

    const titleFilter: string = useAppSelector(state => state.film.titleFilter);
    const [inputValue, setInputValue] = useState(titleFilter);
    const [debouncedValue, setDebouncedValue] = useState(titleFilter);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, DEBOUNCE_DELAY);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue]);

    useEffect(() => {
        dispatch(updateTitleFilter(debouncedValue));
        setSearchParams(prev => {
            prev.set("title", debouncedValue);
            return prev;
        });
    }, [debouncedValue, dispatch, setSearchParams]);
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setInputValue(event.currentTarget.value);
    }

    return (
        <div className={styles.search}>
            <MagnifyingGlass width={16} height={16}/>
            <input className={styles.searchInput} placeholder="Название фильма" value={inputValue} onChange={handleChange}/>
        </div>
    )
}