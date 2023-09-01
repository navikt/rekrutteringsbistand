import {
    KandidatIKandidatliste,
    Kandidatutfall,
} from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import useNavKontor from 'felles/store/navKontor';
import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
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
