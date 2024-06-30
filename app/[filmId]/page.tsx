import { FilmDetailsPage } from "@/pages/film-details-page";
import { StoreProvider } from "@/entities/film/model/StoreProvider";
import { MainLayout } from "@/pages/main-layout";
import { getFilmById } from "@/app/[filmId]/actions";
import { notFound } from "next/navigation";
import { FullMovieInfo } from "@/shared/api/films";

interface FilmPageProps {
    params: { filmId: string },
}

export default async function FilmPage({ params: { filmId } }: FilmPageProps) {

    const filmData = await getFilmById(filmId);

    if (!filmData || filmData.hasOwnProperty("error")) {
        notFound();
    }

    return (
        <StoreProvider>
            <MainLayout>
                <FilmDetailsPage filmData={filmData as FullMovieInfo}/>
            </MainLayout>
        </StoreProvider>
    );
}