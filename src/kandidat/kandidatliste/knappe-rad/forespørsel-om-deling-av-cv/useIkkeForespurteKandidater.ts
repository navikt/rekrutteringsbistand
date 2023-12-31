import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Nettstatus } from 'felles/nettressurs';
import { KandidatIKandidatliste } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import AppState from '../../../state/AppState';

const useIkkeForespurteKandidater = (
    markerteKandidater: KandidatIKandidatliste[]
): KandidatIKandidatliste[] => {
    const [ikkeForespurteKandidater, setIkkeForespurteKandidater] = useState<
        KandidatIKandidatliste[]
    >([]);

    const { forespørslerOmDelingAvCv } = useSelector((state: AppState) => state.kandidatliste);

    useEffect(() => {
        if (forespørslerOmDelingAvCv.kind !== Nettstatus.Suksess) {
            setIkkeForespurteKandidater([]);
        } else {
            if (forespørslerOmDelingAvCv.kind === Nettstatus.Suksess) {
                const ikkeForespurteKandidater = Object.keys(forespørslerOmDelingAvCv.data);
                const markerte = markerteKandidater.filter(
                    (kandidat) => !ikkeForespurteKandidater.includes(kandidat.aktørid!)
                );

                setIkkeForespurteKandidater(markerte);
            }
        }
    }, [markerteKandidater, forespørslerOmDelingAvCv]);

    return ikkeForespurteKandidater;
};

export default useIkkeForespurteKandidater;
