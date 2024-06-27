import { RouterProvider } from "react-router-dom";
import { router } from "@/app/routing";
import { Provider } from "react-redux";
import { store } from "@/entities/film/model";

export function App() {
    return (
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    );
}