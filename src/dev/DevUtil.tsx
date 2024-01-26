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

export const devFnr = {
    ok: '28125314475',
    finnesIkke: '01098902216',
    ingentreff: '22078738700',
};
