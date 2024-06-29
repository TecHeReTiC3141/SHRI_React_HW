import { ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.css";

interface ModalProps {
    children: ReactNode;
}

export function Modal({children}: ModalProps) {

    // TODO: when backdrop is clicked, close the modal
    return createPortal(
        <>
            <div className={styles.modalBackdrop} />
            <div className={styles.modal}>
                {children}
            </div>
        </>, document.body);
}