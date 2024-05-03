import { KandidatIKandidatliste } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import { Nettstatus } from 'felles/nettressurs';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AppState from '../../../state/AppState';

const useIkkeForespurteKandidater = (
    markerteKandidater: KandidatIKandidatliste[]
): KandidatIKandidatliste[] => {
    const [ikkeForespurteKandidater, setIkkeForespurteKandidater] = useState<
        KandidatIKandidatliste[]
    >([]);

    const { forespørslerOmDelingAvCv } = useSelector((state: AppState) => state.kandidatliste);

    useEffect(() => {
        //TODO:  Denne burde endres. Hvis kallet feiler, så sett den ikke forespurte kandidater til tom liste, dvs at man får melding om at alle har fått delt stillingen, når det egentlig ikke er tilfelle på grunn at nettstatus er ikke suksess.
        if (forespørslerOmDelingAvCv.kind !== Nettstatus.Suksess) {
            // TODO: Endrer fra å sette til tom liste til å sette til markerte kandidater.
            setIkkeForespurteKandidater(markerteKandidater);
        } else {
            //Todo: hehe if.
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
