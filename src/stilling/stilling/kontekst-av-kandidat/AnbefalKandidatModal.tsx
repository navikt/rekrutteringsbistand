import { Modal } from '@navikt/ds-react';
import { useDispatch } from 'react-redux';

import { KandidatTilBanner } from 'felles/domene/kandidat/Kandidat';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import BekreftMedNotat from '../../../felles/komponenter/legg-til-kandidat/BekreftMedNotat';
import { VarslingAction, VarslingActionType } from '../../common/varsling/varslingReducer';

type Props = {
    kandidat: KandidatTilBanner;
    kandidatlisteId: string;
    setKandidatliste: (kandidatliste: Nettressurs<Kandidatliste>) => void;
    vis: boolean;
    onClose: () => void;
};

const AnbefalKandidatModal = ({
    kandidat,
    kandidatlisteId,
    setKandidatliste,
    vis,
    onClose,
}: Props) => {
    const dispatch = useDispatch();

    const handleBekreft = () => {
        onClose();

        dispatch<VarslingAction>({
            type: VarslingActionType.VisVarsling,
            innhold: `Kandidat ${kandidat.fornavn} ${kandidat.etternavn} (${kandidat.fodselsnummer}) er anbefalt til stillingen`,
        });
    };

    const handleOppdatertKandidatliste = (kandidatliste: Kandidatliste) => {
        setKandidatliste({
            kind: Nettstatus.Suksess,
            data: kandidatliste,
        });
    };

    return (
        <Modal open={vis} onClose={onClose} header={{ heading: 'Anbefal kandidat' }}>
            <BekreftMedNotat
                erAnbefaling
                fnr={kandidat.fodselsnummer}
                kandidat={kandidat}
                kandidatlisteId={kandidatlisteId}
                onAvbryt={onClose}
                onOppdatertKandidatliste={handleOppdatertKandidatliste}
                onBekreft={handleBekreft}
            />
        </Modal>
    );
};

export default AnbefalKandidatModal;
