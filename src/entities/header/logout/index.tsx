import { User } from "@/shared/ui/icons";
import { ReactNode } from "react";

import styles from "./styles.module.css";

interface LogoutProps {
    action: ReactNode,
}


export function Logout({action}: LogoutProps) {
    return (
        <div className={styles.logout}>
            <div className={styles.avatar}>
                <User width={24} height={24} />
            </div>
            {action}
        </div>
    );
}