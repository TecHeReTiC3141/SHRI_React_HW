import { Outlet } from "react-router-dom";
import { Header } from "@/entities/header";
import { LoginButton } from "@/features/login-button";
import { RootState, useAppDispatch, useAppSelector } from "@/entities/film/model";
import { LoginForm } from "@/features/login-form";
import { useEffect } from "react";
import { getToken, selectIsAuthed } from "@/entities/film/model/auth-slice";
import { Logout } from "@/entities/header/logout";
import { LogoutButton } from "@/features/logout-button";
import styles from "./styles.module.css";
import classNames from "classnames";

export function MainLayout() {

    const dispatch = useAppDispatch();

    const token = useAppSelector((state: RootState) => state.auth.token);
    const isAuthed: boolean = useAppSelector(selectIsAuthed);
    const isModalVisible = useAppSelector((state: RootState) => state.auth.isLoginModalVisible);

    useEffect(() => {
        dispatch(getToken());
    }, [dispatch]);

    console.log(token);
    return (
        <div className={classNames(isModalVisible && styles.modalOpened)}>
            <Header action={isAuthed ? <Logout action={<LogoutButton />} /> : <LoginButton />} isAuthed={isAuthed}/>
            <Outlet />
            {isModalVisible && <LoginForm />}
        </div>
    );
}