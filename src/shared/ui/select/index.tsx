import styles from "./styles.module.css";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp } from "@/shared/ui/icons";
import classNames from "classnames";


interface SelectFieldProps {
    name: string;
    labelText: string;
    value: string;
    options: { value: string; label: string }[];
    onSelect: (value: string) => void;
    placeholder: string,
}

export function SelectField({ name, labelText, options, value, onSelect, placeholder }: SelectFieldProps) {

    console.log(options);

    const [ isOpened, setIsOpened ] = useState<boolean>(false);
    const selectRef = useRef<HTMLDivElement | null>(null);

    const handleOptionClick = (optionValue: string) => {
        onSelect(optionValue);
        setIsOpened(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current?.contains(event.target as Node)) {
            setIsOpened(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div className={styles.selectContainer} ref={selectRef}>
            <label htmlFor={name} className={styles.selectLabel}>{labelText}</label>
            <div className={classNames(styles.selectField, isOpened && styles.focused)} onClick={() => setIsOpened(!isOpened)}>
                <div>{(value !== "0" && options.find(option => option.value === value)?.label) || <span className={styles.placeholder}>{placeholder}</span>}</div>
                <span className={styles.actionButton}>
                    {isOpened ? <ArrowUp width={18} height={18}/> : <ArrowDown width={18} height={18}/>}
                </span>
            </div>
            {isOpened && (
                <ul className={styles.optionsList}>
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={styles.optionItem}
                            onClick={() => handleOptionClick(option.value)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>

    );
}