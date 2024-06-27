import { apiSlice, SearchFilmsResponse, useGetSearchFilmQuery } from "@/entities/film/model/api-slice";
import { FilmRow } from "@/entities/film/ui/film-row";
import { Loading } from "@/shared/ui/loading";

export function FilmsListPage() {

    const {data, isLoading, error }: {data: SearchFilmsResponse, isLoading: boolean, error: Error} = apiSlice.endpoints?.getSearchFilms.useQuery();

    if (isLoading) {
        return <Loading />;
    }
    if (error) {
        throw new Error("Error:" + error.message);
    }
    return (
        <div>
            {data.search_result.map((film) => (
                <FilmRow film={film} action={<div>Action</div>}/>
            ))}
        </div>

    );

}