import {
    KandidatIKandidatliste,
    Kandidatutfall,
} from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import { FunctionComponent, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { ApplikasjonContext } from '../../../../../felles/ApplikasjonContext';
import KandidatlisteActionType from '../../../reducer/KandidatlisteActionType';
import FåttJobben from './FåttJobben';

type Props = {
    kanEndre: boolean;
    kandidatlisteId: string;
    kandidat: KandidatIKandidatliste;
};

const HarFåttJobben: FunctionComponent<Props> = ({ kanEndre, kandidatlisteId, kandidat }) => {
    const dispatch = useDispatch();
    const { valgtNavKontor } = useContext(ApplikasjonContext);

    const endreUtfallForKandidat = (nyttUtfall: Kandidatutfall) => {
        dispatch({
            kandidatlisteId,
            utfall: nyttUtfall,
            type: KandidatlisteActionType.EndreUtfallKandidat,
            navKontor: valgtNavKontor?.navKontor,
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
