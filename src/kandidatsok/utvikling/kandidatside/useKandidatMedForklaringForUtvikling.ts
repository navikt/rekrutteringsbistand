import Kandidat from 'felles/domene/kandidat/Kandidat';
import { useEffect, useState } from 'react';
import useInnloggetBruker from '../../../api/frackend/hooks/useInnloggetBruker';
import { get, post } from '../../api/api';
import { byggIndreQuery } from '../../api/query/byggQuery';
import { searchParamsTilSøkekriterier } from '../../hooks/useSøkekriterier';

const useKandidatMedForklaringForUtvikling = (
    kandidatNr: string | undefined,
    navKontor: string | null,
    searchParams: string | undefined
) => {
    const [kandidat, setKandidat] = useState<Kandidat | null>(null);
    const [forklaring, setForklaring] = useState<any>(null);

    const innloggetBruker = useInnloggetBruker(navKontor);

    const søkekriterier = searchParamsTilSøkekriterier(new URLSearchParams(searchParams));
    const bruktSøk = {
        query: byggIndreQuery(søkekriterier, innloggetBruker.bruker),
    };

    useEffect(() => {
        const hentKandidat = async () => {
            const kandidatRespons = await get(`/kandidatsok-hent-kandidat/${kandidatNr}`);
            const kandidat = ((await kandidatRespons.json()) as any)._source;

            setKandidat(kandidat);
        };

        const hentForklaring = async () => {
            const forklaringRespons = await post(
                `/kandidatsok-hent-forklaring/${kandidatNr}`,
                bruktSøk
            );

            const forklaring = ((await forklaringRespons.json()) as any).explanation;

            setForklaring(forklaring);
        };

        hentKandidat();

        if (searchParams) {
            hentForklaring();
        }

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [kandidatNr]);

    return {
        kandidat,
        forklaring,
    };
};

export default useKandidatMedForklaringForUtvikling;
