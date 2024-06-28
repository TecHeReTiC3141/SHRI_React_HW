import { Outlet } from "react-router-dom";
import { Header } from "@/entities/header";
import { LoginButton } from "@/features/login-button";
import { RootState, useAppSelector } from "@/entities/film/model";
import { LoginForm } from "@/features/login-form";

export function MainLayout() {

    const token = useAppSelector((state: RootState) => state.auth.token);
    const isModalVisible = useAppSelector((state: RootState) => state.auth.isLoginModalVisible);
    console.log(token);
    return (
        <div className="main-layout">
            <Header action={<LoginButton />} isAuthed={token !== ""}/>
            <Outlet />
            {isModalVisible && <LoginForm />}
        </div>
    );
}