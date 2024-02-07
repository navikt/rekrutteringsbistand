import { EsResponse } from 'felles/domene/elastic/ElasticSearch';
import Kandidat, { KandidatTilKandidatsøk } from 'felles/domene/kandidat/Kandidat';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { useEffect, useState } from 'react';
import { søk } from '../api/api';
import { byggQuery } from '../api/query/byggQuery';
import { målQuery } from '../api/query/målQuery';
import useSøkekriterier from './useSøkekriterier';
import useNavKontor from 'felles/store/navKontor';
import useInnloggetBruker from '../../api/frackend/hooks/useInnloggetBruker';

export enum FilterParam {
    Fritekst = 'q',
    Side = 'side',
    Portefølje = 'portefolje',
    ValgtKontor = 'kontor',
    Innsatsgruppe = 'innsatsgruppe',
    ØnsketYrke = 'yrke',
    ØnsketSted = 'sted',
    BorPåØnsketSted = 'borDer',
    Kompetanse = 'kompetanse',
    Førerkort = 'forerkort',
    PrioritertMålgruppe = 'malgruppe',
    Hovedmål = 'hovedmal',
    Utdanningsnivå = 'utdanning',
    Arbeidserfaring = 'arbeidserfaring',
    Ferskhet = 'ferskhet',
    Språk = 'sprak',
    Sortering = 'sortering',
}

const useQuery = (): Nettressurs<EsResponse<KandidatTilKandidatsøk>> => {
    const navKontor = useNavKontor((state) => state.navKontor);
    const { navIdent } = useInnloggetBruker();
    const innloggetBruker = navIdent ? { navKontor, navIdent } : undefined;

    const { søkekriterier } = useSøkekriterier();
    const [response, setResponse] = useState<Nettressurs<EsResponse<Kandidat>>>({
        kind: Nettstatus.IkkeLastet,
    });

    // @ts-ignore TODO: written before strict-mode enabled
    const query = byggQuery(søkekriterier, innloggetBruker);

    const setOpptatt = () => {
        setResponse(
            response.kind === Nettstatus.Suksess
                ? {
                      kind: Nettstatus.Oppdaterer,
                      data: response.data,
                  }
                : {
                      kind: Nettstatus.LasterInn,
                  }
        );
    };

    useEffect(() => {
        målQuery(søkekriterier);

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [JSON.stringify(query)]);

    useEffect(() => {
        const hentKandidater = async () => {
            setOpptatt();

            try {
                let søkeresultat = await søk(query);

                setResponse({
                    kind: Nettstatus.Suksess,
                    data: søkeresultat,
                });
            } catch (e) {
                setResponse({
                    kind: Nettstatus.Feil,
                    error: { status: (e as Response).status, message: (e as Response).statusText },
                });
            }
        };

        hentKandidater();

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [JSON.stringify(query)]);

    return response;
};

export default useQuery;
