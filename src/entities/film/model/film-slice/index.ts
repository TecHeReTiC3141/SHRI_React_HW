import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FullMovieInfo, GenresEnglish, ShortMovieInfo, YearsFilter } from "@/shared/api/films";

interface FilmState {
    filmList: ShortMovieInfo[];
    totalPages: number;
    film?: FullMovieInfo;
    isLoading: boolean;
    filmError: string;
    filmListError: string;
    titleFilter: string;
    genreFilter: GenresEnglish | "";
    releaseYearFilter: YearsFilter | "";
    filmPage: number;
    actorsShift: number;
}

// TODO: move filters to separate slice

const initialState: FilmState = {
    filmList: [],
    totalPages: 1,
    isLoading: false,
    filmError: "",
    filmListError: "",
    titleFilter: "",
    genreFilter: "",
    releaseYearFilter: "",
    filmPage: 1,
    actorsShift: 0,
};

const FILMS_PER_PAGE = 5;

const filmSlice = createSlice<FilmState>({
    name: "film",
    initialState,
    reducers: {
        updateGenreFilter: (state: FilmState, action: PayloadAction<GenresEnglish>) => {
            state.genreFilter = action.payload;
        },
        updateReleaseYearFilter: (state: FilmState, action: PayloadAction<YearsFilter>) => {
            state.releaseYearFilter = action.payload;
        },
        updateTitleFilter: (state: FilmState, action: PayloadAction<string>) => {
            state.titleFilter = action.payload;
        },
        prevPage: (state: FilmState) => {
            state.filmPage = Math.max(state.filmPage - 1, 0);
        },
        nextPage: (state: FilmState) => {
            state.filmPage = Math.min(state.filmPage + 1, state.totalPages);
        },
        updateFilmPage: (state: FilmState, action: PayloadAction<number>) => {
            state.filmPage = action.payload;
        },
        updateFilmList: (state: FilmState, action: PayloadAction<ShortMovieInfo[]>) => {
            state.filmList = action.payload;
        },
        updateTotalPages: (state: FilmState, action: PayloadAction<number>) => {
            state.totalPages = action.payload;
        },
    }
});

export default filmSlice.reducer;

export const {
    updateGenreFilter,
    updateReleaseYearFilter,
    updateTitleFilter,
    updateFilmList,
    prevPage,
    nextPage,
    updateTotalPages,
    updateFilmPage,
} = filmSlice.actions;