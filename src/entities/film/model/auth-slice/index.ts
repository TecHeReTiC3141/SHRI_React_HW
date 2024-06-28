import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
    token: string;
    authError: string;
    isLoginModalVisible: boolean;
    nameField: string;
    passwordField: string;

}

const initialState: AuthState = {
    token: "",
    authError: "",
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
        selectError: (sliceState: AuthState) => sliceState.authError,
    },
    extraReducers: builder => builder
        .addCase(createToken.fulfilled, (state, { payload }) => {
            state.token = payload;
        }).addCase(getToken.fulfilled, (state, { payload }) => {
            state.token = payload;
        }).addCase(deleteToken.fulfilled, (state) => {
            state.token = "";
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
        return localStorage.getItem("token");
    },
);

export const deleteToken = createAsyncThunk(
    "auth/deleteToken",
    () => {
        return localStorage.removeItem("token");
    },
);

export default authSlice.reducer;

export const { openModal, closeModal, updateName, updatePassword, clearForm } = authSlice.actions;