import React from "react";

interface HeaderProps {
    action: React.ReactNode;

}

export function Header({action}: HeaderProps) {
    return (
        <header>
            <h1>Header</h1>
            {action}
        </header>
    );
}