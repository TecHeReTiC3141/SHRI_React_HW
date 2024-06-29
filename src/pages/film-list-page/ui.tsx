import { SearchFilmsResponse, useGetSearchFilmsQuery } from "@/entities/film/model/api-slice";
import { FilmRow } from "@/entities/film/ui/film-row";
import { Loading } from "@/shared/ui/loading";

import styles from "./styles.module.css";
import { FilmFilter } from "@/features/film-filter";
import { FilmSearch } from "@/features/film-search";

export function FilmsListPage() {

    const { data, isLoading, error }: {
        data: SearchFilmsResponse,
        isLoading: boolean,
        error: Error
    } = useGetSearchFilmsQuery();

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