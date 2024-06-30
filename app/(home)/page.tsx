import { FilmsListPage } from "@/pages/film-list-page";
import { getFilms } from "@/app/(home)/actions";
import { StoreProvider } from "@/entities/film/model/StoreProvider";
import { MainLayout } from "@/pages/main-layout";
import styles from "@/pages/film-list-page/styles.module.css";
import { FilmFilter } from "@/features/film-filter";
import { FilmSearch } from "@/features/film-search";

interface HomeProps {
    searchParams: {
        title?: string;
        genre?: string;
        release_year?: string;
        page: string;
    },
}

export default async function Home({
                                       searchParams: {
                                           title = "",
                                           genre = "",
                                           release_year = "",
                                           page = "1"
                                       }
                                   }: HomeProps) {
    const filmsData = await getFilms({ title, genre, release_year, page });
    if (filmsData === null) {
        throw new Error("Извините, не смогли загрузить фильмы. Попробуйте потом");
    }
    return (
        <StoreProvider>
            <MainLayout>
                <div className={styles.filmListPage}>
                    <FilmFilter/>
                    <div className={styles.filmList}>
                        <FilmSearch/>
                        <FilmsListPage filmsData={filmsData}/>
                    </div>
                </div>
            </MainLayout>
        </StoreProvider>
    );
}
