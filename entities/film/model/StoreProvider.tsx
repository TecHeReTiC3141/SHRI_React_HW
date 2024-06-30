"use client"

import { store } from "@/entities/film/model/store";
import { Provider } from "react-redux";
import { ReactNode } from "react";

interface StoreProviderProps {
    children: ReactNode,
}


export function StoreProvider({children}: StoreProviderProps) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}