import styles from "./styles.module.css";
import { useAppDispatch } from "@/entities/film/model";
import { openModal } from "@/entities/film/model/auth-slice";

export function LoginButton() {

    const dispatch = useAppDispatch();
    return (
        <button className={styles.loginBtn} onClick={() => dispatch(openModal())}>
            Войти
        </button>
    )
}