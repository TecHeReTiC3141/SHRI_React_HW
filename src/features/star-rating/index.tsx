import styles from "./styles.module.css";
import { MouseEvent, useState } from "react";
import { EmptyStar, FilledStar, HoverStart } from "@/shared/ui/icons";
import classNames from "classnames";

interface StarRating {
    className?: string;
    disabled: boolean;
    rating: number;
}

export function StarRating({ rating, disabled, className }: StarRating) {
    const [ value, setValue ] = useState<number>(rating);

    const [ hoveredValue, setHoveredValue ] = useState<number>(-1);

    function handleMouseEnter(event: MouseEvent<HTMLButtonElement>, index: number) {
        if (disabled) return;
        setHoveredValue(index + 1);
    }

    function handleClick(mark: number) {
        // TODO: implement send rateMovie request to server
    }

    return (
        <div className={classNames(styles.rating, className)} onMouseLeave={() => setHoveredValue(-1)}>
            {Array.from({ length: 5 }).map((_, index) => (

                    <button key={index} className={styles.ratingButton} disabled={disabled} onClick={() => handleClick(index + 1)}
                            onMouseEnter={event => handleMouseEnter(event, index)}>
                        {hoveredValue !== -1 && (hoveredValue >= index + 1 ?
                            <HoverStart width={15} height={15}/> : <EmptyStar width={15} height={15}/>)}
                        {hoveredValue === -1 && (index + 1 <= value ?
                            <FilledStar width={15} height={15}/> : <EmptyStar width={15} height={15}/>)}
                        <p className={classNames(index + 1 > rating && styles.disabledText)}>{index + 1}</p>
                    </button>

                )
            )}
        </div>
    );
}