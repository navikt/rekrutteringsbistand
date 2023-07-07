import { useSelector } from 'react-redux';
import { Kandidat } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import AppState from '../../state/AppState';

const useFiltrerteKandidater = (kandidater: Kandidat[]) => {
    const { kandidattilstander } = useSelector((state: AppState) => state.kandidatliste);

    const filtrerteKandidater = kandidater.filter(
        (kandidat) => !kandidattilstander[kandidat.kandidatnr]?.filtrertBort
    );

    return filtrerteKandidater;
};

export default useFiltrerteKandidater;
