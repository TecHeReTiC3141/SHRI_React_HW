import { useParams } from "react-router-dom";
import { useGetFilmByIdQuery } from "@/entities/film/model/api-slice";
import { Loading } from "@/shared/ui/loading";
import { FilmCard } from "@/entities/film/ui/film-card";
import { ActorsGallery } from "@/entities/film/ui/actors-gallery";
import { FullMovieInfo } from "@/shared/api/films";

import styles from "./styles.module.css";
import { Shifter } from "@/features/actor-list-shifters";
import { ArrowLeft, ArrowRight } from "@/shared/ui/icons";

export function FilmDetailsPage() {

    const { id } = useParams<{ id: number }>();

    const { data, isLoading, error }: {
        data: FullMovieInfo,
        isLoading: boolean,
        error: { data: string }
    } = useGetFilmByIdQuery(id);

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
            <ActorsGallery actors={data.actors}
                           leftShifter={<Shifter disabled={false} onClick={() => console.log("Left")}
                                                 icon={<ArrowLeft width={16} height={16}/>}/>}
                           rightShifter={<Shifter disabled={false} onClick={() => console.log("Right")}
                                                  icon={<ArrowRight width={16} height={16}/>}/>}/>
        </div>
    );
}