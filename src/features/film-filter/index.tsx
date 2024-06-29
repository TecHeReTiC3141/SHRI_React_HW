import styles from "./styles.module.css";
import { GENRES_MAP, GenresEnglish, YEARS, YearsFilter } from "@/shared/api/films";
import { SelectField } from "@/shared/ui/select";
import { useAppDispatch, useAppSelector } from "@/entities/film/model";
import { updateGenreFilter, updateReleaseYearFilter } from "@/entities/film/model/film-slice";
import { useSearchParams } from "react-router-dom";

export function FilmFilter() {

    const dispatch = useAppDispatch();

    const [ , setSearchParams ] = useSearchParams();

    const genreFilter: GenresEnglish = useAppSelector(state => state.film.genreFilter);
    const releaseYearFilter: YearsFilter = useAppSelector(state => state.film.releaseYearFilter);

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

    return (
        <div className={styles.filterForm}>
            <h4 className={styles.title}>Фильтр</h4>
            <SelectField name="genre" labelText="Жанр" options={<>
                <option value="">Не выбран</option>
                {Object.entries(GENRES_MAP).map(([ key, value ]) => (
                    <option key={key} value={key}>{value}</option>
                ))}
            </>} value={genreFilter} onSelect={handleGenreSelect}/>
            <SelectField name="release-year" labelText="Год выпуска" options={<>
                {Object.entries(YEARS).map(([ key, value ]) => (
                    <option key={key} value={key}>{value}</option>
                ))}
            </>} value={releaseYearFilter} onSelect={handleYearSelect}/>
        </div>
    )
}