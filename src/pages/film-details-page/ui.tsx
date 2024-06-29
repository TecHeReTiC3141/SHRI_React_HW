import { useParams } from "react-router-dom";
import { useGetFilmByIdQuery } from "@/entities/film/model/api-slice";
import { Loading } from "@/shared/ui/loading";
import { FilmCard } from "@/entities/film/ui/film-card";
import { ActorsGallery } from "@/entities/film/ui/actors-gallery";
import { FullMovieInfo } from "@/shared/api/films";

import styles from "./styles.module.css";

export function FilmDetailsPage() {

    const { id } = useParams<{ id: number }>();

    const { data, isLoading, error }: {data: FullMovieInfo, isLoading: boolean, error: { data: string }} = useGetFilmByIdQuery(id);

    if (isLoading) {
        return <Loading/>;
    }
    if (error) {
        console.log(id, error);
        throw new Error("Error:" + error.data);
    }
    return (
        <div className={styles.page}>
            <FilmCard film={data} action={<div>Action</div>}/>
            <ActorsGallery actors={data.actors}/>
        </div>
    );
}