import { createBrowserRouter } from "react-router-dom";
import { FilmDetailsPage } from "@/pages/film-details-page";
import { FilmsListPage } from "@/pages/film-list-page";
import { MainLayout } from "@/pages/main-layout";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <FilmsListPage />,
            },
            {
                path: ":id",
                element: <FilmDetailsPage />,
            },
        ],
    },
]);