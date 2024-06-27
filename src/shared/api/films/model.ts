export const GENRES_MAP = {
    comedy: "комедия",
    drama: "драма",
    action: "боевик",
    thriller: "триллер",
    horror: "ужасы",
    family: "семейный",
    cartoon: "анимированный",
    fantasy: "фэнтези",
    romance: "романтика",
    adventure: "приключения",
    musical: "мьюзикл",
    war: "военный",
} as const;
export type GenresEnglish = keyof typeof GENRES_MAP;
export type GenresRussian = typeof GENRES_MAP[GenresEnglish];

export type Actor = {
    name: string;
    photo: string; // base64 img
}

export type FullMovieInfo = {
    id: string;
    title: string;
    description: string;
    release_year: number;
    poster: string; //base64 img
    genre: string;
    rating: string; //float
    total_rates_count: string; //int
    actors: Actor[];
}

export type ShortMovieInfo = Omit<FullMovieInfo, "actors" | "total_rates_count">;

export const YEARS = {
    '0': 'Не выбран',
    '2009': '2009',
    '2008': '2008',
    '2007': '2007',
    '2006': '2006',
    '1990-2005': '1990-2005',
    '1950-1989': '1950-1989',
} as const;

export type YearsFilter = keyof typeof YEARS;