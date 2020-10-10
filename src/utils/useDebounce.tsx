// credit to https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
import { useState, useEffect } from 'react';

export function useDebounce(value: any, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
        () => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay]
    );

    return debouncedValue;
}