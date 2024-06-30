"use client"

import styles from "./styles.module.css";
import { MagnifyingGlass } from "@/shared/ui/icons";
import { useAppDispatch, useAppSelector } from "@/entities/film/model";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { updateTitleFilter } from "@/entities/film/model/filter-slice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { setSearchParams } from "@/shared/utils";


const DEBOUNCE_DELAY = 300;


export function FilmSearch() {

    const router = useRouter();
    const pathname = usePathname();

    const dispatch = useAppDispatch();

    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name, value) => setSearchParams(searchParams, name, value),
        [ searchParams ]
    );

    const titleFilter: string = useAppSelector(state => state.filter.titleFilter);
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
        router.push(pathname + '?' + createQueryString('title', debouncedValue));
    }, [ createQueryString, debouncedValue, dispatch, pathname, router ]);

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