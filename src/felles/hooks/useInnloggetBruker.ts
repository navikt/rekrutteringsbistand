import { api } from 'felles/api';
import { useEffect, useState } from 'react';

export type InnloggetBruker = {
    navIdent: string | null;
    navKontor: string | null;
};

const useInnloggetBruker = (navKontor: string | null): InnloggetBruker => {
    const [navIdent, setNavIdent] = useState<string | null>(null);

    useEffect(() => {
        const hentNavIdent = async () => {
            const response = await fetch(api.innloggetBruker, { credentials: 'include' });
            const { navIdent } = await response.json();

            setNavIdent(navIdent);
        };

        hentNavIdent();
    }, []);

    return {
        navIdent,
        navKontor,
    };
};

export default useInnloggetBruker;
