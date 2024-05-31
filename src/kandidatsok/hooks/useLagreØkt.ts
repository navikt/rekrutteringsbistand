import useNavKontor from 'felles/store/navKontor';
import { useContext, useEffect } from 'react';
import { useMeg } from '../../api/frackend/meg';
import { ØktContext } from '../Økt';
import useSøkekriterier from './useSøkekriterier';

import { PAGE_SIZE } from '../filter/Paginering';
import { KandidatSøkContext } from '../KandidatSøkContext';

const useLagreØkt = () => {
    const navKontor = useNavKontor((state) => state.navKontor);
    const { navIdent } = useMeg();
    const innloggetBruker = navIdent ? { navKontor, navIdent } : undefined;
    const { setØkt } = useContext(ØktContext);
    const { søkekriterier } = useSøkekriterier();

    const { kandidatSøk } = useContext(KandidatSøkContext);

    const kandidatsøkKandidatNavigering = kandidatSøk?.navigering.kandidatnumre;
    const totalHits = kandidatSøk?.antallTotalt;

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
