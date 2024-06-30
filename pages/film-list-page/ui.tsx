"use client"

import { SearchFilmsResponse } from "@/entities/film/model/api-slice";
import { FilmRow } from "@/entities/film/ui/film-row";

import styles from "./styles.module.css";
import { useCallback, useEffect } from "react";
import {
    nextPage,
    prevPage,
    updateFilmPage,
    updateGenreFilter,
    updateReleaseYearFilter,
    updateTitleFilter,
    updateTotalPages
} from "@/entities/film/model/filter-slice";
import { updateFilmList, } from "@/entities/film/model/film-slice";
import { useAppDispatch, useAppSelector } from "@/entities/film/model";
import { Shifter } from "@/features/shifters";
import { ArrowLeft, ArrowRight } from "@/shared/ui/icons";
import { NoFilmsFound } from "@/entities/film/ui/no-films-found";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { setSearchParams } from "@/shared/utils";

interface FilmsListPageProps {
    filmsData: SearchFilmsResponse,
}

export function FilmsListPage({ filmsData }: FilmsListPageProps) {
    const router = useRouter();
    const pathname = usePathname();

    const dispatch = useAppDispatch();

    const searchParams = useSearchParams();

    const titleFilter = useAppSelector(state => state.filter.titleFilter);
    const genreFilter = useAppSelector(state => state.filter.genreFilter);
    const releaseYearFilter = useAppSelector(state => state.filter.releaseYear);
    const filmPage = useAppSelector(state => state.filter.filmPage);
    const totalPages = useAppSelector(state => state.filter.totalPages);

    const createQueryString = useCallback(
        (name, value) => setSearchParams(searchParams, name, value),
        [ searchParams ]
    );

    useEffect(() => {
        console.log("page", searchParams.get("page"));
        dispatch(updateTitleFilter(searchParams.get("title") || ""));
        dispatch(updateGenreFilter(searchParams.get("genre") || ""));
        dispatch(updateReleaseYearFilter(searchParams.get("release_year") || ""));
        dispatch(updateFilmPage(+(searchParams.get("page") || "1")));
    }, [ dispatch, searchParams ]);

    useEffect(() => {
        document.title = "Фильмопоиск";
    }, []);


    useEffect(() => {
        if (filmsData) {
            console.log(filmsData);
            dispatch(updateFilmList(filmsData.search_result));
            dispatch(updateTotalPages(filmsData.total_pages));
        }
    }, [ filmsData, filmsData?.search_result, dispatch ]);

    function handleNextPage() {
        dispatch(nextPage());
    }

    function handlePrevPage() {
        dispatch(prevPage());
    }

    useEffect(() => {
        router.push(pathname + '?' + createQueryString("page", filmPage), {scroll: false});
    }, [createQueryString, filmPage, pathname, router]);

    return (
        <>
            {
                filmsData.search_result.length === 0 ? <NoFilmsFound/> :
                    <>
                        {filmsData.search_result.map((film) => (
                            <FilmRow key={film.id} film={film} action={<div>Action</div>}/>
                        ))}
                        <div className={styles.pagination}>
                            <Shifter disabled={filmPage === 1} onClick={handlePrevPage}
                                     icon={<ArrowLeft width={16} height={16}/>}/>
                            <p>{filmPage}</p>
                            <Shifter disabled={filmPage === totalPages} onClick={handleNextPage}
                                     icon={<ArrowRight width={16} height={16}/>}/>
                        </div>
                    </>
            }
        </>


    );

}