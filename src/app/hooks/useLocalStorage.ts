import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) : [T, (value: T) => void] => {

    const [storedValue, setStoredValue] = useState<T>(initialValue);

    useEffect(() => {
        const value = window.localStorage.getItem(key);

        if (value) {
            setStoredValue(JSON.parse(value));
        }
    }, [key])

    const setValue = (value: T): void => {
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    return [storedValue, setValue];
};