import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";

interface HeaderProps {
    action: React.ReactNode;
    isAuthed: boolean;
}

export function Header({action}: HeaderProps) {
    return (
        <header className={styles.header}>
            <Link href="/" className={styles.headerTitle}>Фильмопоиск</Link>
            {action}
        </header>
    );
}