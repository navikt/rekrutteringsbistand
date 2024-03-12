import useNavKontor from 'felles/store/navKontor';
import { useContext, useEffect } from 'react';
import { useMeg } from '../../api/frackend/meg';
import { PAGE_SIZE } from '../api/query/byggQuery';
import { ØktContext } from '../Økt';
import useSøkekriterier from './useSøkekriterier';
import {
    KandidatsøkNavigeringProps,
    useKandidatsøkNavigering,
} from '../../api/kandidat-søk-api/kandidatsøk-navigering';

const useLagreØkt = () => {
    const navKontor = useNavKontor((state) => state.navKontor);
    const { navIdent } = useMeg();
    const innloggetBruker = navIdent ? { navKontor, navIdent } : undefined;
    const { setØkt } = useContext(ØktContext);
    const { søkekriterier } = useSøkekriterier();

    const kandidatsøkNavigeringProps: KandidatsøkNavigeringProps = {
        søkekriterier: {
            fritekst: søkekriterier.fritekst,
            portefølje: søkekriterier.portefølje,
            valgtKontor: søkekriterier.valgtKontor,
            orgenhet: navKontor,
            innsatsgruppe: søkekriterier.innsatsgruppe,
            ønsketYrke: søkekriterier.ønsketYrke,
            ønsketSted: søkekriterier.ønsketSted,
            borPåØnsketSted: søkekriterier.borPåØnsketSted,
            kompetanse: søkekriterier.kompetanse,
            førerkort: søkekriterier.førerkort,
            prioritertMålgruppe: søkekriterier.prioritertMålgruppe,
            hovedmål: søkekriterier.hovedmål,
            utdanningsnivå: søkekriterier.utdanningsnivå,
            arbeidserfaring: søkekriterier.arbeidserfaring,
            ferskhet: søkekriterier.ferskhet,
            språk: søkekriterier.språk,
        },
        side: søkekriterier.side,
        sortering: søkekriterier.sortering,
    };

    const { kandidatsøkKandidatNavigering, totalHits } = useKandidatsøkNavigering(
        kandidatsøkNavigeringProps
    );

    const deps = [
        søkekriterier.toString(),
        JSON.stringify(kandidatsøkKandidatNavigering),
        JSON.stringify(innloggetBruker),
        setØkt,
    ];
    useEffect(() => {
        const hentKandidatnumreForNavigering = async () => {
            try {
                if (kandidatsøkKandidatNavigering) {
                    setØkt({
                        searchParams: søkekriterier.toString(),
                        navigerbareKandidater: kandidatsøkKandidatNavigering,
                        totaltAntallKandidater: totalHits,
                        pageSize: PAGE_SIZE,
                    });
                }
            } catch (e) {
                console.error('Klarte ikke å hente navigerbare kandidater:', e);
            }
        };

        //@ts-ignore: TODO: written before strict-mode enabled
        if (innloggetBruker.navIdent && innloggetBruker.navKontor) {
            hentKandidatnumreForNavigering();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
};

export default useLagreØkt;
