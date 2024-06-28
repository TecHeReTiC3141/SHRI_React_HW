import React from "react";
import styles from "./styles.module.css";


interface HeaderProps {
    action: React.ReactNode;
    isAuthed: boolean;
}

export function Header({action}: HeaderProps) {
    return (
        <header className={styles.header}>
            <h1 className={styles.headerTitle}>Фильмопоиск</h1>
            {action}
        </header>
    );
}