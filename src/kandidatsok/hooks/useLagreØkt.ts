import { EsResponse } from 'felles/domene/elastic/ElasticSearch';
import Kandidat from 'felles/domene/kandidat/Kandidat';
import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { søk } from '../api/api';
import { PAGE_SIZE, byggQuery } from '../api/query/byggQuery';
import { ØktContext } from '../Økt';
import { searchParamsTilSøkekriterier } from './useSøkekriterier';
import useNavKontor from 'felles/store/navKontor';
import useInnloggetBruker from '../../api/frackend/hooks/useInnloggetBruker';

const maksAntallNavigerbareKandidater = 500;

const useLagreØkt = () => {
    const navKontor = useNavKontor((state) => state.navKontor);
    const { navIdent } = useInnloggetBruker();
    const innloggetBruker = navIdent ? { navKontor, navIdent } : undefined;
    const { setØkt } = useContext(ØktContext);
    const [navigerbareKandidater, setNavigerbareKandidater] = useState<
        EsResponse<Kandidat> | undefined
    >();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const hentKandidatnumreForNavigering = async () => {
            const søkekriterier = searchParamsTilSøkekriterier(searchParams);
            const til = søkekriterier.side * PAGE_SIZE - maksAntallNavigerbareKandidater / 2;
            const from = Math.max(0, til);
            const size = maksAntallNavigerbareKandidater;
            //@ts-ignore: TODO: written before strict-mode enabled
            const query = byggQuery(søkekriterier, innloggetBruker);
            const queryNavigerbareKandidater = {
                ...query,
                from,
                size,
                _source: false,
            };

            try {
                setNavigerbareKandidater(await søk(queryNavigerbareKandidater));
            } catch (e) {
                console.error('Klarte ikke å hente navigerbare kandidater:', e);
            }
        };

        //@ts-ignore: TODO: written before strict-mode enabled
        if (innloggetBruker.navIdent && innloggetBruker.navKontor) {
            hentKandidatnumreForNavigering();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams.toString(), JSON.stringify(innloggetBruker)]);

    useEffect(() => {
        if (navigerbareKandidater) {
            setØkt({
                searchParams: searchParams.toString(),
                navigerbareKandidater: navigerbareKandidater.hits.hits.map((hit) => hit._id),
                totaltAntallKandidater: navigerbareKandidater.hits.total.value,
                pageSize: PAGE_SIZE,
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigerbareKandidater]);
};

export default useLagreØkt;
