import { Modal } from '@navikt/ds-react';
import { useDispatch } from 'react-redux';

import { KandidatTilBanner } from 'felles/domene/kandidat/Kandidat';
import BekreftMedNotat from '../../../felles/komponenter/legg-til-kandidat/BekreftMedNotat';
import { VarslingAction, VarslingActionType } from '../../common/varsling/varslingReducer';

type Props = {
    kandidat: KandidatTilBanner;
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
            <BekreftMedNotat
                erAnbefaling
                fnr={kandidat.fodselsnummer}
                kandidat={kandidat}
                kandidatlisteId={kandidatlisteId}
                onAvbryt={onClose}
                onBekreft={handleBekreft}
            />
        </Modal>
    );
};

export default AnbefalKandidatModal;
