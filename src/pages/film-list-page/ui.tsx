import { SearchFilmsResponse, useGetSearchFilmsQuery } from "@/entities/film/model/api-slice";
import { FilmRow } from "@/entities/film/ui/film-row";
import { Loading } from "@/shared/ui/loading";

import styles from "./styles.module.css";
import { FilmFilter } from "@/features/film-filter";
import { FilmSearch } from "@/features/film-search";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import {
    nextPage,
    prevPage,
    selectGenreFilter,
    selectReleaseYearFilter,
    selectTitleFilter,
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

export function FilmsListPage() {

    const dispatch = useAppDispatch();

    const [ searchParams, ] = useSearchParams();

    const titleFilter = useAppSelector(selectTitleFilter);
    const genreFilter = useAppSelector(selectGenreFilter);
    const releaseYearFilter = useAppSelector(selectReleaseYearFilter);
    const filmPage = useAppSelector(state => state.filter.filmPage);
    const totalPages = useAppSelector(state => state.filter.totalPages);

    useEffect(() => {
        dispatch(updateTitleFilter(searchParams.get("title") || ""));
        dispatch(updateGenreFilter(searchParams.get("genre") || ""));
        dispatch(updateReleaseYearFilter(searchParams.get("release_year") || ""));
    }, [ dispatch, searchParams ]);

    const { data, isLoading, refetch, error }: {
        data: SearchFilmsResponse,
        isLoading: boolean,
        error: Error,
    } = useGetSearchFilmsQuery({
        title: searchParams.get("title") || "",
        genre: searchParams.get("genre") || "",
        release_year: searchParams.get("release_year") || "",
        page: filmPage,
    });

    useEffect(() => {
        document.title = "Фильмопоиск";
    }, []);

    useEffect(() => {
        refetch();
    }, [ titleFilter, genreFilter, releaseYearFilter, refetch, filmPage ]);

    useEffect(() => {
        if (data) {
            dispatch(updateFilmList(data.search_result));
            dispatch(updateTotalPages(data.total_pages));
        }
    }, [ data, data?.search_result, dispatch ]);

    useEffect(() => {
        dispatch(updateFilmPage(1));
    }, [ searchParams, dispatch ]);

    function handleNextPage() {
        dispatch(nextPage());
    }

    function handlePrevPage() {
        dispatch(prevPage());
    }

    if (error) {
        throw new Error("Error:" + error);
    }
    return (
        <div className={styles.filmListPage}>
            <FilmFilter/>
            <div className={styles.filmList}>
                <FilmSearch/>
                {isLoading ? <Loading/> : data.search_result.length === 0 ? <NoFilmsFound/> :
                    <>
                        {data.search_result.map((film) => (
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
            </div>
        </div>

    )
        ;

}