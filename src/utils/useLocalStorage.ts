import {Dispatch, SetStateAction, useEffect, useState} from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>

export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
    const [value, setValue] = useState<T>(JSON.parse(<string>localStorage.getItem(key)) || initialValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    return [value, setValue];
}