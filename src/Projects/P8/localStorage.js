import { useEffect, useState } from "react";

const useLocalStorage = (key, initialState) => {
    const [value, setValue] = useState(() => {
        const localValue = window.localStorage.getItem(key);
        return localValue ? JSON.parse(localValue) : initialState;
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
};

export default useLocalStorage;
