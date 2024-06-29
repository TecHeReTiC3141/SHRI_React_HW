import { Actor } from "@/shared/api/films";

import styles from "./styles.module.css";

interface ActorsGalleryProps {
    actors: Actor[],
}

export function ActorsGallery({ actors }: ActorsGalleryProps) {
    return (
        <>
            <h4 className={styles.title}>Актеры</h4>
            <div className={styles.gallery}>
                {actors.map(actor => (
                    <div>
                        <img className={styles.photo} src={actor.photo} alt={actor.name} width={120}/>
                        <p  className={styles.name} key={actor.name}>{actor.name}</p>
                    </div>
                ))}
            </div>
        </>
    )
}