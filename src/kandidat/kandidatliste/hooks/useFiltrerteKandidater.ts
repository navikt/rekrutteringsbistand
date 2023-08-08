import { useSelector } from 'react-redux';
import { KandidatIKandidatliste } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import AppState from '../../state/AppState';

const useFiltrerteKandidater = (kandidater: KandidatIKandidatliste[]) => {
    const { kandidattilstander } = useSelector((state: AppState) => state.kandidatliste);

    const filtrerteKandidater = kandidater.filter(
        (kandidat) => !kandidattilstander[kandidat.kandidatnr]?.filtrertBort
    );

    return filtrerteKandidater;
};

export default useFiltrerteKandidater;
