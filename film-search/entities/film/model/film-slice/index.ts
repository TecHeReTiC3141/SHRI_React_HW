import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FullMovieInfo, ShortMovieInfo } from "@/shared/api/films";
import { RateMovieResponse } from "@/entities/film/model/api-slice";

interface FilmState {
    filmList: ShortMovieInfo[];
    film?: FullMovieInfo;
    isLoading: boolean;
    filmError: string;
    filmListError: string;
    titleFilter: string;
    actorsShift: number;
}

const initialState: FilmState = {
    filmList: [],
    isLoading: false,
    filmError: "",
    filmListError: "",
    titleFilter: "",
    actorsShift: 0,
};

const filmSlice = createSlice<FilmState>({
    name: "film",
    initialState,
    reducers: {
        updateFilm: (state: FilmState, action: PayloadAction<FullMovieInfo>) => {
            state.film = action.payload;
        },
        updateFilmList: (state: FilmState, action: PayloadAction<ShortMovieInfo[]>) => {
            state.filmList = action.payload;
        },
        updateFilmRating: (state: FilmState, action: PayloadAction<Required<Omit<RateMovieResponse, "error">>> ) => {
            if (state.film) {
                state.film = {
                    ...state.film,
                    rating: action.payload.newAverageRate.toString(),
                    total_rates_count: action.payload.newTotalRatesCount.toString(),
                }
            }
            state.filmList = state.filmList.map((film) => {
                if (film.id === action.payload.movieId) {
                    return {
                        ...film,
                        rating: action.payload.newAverageRate.toString(),
                        total_rates_count: action.payload.newTotalRatesCount,
                    };
                }
                return film;
            });
        },
        updateActorsShift: (state: FilmState, action: PayloadAction<number>) => {
            state.actorsShift = action.payload;
        },
        decrementActorsShift: (state: FilmState) => {
            --state.actorsShift;
        },
        incrementActorsShift: (state: FilmState) => {
            ++state.actorsShift;
        },
    }
});

export default filmSlice.reducer;

export const {
    updateFilmList,
    updateFilm,
    updateFilmRating,
    updateActorsShift,
    decrementActorsShift,
    incrementActorsShift,
} = filmSlice.actions;