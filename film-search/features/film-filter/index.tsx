import styles from "./styles.module.css";
import { GENRES_MAP, GenresEnglish, YEARS, YearsFilter } from "@/shared/api/films";
import { SelectField } from "@/shared/ui/select";
import { useAppDispatch, useAppSelector } from "@/entities/film/model";
import { updateGenreFilter, updateReleaseYearFilter } from "@/entities/film/model/filter-slice";
import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function FilmFilter() {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value && value !== "0") {
                params.set(name, value);
            } else {
                params.delete(name);
            }
            return params.toString();
        },
        [searchParams]
    );

    const genreFilter: GenresEnglish = useAppSelector(state => state.filter.genreFilter);
    const releaseYearFilter: YearsFilter = useAppSelector(state => state.filter.releaseYearFilter);

    function handleGenreSelect(genre: GenresEnglish) {
        dispatch(updateGenreFilter(genre));
        router.push(pathname + '?' + createQueryString('genre', genre));
    }

    function handleYearSelect(release_year: YearsFilter | "") {
        dispatch(updateReleaseYearFilter(release_year));
        router.push(pathname + '?' + createQueryString('release_year', release_year));

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