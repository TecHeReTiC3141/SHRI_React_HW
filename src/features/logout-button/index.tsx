import styles from "./styles.module.css";
import { useAppDispatch } from "@/entities/film/model";
import { deleteToken } from "@/entities/film/model/auth-slice";

export function LogoutButton() {

    const dispatch = useAppDispatch();
    return (
        <button className={styles.logoutBtn} onClick={() => dispatch(deleteToken())}>
            Выйти
        </button>
    )
}