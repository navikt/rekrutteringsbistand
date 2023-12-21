import React from 'react';

export function useLocalStorageToggle(key: string) {
    const [state, setState] = React.useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue !== null ? storedValue === 'true' : true;
    });

    const toggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setState(isChecked);
        localStorage.setItem(key, String(isChecked));
    };

    return [state, toggle] as const;
}
