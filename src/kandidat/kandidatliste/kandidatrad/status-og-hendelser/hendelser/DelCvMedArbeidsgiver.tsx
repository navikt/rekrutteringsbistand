import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Kandidat, Kandidatutfall } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import AppState from '../../../../state/AppState';
import KandidatlisteActionType from '../../../reducer/KandidatlisteActionType';
import DelingAvCv from './DelingAvCv';
import KandidatlisteAction from '../../../reducer/KandidatlisteAction';

type Props = {
    kanEndre: boolean;
    kandidatlisteId: string;
    kandidat: Kandidat;
};

const DelCvMedArbeidsgiver: FunctionComponent<Props> = ({
    kanEndre,
    kandidatlisteId,
    kandidat,
}) => {
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

    const slettCv = () => {
        dispatch<KandidatlisteAction>({
            type: KandidatlisteActionType.SlettCvFraArbeidsgiversKandidatliste,
            kandidatlisteId,
            kandidatnr: kandidat.kandidatnr,
            navKontor: valgtNavKontor,
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
