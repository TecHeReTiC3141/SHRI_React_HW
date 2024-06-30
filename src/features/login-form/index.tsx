import { Modal } from "@/shared/ui/modal";

import styles from "./styles.module.css";
import { useAppDispatch, useAppSelector } from "@/entities/film/model";
import { clearForm, closeModal, createToken, updateName, updatePassword } from "@/entities/film/model/auth-slice";
import { Xmark } from "@/shared/ui/icons";
import { FormEvent } from "react";
import { LoginResponse, useLoginMutation } from "@/entities/film/model/api-slice";

export function LoginForm() {
    const dispatch = useAppDispatch();

    const [ login ] = useLoginMutation();

    const username = useAppSelector((state) => state.auth.nameField);
    const password = useAppSelector((state) => state.auth.passwordField);

    function closeForm() {
        dispatch(clearForm());
        dispatch(closeModal());
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const response: LoginResponse = await login({
                username,
                password,
            }).unwrap();
            console.log(response);
            if (response.token) {
                dispatch(createToken(response.token));
                closeForm();
            } else {
                console.error(response.error);
            }

            // TODO: implement proper error handling
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Modal closeModal={closeForm}>
            <form action="" onSubmit={handleSubmit} method="POST" className={styles.loginForm}>
                <div className={styles.header}>

                    <h3 className={styles.title}>Авторизация</h3>
                    <button className={styles.closeButton} onClick={event => {
                        event.preventDefault();
                        closeForm();
                    }}>
                        <Xmark width={16} height={16}/>
                    </button>
                </div>
                <label htmlFor="name" className={styles.inputLabel}>Логин
                </label>
                <input type="text" name="name" id="name" placeholder="Введите имя" value={username} onChange={event => {
                    const newValue = event.currentTarget.value;
                    dispatch(updateName(newValue));
                }}/>
                <label htmlFor="password" className={styles.inputLabel}>Пароль
                </label>
                <input type="password" name="password" id="password" placeholder="Введите пароль" value={password}
                       onChange={event => {
                           const newValue = event.currentTarget.value;
                           dispatch(updatePassword(newValue));
                       }}/>
                <div className={styles.actions}>
                    <button className={styles.loginButton}>Войти</button>
                    <button className={styles.cancelButton} onClick={event => {
                        event.preventDefault();
                        closeForm();
                    }}>Отменить
                    </button>
                </div>
            </form>
        </Modal>
    )
}