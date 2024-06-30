import { Actor } from "@/shared/api/films";

import styles from "./styles.module.css";
import { ReactNode } from "react";

interface ActorsGalleryProps {
    actors: Actor[],
    leftShifter: ReactNode,
    rightShifter: ReactNode,
    shift: number,
}

export function ActorsGallery({ actors, leftShifter, rightShifter, shift }: ActorsGalleryProps) {
    return (
        <>
            <h4 className={styles.title}>Актеры</h4>
            <div className={styles.gallery}>
                {leftShifter}
                {actors.slice(shift).map((actor, index) => (
                    <div key={index}>
                        <img className={styles.photo} src={actor.photo} alt={actor.name} width={120}/>
                        <p className={styles.name} key={actor.name}>{actor.name}</p>
                    </div>
                ))}
                {rightShifter}
            </div>
        </>
    )
}