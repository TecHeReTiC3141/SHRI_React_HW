import styles from "./styles.module.css";
import { ReactNode, useRef, useState } from "react";
import { ArrowDown, ArrowUp } from "@/shared/ui/icons";


interface SelectFieldProps {
    name: string;
    labelText: string;
    value: string;
    options: ReactNode;
    onSelect: (value: string) => void;
}

export function SelectField({ name, labelText, options, value, onSelect }: SelectFieldProps) {
    console.log(name, value);
    const [ isOpened, setIsOpened ] = useState<boolean>(false);
    const selectRef = useRef<HTMLSelectElement | null>(null);
    // TODO: implement styling for select options
    return (
        <div style={{ position: "relative" }}>
            <label htmlFor={name} className={styles.selectLabel}>{labelText}</label>
            <select name={name} id={name} className={styles.selectField} value={value}
                    onFocus={() => setIsOpened(true)}
                    onBlur={() => setIsOpened(false)} ref={selectRef}
                    onChange={event => {
                        event.currentTarget.blur();
                        onSelect(event.currentTarget?.value);

            }}>
                {options}
            </select>
            <span className={styles.actionButton}>
                    {isOpened ? <ArrowUp width={18} height={18}/> : <ArrowDown width={18} height={18}/>}
            </span>
        </div>
    )
}