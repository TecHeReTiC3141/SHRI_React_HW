import { Outlet } from "react-router-dom";

export function MainLayout() {
    return (
        <div className="main-layout">
            <Outlet />
        </div>
    );
}