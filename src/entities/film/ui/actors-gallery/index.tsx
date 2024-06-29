import { Actor } from "@/shared/api/films";

import styles from "./styles.module.css";
import { ReactNode } from "react";

interface ActorsGalleryProps {
    actors: Actor[],
    leftShifter: ReactNode,
    rightShifter: ReactNode,
}

export function ActorsGallery({ actors, leftShifter, rightShifter }: ActorsGalleryProps) {
    // TODO: implement shifting gallery using shifters
    return (
        <>
            <h4 className={styles.title}>Актеры</h4>
            <div className={styles.gallery}>
                {leftShifter}
                {actors.map(actor => (
                    <div key={actor.name}>
                        <img className={styles.photo} src={actor.photo} alt={actor.name} width={120}/>
                        <p className={styles.name} key={actor.name}>{actor.name}</p>
                    </div>
                ))}
                {rightShifter}
            </div>
        </>
    )
}