import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";


interface HeaderProps {
    action: React.ReactNode;
    isAuthed: boolean;
}

export function Header({action}: HeaderProps) {
    return (
        <header className={styles.header}>
            <Link to="/" className={styles.headerTitle}>Фильмопоиск</Link>
            {action}
        </header>
    );
}