import { Outlet } from "react-router-dom";
import { Header } from "@/entities/header";

export function MainLayout() {
    return (
        <div className="main-layout">
            <Header action={<div>Action</div>}/>
            <Outlet />
        </div>
    );
}