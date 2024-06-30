import { ReactNode } from "react";

interface FilmListLayoutProps {
    children: ReactNode,
}

export default function FilmListLayout({ children }: FilmListLayoutProps) {
    return (
        <>
            {children}
        </>
    );
}