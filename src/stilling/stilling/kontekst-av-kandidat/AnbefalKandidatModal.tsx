import { Heading } from '@navikt/ds-react';

import BekreftMedNotat from '../../../felles/komponenter/legg-til-kandidat/BekreftMedNotat';
import Modal from '../../common/modal/Modal';
import { ForenkletKandidatISøk } from 'felles/domene/kandidat-i-søk/KandidatISøk';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import { Nettressurs } from 'felles/nettressurs';
import { useDispatch } from 'react-redux';
import { VarslingAction, VarslingActionType } from '../../common/varsling/varslingReducer';

type Props = {
    fnr: string;
    kandidat: ForenkletKandidatISøk;
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

    const varsleKandidatlisteOmNyKandidat = () => {
        onClose();

        dispatch<VarslingAction>({
            type: VarslingActionType.VisVarsling,
            innhold: `Kandidat ${kandidat.fornavn} ${kandidat.etternavn} (${fnr}) er anbefalt til stillingen`,
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
                onOppdatertKandidatliste={setKandidatliste}
                onAvbryt={onClose}
                onBekreft={varsleKandidatlisteOmNyKandidat}
            />
        </Modal>
    );
};

export default AnbefalKandidatModal;
