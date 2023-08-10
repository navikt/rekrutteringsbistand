import { Heading } from '@navikt/ds-react';
import { useDispatch } from 'react-redux';

import Kandidat from 'felles/domene/kandidat/Kandidat';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { VarslingAction, VarslingActionType } from '../../common/varsling/varslingReducer';
import BekreftMedNotat from '../../../felles/komponenter/legg-til-kandidat/BekreftMedNotat';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import Modal from '../../common/modal/Modal';

type Props = {
    fnr: string;
    kandidat: Kandidat;
    kandidatliste: Kandidatliste;
    setKandidatliste: (kandidatliste: Nettressurs<Kandidatliste>) => void;
    vis: boolean;
    onClose: () => void;
};

const AnbefalKandidatModal = ({
    fnr,
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
            innhold: `Kandidat ${kandidat.fornavn} ${kandidat.etternavn} (${fnr}) er anbefalt til stillingen`,
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
                fnr={fnr}
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
