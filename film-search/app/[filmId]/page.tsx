interface FilmPageProps {
    params: { filmId: string }
}

export default function FilmPage({ params: { filmId } }: FilmPageProps) {
    return (
        <h2>FilmPage {filmId}</h2>
    );
}