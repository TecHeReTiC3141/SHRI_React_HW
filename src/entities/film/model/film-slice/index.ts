import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
        updateGenreFilter: (state: FilmState, action: PayloadAction<GenresEnglish>) => {
            state.genreFilter = action.payload;
        },
        updateReleaseYearFilter: (state: FilmState, action: PayloadAction<YearsFilter>) => {
            state.releaseYearFilter = action.payload;
        },
    }
});

export default filmSlice.reducer;

export const {updateGenreFilter, updateReleaseYearFilter} = filmSlice.actions;