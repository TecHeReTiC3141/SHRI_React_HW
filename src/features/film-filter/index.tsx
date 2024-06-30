import styles from "./styles.module.css";
import { GENRES_MAP, GenresEnglish, YEARS, YearsFilter } from "@/shared/api/films";
import { SelectField } from "@/shared/ui/select";
import { useAppDispatch, useAppSelector } from "@/entities/film/model";
import { updateGenreFilter, updateReleaseYearFilter } from "@/entities/film/model/filter-slice";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

export function FilmFilter() {

    const dispatch = useAppDispatch();

    const [ , setSearchParams ] = useSearchParams();

    const genreFilter: GenresEnglish = useAppSelector(state => state.filter.genreFilter);
    const releaseYearFilter: YearsFilter = useAppSelector(state => state.filter.releaseYearFilter);

    function handleGenreSelect(genre: GenresEnglish) {
        dispatch(updateGenreFilter(genre));
        setSearchParams(prev => {
            if (genre) {
                prev.set("genre", genre);
            } else {
                prev.delete("genre");
            }
            return prev;
        });
    }

    function handleYearSelect(release_year: YearsFilter | "") {
        dispatch(updateReleaseYearFilter(release_year));
        setSearchParams(prev => {
            if (release_year !== "0") {
                prev.set("release_year", release_year);
            } else {
                prev.delete("release_year");
            }
            return prev;
        });
    }

    const genresOptions = useMemo(() => {
        const options = [ { value: "0", label: "Не выбран" } ];
        Object.entries(GENRES_MAP)
            .forEach(([ key, value ]) => options.push(
                { value: key, label: value }
            ));
        return options;
    }, []);

    const yearsOptions = useMemo(() => {
        return Object.entries(YEARS).map(([ key, value ]) => (
            { value: key, label: value }
        ));
    }, []);

    return (
        <div className={styles.filterForm}>
            <h4 className={styles.title}>Фильтр</h4>
            <SelectField name="genre" labelText="Жанр" placeholder={"Выберите жанр"}
                         options={genresOptions} value={genreFilter} onSelect={handleGenreSelect}/>
            <SelectField name="release-year" labelText="Год выпуска" placeholder={"Выберите год"}
                         options={yearsOptions}
                         value={releaseYearFilter} onSelect={handleYearSelect}/>
        </div>
    )
}