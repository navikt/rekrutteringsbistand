import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { søk } from '../api/api';
import { PAGE_SIZE, byggQuery } from '../api/query/byggQuery';
import { Respons } from '../kandidater/suggestQuery';
import { ØktContext } from '../Økt';
import { InnloggetBruker } from './useBrukerensIdent';
import { searchParamsTilSøkekriterier } from './useSøkekriterier';

const maksAntallNavigerbareKandidater = 500;

const useLagreØkt = (innloggetBruker: InnloggetBruker) => {
    const { setØkt } = useContext(ØktContext);
    const [navigerbareKandidater, setNavigerbareKandidater] = useState<Respons | undefined>();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const hentKandidatnumreForNavigering = async () => {
            const søkekriterier = searchParamsTilSøkekriterier(searchParams);
            const til = søkekriterier.side * PAGE_SIZE - maksAntallNavigerbareKandidater / 2;
            const from = Math.max(0, til);
            const size = maksAntallNavigerbareKandidater;
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
