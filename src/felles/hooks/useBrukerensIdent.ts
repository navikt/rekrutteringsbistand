import { api } from 'felles/api';
import { useEffect, useState } from 'react';

const get = (url: string) =>
    fetch(url, {
        method: 'GET',
        credentials: 'include',
    });

const useInnloggetBruker = (): string => {
    const [navIdent, setNavIdent] = useState<string | null>(null);

    useEffect(() => {
        const hentNavIdent = async () => {
            const response = await get(api.innloggetBruker);
            const { navIdent } = await response.json();

            setNavIdent(navIdent);
        };

        hentNavIdent();
    }, []);

    return navIdent;
};

export default useInnloggetBruker;
