import { useSelector } from 'react-redux';
import AppState from '../../state/AppState';
import { KandidatIKandidatliste } from 'felles/domene/kandidatliste/KandidatIKandidatliste';

const useMarkerteKandidater = (kandidater: KandidatIKandidatliste[]) => {
    const { kandidattilstander } = useSelector((state: AppState) => state.kandidatliste);

    return kandidater.filter((kandidat) => kandidattilstander[kandidat.kandidatnr]?.markert);
};

export default useMarkerteKandidater;
