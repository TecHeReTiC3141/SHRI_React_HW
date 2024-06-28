import { createSlice } from "@reduxjs/toolkit";
import { FullMovieInfo, GenresEnglish, ShortMovieInfo, YearsFilter } from "@/shared/api/films";

interface FilmState {
    filmList: ShortMovieInfo[];
    film?: FullMovieInfo;
    isLoading: boolean;
    filmError: string;
    filmListError: string;
    titleFilter: string;
    genreFilter: GenresEnglish | "";
    releaseYearFilter: YearsFilter | "";
}

const initialState: FilmState = {
    filmList: [],
    isLoading: false,
    filmError: "",
    filmListError: "",
    titleFilter: "",
    genreFilter: "",
    releaseYearFilter: "",
};

const filmSlice = createSlice<FilmState>({
    name: "film",
    initialState,
    reducers: {

    }
});

export default filmSlice.reducer;