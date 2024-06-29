import { SearchFilmsResponse, useGetSearchFilmsQuery } from "@/entities/film/model/api-slice";
import { FilmRow } from "@/entities/film/ui/film-row";
import { Loading } from "@/shared/ui/loading";

import styles from "./styles.module.css";
import { FilmFilter } from "@/features/film-filter";
import { FilmSearch } from "@/features/film-search";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { updateGenreFilter, updateReleaseYearFilter, updateTitleFilter } from "@/entities/film/model/film-slice";
import { useAppDispatch, useAppSelector } from "@/entities/film/model";

export function FilmsListPage() {

    const dispatch = useAppDispatch();

    const [searchParams, ] = useSearchParams();

    const titleFilter = useAppSelector(state => state.film.titleFilter);
    const genreFilter = useAppSelector(state => state.film.genreFilter);
    const releaseYearFilter = useAppSelector(state => state.film.releaseYear);

    useEffect(() => {
        dispatch(updateTitleFilter(searchParams.get("title") || ""));
        dispatch(updateGenreFilter(searchParams.get("genre") || ""));
        dispatch(updateReleaseYearFilter(searchParams.get("release_year") || ""));
    }, [dispatch, searchParams]);

    const { data, isLoading, refetch, error }: {
        data: SearchFilmsResponse,
        isLoading: boolean,
        error: Error,
    } = useGetSearchFilmsQuery({
        title: searchParams.get("title") || "",
        genre: searchParams.get("genre") || "",
        release_year: searchParams.get("release_year") || ""
    });

    useEffect(() => {
        refetch();
    }, [titleFilter, genreFilter, releaseYearFilter, refetch]);

    if (isLoading) {
        return <Loading/>;
    }
    if (error) {
        throw new Error("Error:" + error.message);
    }
    return (
        <div className={styles.filmListPage}>
            <FilmFilter />
            <div className={styles.filmList}>
                <FilmSearch />
                {data.search_result.map((film) => (
                    <FilmRow key={film.id} film={film} action={<div>Action</div>}/>
                ))}
            </div>
        </div>

    );

}