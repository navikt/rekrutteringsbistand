import { useEffect } from 'react';

const useDebouncedEffect = (effect: () => void, deps: any[], delay = 200) => {
    useEffect(() => {
        const handler = setTimeout(() => effect(), delay);

        return () => clearTimeout(handler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps, delay]);
};

export default useDebouncedEffect;
