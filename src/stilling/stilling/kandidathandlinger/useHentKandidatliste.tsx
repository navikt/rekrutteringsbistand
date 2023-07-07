import { useEffect, useState } from 'react';
import { fetchKandidatliste } from '../legg-til-kandidat-modal/kandidatApi';
import { Nettressurs, feil, ikkeLastet, lasterInn, suksess } from 'felles/nettressurs';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';

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
