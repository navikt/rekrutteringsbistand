import { useEffect, useState } from 'react';
import { Nettressurs, ikkeLastet, lasterInn, suksess, feil } from '../../api/Nettressurs';
import { fetchKandidatliste } from '../legg-til-kandidat-modal/kandidatApi';
import { Kandidatliste } from '../legg-til-kandidat-modal/kandidatlistetyper';

const useHentKandidatliste = (
    stillingsId?: string
): [Nettressurs<Kandidatliste>, (kandidatliste: Nettressurs<Kandidatliste>) => void] => {
    const [kandidatliste, setKandidatliste] = useState<Nettressurs<Kandidatliste>>(ikkeLastet());

    useEffect(() => {
        const hentKandidatliste = async (stillingsId: string) => {
            setKandidatliste(lasterInn());

            let kandidatliste: Nettressurs<Kandidatliste>;

            try {
                kandidatliste = suksess(await fetchKandidatliste(stillingsId));
            } catch (e) {
                kandidatliste = feil(e.message);
            }

            setKandidatliste(kandidatliste);
        };

        if (stillingsId) {
            hentKandidatliste(stillingsId);
        }
    }, [stillingsId]);

    return [kandidatliste, setKandidatliste];
};

export default useHentKandidatliste;
