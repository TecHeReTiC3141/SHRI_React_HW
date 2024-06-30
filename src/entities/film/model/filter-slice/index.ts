import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GenresEnglish, YearsFilter } from "@/shared/api/films";

interface FilterState {
    titleFilter: string;
    genreFilter: GenresEnglish | "";
    releaseYearFilter: YearsFilter | "";
    filmPage: number;
    totalPages: number;
}

// TODO: move filters to separate slice

const initialState: FilterState = {
    titleFilter: "",
    genreFilter: "",
    releaseYearFilter: "",
    filmPage: 1,
    totalPages: 1,
};

const filterSlice = createSlice<FilterState>({
    name: "filter",
    initialState,
    reducers: {
        updateGenreFilter: (state: FilterState, action: PayloadAction<GenresEnglish>) => {
            state.genreFilter = action.payload;
        },
        updateReleaseYearFilter: (state: FilterState, action: PayloadAction<YearsFilter>) => {
            state.releaseYearFilter = action.payload;
        },
        updateTitleFilter: (state: FilterState, action: PayloadAction<string>) => {
            state.titleFilter = action.payload;
        },
        prevPage: (state: FilterState) => {
            state.filmPage = Math.max(state.filmPage - 1, 0);
        },
        nextPage: (state: FilterState) => {
            state.filmPage = Math.min(state.filmPage + 1, state.totalPages);
        },
        updateFilmPage: (state: FilterState, action: PayloadAction<number>) => {
            state.filmPage = action.payload;
        },
        updateTotalPages: (state: FilterState, action: PayloadAction<number>) => {
            state.totalPages = action.payload;
        },
    }
});

export default filterSlice.reducer;

export const {
    updateGenreFilter,
    updateReleaseYearFilter,
    updateTitleFilter,
    prevPage,
    nextPage,
    updateTotalPages,
    updateFilmPage,
} = filterSlice.actions;