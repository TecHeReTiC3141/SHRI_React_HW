import { apiSlice, SearchFilmsResponse } from "@/entities/film/model/api-slice";
import { FilmRow } from "@/entities/film/ui/film-row";
import { Loading } from "@/shared/ui/loading";

import styles from "./styles.module.css";

export function FilmsListPage() {

    const {data, isLoading, error }: {data: SearchFilmsResponse, isLoading: boolean, error: Error} = apiSlice.endpoints.getSearchFilms.useQuery();

    if (isLoading) {
        return <Loading />;
    }
    if (error) {
        throw new Error("Error:" + error.message);
    }
    return (
        <div className={styles.filmList}>
            {data.search_result.map((film) => (
                <FilmRow key={film.id} film={film} action={<div>Action</div>}/>
            ))}
        </div>

    );

}