import { createBrowserRouter } from "react-router-dom";
import { FilmDetailsPage } from "@/pages/film-details-page";
import { FilmsListPage } from "@/pages/film-list-page";
import { MainLayout } from "@/pages/main-layout";
import { Error } from "@/shared/ui/error";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <Error />,
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