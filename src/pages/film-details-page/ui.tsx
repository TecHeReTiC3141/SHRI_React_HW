import { useParams } from "react-router-dom";
import { useGetFilmByIdQuery } from "@/entities/film/model/api-slice";
import { Loading } from "@/shared/ui/loading";
import { FilmCard } from "@/entities/film/ui/film-card";
import { ActorsGallery } from "@/entities/film/ui/actors-gallery";
import { FullMovieInfo } from "@/shared/api/films";

import styles from "./styles.module.css";
import { Shifter } from "@/features/shifters";
import { ArrowLeft, ArrowRight } from "@/shared/ui/icons";
import { StarRating } from "@/features/star-rating";
import { useAppSelector } from "@/entities/film/model";
import { selectIsAuthed } from "@/entities/film/model/auth-slice";

export function FilmDetailsPage() {

    const { id } = useParams<{ id: number }>();

    const isAuthed = useAppSelector(selectIsAuthed);

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
            <FilmCard film={data} action={<StarRating disabled={!isAuthed} rating={Math.round(+data.rating)} className={styles.actionButton}/>}/>
            <ActorsGallery actors={data.actors}
                           leftShifter={<Shifter disabled={false} onClick={() => console.log("Left")} className={styles.shifterLeft}
                                                 icon={<ArrowLeft width={16} height={16}/>}/>}
                           rightShifter={<Shifter disabled={false} onClick={() => console.log("Right")} className={styles.shifterRight}
                                                  icon={<ArrowRight width={16} height={16}/>}/>}/>
        </div>
    );
}