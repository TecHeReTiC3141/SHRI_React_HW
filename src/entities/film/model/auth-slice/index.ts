import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
    token: string;
    authError: string;
    userMarks: { [ key: string ]: number };
    isLoginModalVisible: boolean;
    nameField: string;
    passwordField: string;

}

const initialState: AuthState = {
    token: "",
    authError: "",
    userMarks: {},
    nameField: "",
    passwordField: "",
    isLoginModalVisible: false,
}

export const authSlice = createSlice<AuthState>({
    name: "auth",
    initialState,
    reducers: {
        openModal: (state: AuthState) => {
            state.isLoginModalVisible = true;
        },
        closeModal: (state: AuthState) => {
            state.isLoginModalVisible = false;
        },
        updateName: (state: AuthState, { payload }) => {
            state.nameField = payload;
        },
        updatePassword: (state: AuthState, { payload }) => {
            state.passwordField = payload;
        },
        clearForm: (state: AuthState) => {
            state.nameField = "";
            state.passwordField = "";
        }
    },
    selectors: {
        selectToken: (sliceState: AuthState) => sliceState.token,
        selectIsAuthed: (sliceState: AuthState) => sliceState.token !== "",
        selectError: (sliceState: AuthState) => sliceState.authError,
        selectUserMarks: (sliceState: AuthState) => sliceState.userMarks,
        selectUserMarkById: (sliceState: AuthState, movieId: string) => sliceState.userMarks[movieId],
    },
    extraReducers: builder => builder
        .addCase(createToken.fulfilled, (state, { payload }) => {
            state.token = payload;
        }).addCase(getToken.fulfilled, (state, { payload }) => {
            state.token = payload;
        }).addCase(deleteToken.fulfilled, (state) => {
            state.token = "";
        }).addCase(getUserMarks.fulfilled, (state, { payload }) => {
            state.userMarks = payload as { [ key: string ]: number };
        }).addCase(setUserMark.fulfilled, (state, { payload }) => {
            state.userMarks = payload as { [ key: string ]: number };
        }).addMatcher(
            ({ type }) => type.endsWith("/rejected"),
            (state) => {
                state.authError = "Error with authentication";
            }
        )
});

export const createToken = createAsyncThunk(
    "auth/createToken",
    (token: string) => {
        localStorage.setItem("token", token);
        return localStorage.getItem("token");
    },
);

export const getToken = createAsyncThunk(
    "auth/getToken",
    () => {
        return localStorage.getItem("token") || "";
    },
);

export const deleteToken = createAsyncThunk(
    "auth/deleteToken",
    () => {
        return localStorage.removeItem("token");
    },
);

export const getUserMarks = createAsyncThunk(
    "auth/getUserMarks",
    () => {
        return JSON.parse(localStorage.getItem("userMarks")) || {};
    }
)

export const setUserMark = createAsyncThunk(
    "auth/setUserMark",
    ({ movieId, mark }: { movieId: string, mark: number }) => {
        const marks = JSON.parse(localStorage.getItem("userMarks")) ?? {};
        marks[ movieId ] = mark;
        localStorage.setItem("userMarks", JSON.stringify(marks));
        return marks;
    }
);

export default authSlice.reducer;

export const { openModal, closeModal, updateName, updatePassword, clearForm } = authSlice.actions;

export const { selectIsAuthed, selectUserMarks, selectUserMarkById } = authSlice.selectors;