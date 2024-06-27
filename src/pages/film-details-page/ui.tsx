import { useParams } from "react-router-dom";
import { apiSlice } from "@/entities/film/model/api-slice";
import { Loading } from "@/shared/ui/loading";
import { FilmCard } from "@/entities/film/ui/film-card";

export function FilmDetailsPage() {

    const { id } = useParams<{ id: number }>();

    const {data, isLoading, error} = apiSlice.endpoints?.getFilmById.useQuery(id);

    if (isLoading) {
        return <Loading />;
    }
    if (error) {
        console.log(id, error);
        throw new Error("Error:" + error.data);
    }
    return (
        <FilmCard film={data} action={<div>Action</div>}/>
    );
}