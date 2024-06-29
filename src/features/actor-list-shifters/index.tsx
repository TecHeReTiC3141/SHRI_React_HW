import styles from "@/features/actor-list-shifters/styles.module.css";
import classNames from "classnames";
import React, { ReactNode } from "react";

interface ShiftersProps {
    onClick: () => void;
    className?: string;
    icon: ReactNode;
    disabled: boolean
}

export function Shifter({ icon, onClick, className, disabled }: ShiftersProps) {
    return (
        <button disabled={disabled} className={classNames(styles.shifter, className)} onClick={onClick}>
            {icon}
        </button>
    );
}