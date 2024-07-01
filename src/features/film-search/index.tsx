import styles from "./styles.module.css";
import { MagnifyingGlass } from "@/shared/ui/icons";
import { useAppDispatch, useAppSelector } from "@/entities/film/model";
import { useSearchParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { selectTitleFilter, updateTitleFilter } from "@/entities/film/model/filter-slice";


const DEBOUNCE_DELAY = 300;


export function FilmSearch() {

    const dispatch = useAppDispatch();

    const [ searchParams, setSearchParams ] = useSearchParams();

    const titleFilter: string = useAppSelector(selectTitleFilter);
    const [ inputValue, setInputValue ] = useState(searchParams.get("title") || titleFilter);
    const [ debouncedValue, setDebouncedValue ] = useState(searchParams.get("title") || titleFilter);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, DEBOUNCE_DELAY);

        return () => {
            clearTimeout(handler);
        };
    }, [ inputValue ]);

    useEffect(() => {
        dispatch(updateTitleFilter(debouncedValue));
        setSearchParams(prev => {
            if (debouncedValue) {
                prev.set("title", debouncedValue);
            } else {
                prev.delete("title")
            }
            return prev;
        });
    }, [ debouncedValue, dispatch, setSearchParams ]);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setInputValue(event.currentTarget.value);
    }

    return (
        <div className={styles.search}>
            <MagnifyingGlass width={16} height={16}/>
            <input className={styles.searchInput} placeholder="Название фильма" value={inputValue}
                   onChange={handleChange}/>
        </div>
    )
}