import { useSelector } from 'react-redux';
import AppState from '../../state/AppState';
import { Kandidat } from 'felles/domene/kandidatliste/KandidatIKandidatliste';

const useMarkerteKandidater = (kandidater: Kandidat[]) => {
    const { kandidattilstander } = useSelector((state: AppState) => state.kandidatliste);

    return kandidater.filter((kandidat) => kandidattilstander[kandidat.kandidatnr]?.markert);
};

export default useMarkerteKandidater;
