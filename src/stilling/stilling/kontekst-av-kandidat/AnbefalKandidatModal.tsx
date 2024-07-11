import { Modal } from '@navikt/ds-react';

import { Kandidatsammendrag } from '../../../api/kandidat-søk-api/kandidatsammendrag';
import BekreftLeggTilKandidat from '../../../felles/komponenter/legg-til-kandidat/BekreftLeggTilKandidat';
import { useVisVarsling } from 'felles/varsling/Varsling';

type Props = {
    kandidat: Kandidatsammendrag;
    stillingId: string;
    vis: boolean;
    onClose: () => void;
};

const AnbefalKandidatModal = ({ kandidat, stillingId, vis, onClose }: Props) => {
    const visVarsling = useVisVarsling();

    const handleBekreft = () => {
        onClose();
        visVarsling({
            innhold: `Kandidat ${kandidat.fornavn} ${kandidat.etternavn} (${kandidat.fodselsnummer}) er anbefalt til stillingen`,
        });
    };

    return (
        <Modal open={vis} onClose={onClose} header={{ heading: 'Anbefal kandidat' }}>
            <BekreftLeggTilKandidat
                erAnbefaling
                kandidatnr={kandidat.arenaKandidatnr}
                stillingId={stillingId}
                onAvbryt={onClose}
                onBekreft={handleBekreft}
            />
        </Modal>
    );
};

export default AnbefalKandidatModal;
