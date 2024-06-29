import styles from "./styles.module.css"

export function NoFilmsFound() {
    return (
        <div className={styles.notFound}>
            <h4 className={styles.title}>Фильмы не найдены</h4>
            <p className={styles.description}>Измените запрос и попробуйте снова</p>
        </div>
    )
}