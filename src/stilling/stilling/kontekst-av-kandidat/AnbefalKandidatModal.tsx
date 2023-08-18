import { Heading } from '@navikt/ds-react';
import { useDispatch } from 'react-redux';

import { KandidatTilBanner } from 'felles/domene/kandidat/Kandidat';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import BekreftMedNotat from '../../../felles/komponenter/legg-til-kandidat/BekreftMedNotat';
import Modal from '../../common/modal/Modal';
import { VarslingAction, VarslingActionType } from '../../common/varsling/varslingReducer';

type Props = {
    kandidat: KandidatTilBanner;
    kandidatliste: Kandidatliste;
    setKandidatliste: (kandidatliste: Nettressurs<Kandidatliste>) => void;
    vis: boolean;
    onClose: () => void;
};

const AnbefalKandidatModal = ({
    kandidat,
    kandidatliste,
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
        <Modal open={vis} onClose={onClose}>
            <Heading level="2" size="medium">
                Anbefal kandidat
            </Heading>
            <BekreftMedNotat
                erAnbefaling
                fnr={kandidat.fodselsnummer}
                kandidat={kandidat}
                kandidatliste={kandidatliste}
                onAvbryt={onClose}
                onOppdatertKandidatliste={handleOppdatertKandidatliste}
                onBekreft={handleBekreft}
            />
        </Modal>
    );
};

export default AnbefalKandidatModal;
