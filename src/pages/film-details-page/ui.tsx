import { useParams } from "react-router-dom";

export function FilmDetailsPage() {

    const { id } = useParams<{ id: number }>();
    return (
        <div>Film details: {id}</div>
    );
}