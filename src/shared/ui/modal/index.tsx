import { ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.css";

interface ModalProps {
    children: ReactNode;
    closeModal: () => void;
}

export function Modal({ children, closeModal }: ModalProps) {

    return createPortal(
        <>
            <div className={styles.modalBackdrop} onClick={closeModal}/>
            <div className={styles.modal} onClick={event => event.stopPropagation()}>
                {children}
            </div>
        </>, document.body);
}