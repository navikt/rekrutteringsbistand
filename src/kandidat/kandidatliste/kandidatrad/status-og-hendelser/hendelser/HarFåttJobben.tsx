import {
    KandidatIKandidatliste,
    Kandidatutfall,
} from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import useNavKontor from 'felles/store/navKontor';
import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import KandidatlisteActionType from '../../../reducer/KandidatlisteActionType';
import FåttJobben from './FåttJobben';

type Props = {
    kanEndre: boolean;
    kandidatlisteId: string;
    kandidat: KandidatIKandidatliste;
};

const HarFåttJobben: FunctionComponent<Props> = ({ kanEndre, kandidatlisteId, kandidat }) => {
    const dispatch = useDispatch();
    const valgtNavKontor = useNavKontor((state) => state.navKontor);

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
