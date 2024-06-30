import { FilmDetailsPage } from "@/pages/film-details-page";
import { StoreProvider } from "@/entities/film/model/StoreProvider";
import { MainLayout } from "@/pages/main-layout";

interface FilmPageProps {
    params: { filmId: string },


}

export default function FilmPage({ params: { filmId } }: FilmPageProps) {
    return (
        <StoreProvider>
            <MainLayout>
                <FilmDetailsPage/>
            </MainLayout>
        </StoreProvider>
    );
}