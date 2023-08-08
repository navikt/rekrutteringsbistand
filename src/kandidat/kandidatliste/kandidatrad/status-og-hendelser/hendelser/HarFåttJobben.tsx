import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppState from '../../../../state/AppState';
import KandidatlisteActionType from '../../../reducer/KandidatlisteActionType';
import FåttJobben from './FåttJobben';
import {
    KandidatIKandidatliste,
    Kandidatutfall,
} from 'felles/domene/kandidatliste/KandidatIKandidatliste';

type Props = {
    kanEndre: boolean;
    kandidatlisteId: string;
    kandidat: KandidatIKandidatliste;
};

const HarFåttJobben: FunctionComponent<Props> = ({ kanEndre, kandidatlisteId, kandidat }) => {
    const dispatch = useDispatch();
    const valgtNavKontor = useSelector((state: AppState) => state.navKontor.valgtNavKontor);

    const endreUtfallForKandidat = (nyttUtfall: Kandidatutfall) => {
        dispatch({
            kandidatlisteId,
            utfall: nyttUtfall,
            type: KandidatlisteActionType.EndreUtfallKandidat,
            navKontor: valgtNavKontor,
            kandidatnr: kandidat.kandidatnr,
        });
    };

    return (
        <FåttJobben
            kanEndre={kanEndre}
            navn={`${kandidat.fornavn} ${kandidat.etternavn}`}
            utfall={kandidat.utfall}
            utfallsendringer={kandidat.utfallsendringer}
            onEndreUtfall={endreUtfallForKandidat}
        />
    );
};

export default HarFåttJobben;
