import styles from "./styles.module.css";
import { LoadingSpinner } from "@/shared/ui/icons";

export function Loading() {
    return <div className={styles.loading}>
        <div className={styles.loadingSpinner}>

            <LoadingSpinner width={48} height={48}/>
        </div>
    </div>;
}