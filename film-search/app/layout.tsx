import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/pages/main-layout";
import { StoreProvider } from "@/entities/film/model/StoreProvider";

const inter = Inter({ subsets: [ "latin" ] });

export const metadata: Metadata = {
    title: "Фильмопоиск",
    description: "Типа клон Кинопоиска",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <StoreProvider>

            <MainLayout>
                {children}
            </MainLayout>
        </StoreProvider>
        </body>
        </html>
    );
}
