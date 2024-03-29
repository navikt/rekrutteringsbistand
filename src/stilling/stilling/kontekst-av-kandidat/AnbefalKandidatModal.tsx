import { Modal } from '@navikt/ds-react';
import { useDispatch } from 'react-redux';

import { Kandidatsammendrag } from '../../../api/kandidat-søk-api/kandidatsammendrag';
import BekreftLeggTilKandidat from '../../../felles/komponenter/legg-til-kandidat/BekreftLeggTilKandidat';
import { VarslingAction, VarslingActionType } from '../../common/varsling/varslingReducer';

type Props = {
    kandidat: Kandidatsammendrag;
    kandidatlisteId: string;
    vis: boolean;
    onClose: () => void;
};

const AnbefalKandidatModal = ({ kandidat, kandidatlisteId, vis, onClose }: Props) => {
    const dispatch = useDispatch();

    const handleBekreft = () => {
        onClose();

        dispatch<VarslingAction>({
            type: VarslingActionType.VisVarsling,
            innhold: `Kandidat ${kandidat.fornavn} ${kandidat.etternavn} (${kandidat.fodselsnummer}) er anbefalt til stillingen`,
        });
    };

    return (
        <Modal open={vis} onClose={onClose} header={{ heading: 'Anbefal kandidat' }}>
            <BekreftLeggTilKandidat
                erAnbefaling
                kandidatnr={kandidat.arenaKandidatnr}
                kandidatlisteId={kandidatlisteId}
                onAvbryt={onClose}
                onBekreft={handleBekreft}
            />
        </Modal>
    );
};

export default AnbefalKandidatModal;
