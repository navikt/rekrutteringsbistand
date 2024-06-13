import {
    KandidatIKandidatliste,
    Kandidatutfall,
} from 'felles/domene/kandidatliste/KandidatIKandidatliste';

import { FunctionComponent, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { ApplikasjonContext } from '../../../../../felles/ApplikasjonContext';
import KandidatlisteAction from '../../../reducer/KandidatlisteAction';
import KandidatlisteActionType from '../../../reducer/KandidatlisteActionType';
import DelingAvCv from './DelingAvCv';

type Props = {
    kanEndre: boolean;
    kandidatlisteId: string;
    kandidat: KandidatIKandidatliste;
};

const DelCvMedArbeidsgiver: FunctionComponent<Props> = ({
    kanEndre,
    kandidatlisteId,
    kandidat,
}) => {
    const dispatch = useDispatch();
    const { valgtNavKontor } = useContext(ApplikasjonContext);

    const endreUtfallForKandidat = (nyttUtfall: Kandidatutfall) => {
        dispatch({
            kandidatlisteId,
            utfall: nyttUtfall,
            type: KandidatlisteActionType.EndreUtfallKandidat,
            navKontor: valgtNavKontor?.navKontor ?? null,
            kandidatnr: kandidat.kandidatnr,
        });
    };

    const slettCv = () => {
        dispatch<KandidatlisteAction>({
            type: KandidatlisteActionType.SlettCvFraArbeidsgiversKandidatliste,
            kandidatlisteId,
            kandidatnr: kandidat.kandidatnr,
            navKontor: valgtNavKontor?.navKontor ?? null,
        });
    };

    return (
        <DelingAvCv
            utfall={kandidat.utfall}
            utfallsendringer={kandidat.utfallsendringer}
            kanEndre={kanEndre}
            onEndreUtfall={endreUtfallForKandidat}
            onSlettCv={slettCv}
        />
    );
};

export default DelCvMedArbeidsgiver;
