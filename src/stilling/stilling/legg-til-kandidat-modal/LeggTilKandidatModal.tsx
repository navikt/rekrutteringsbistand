import { FunctionComponent } from 'react';
import { Alert, ErrorMessage, Heading, Loader } from '@navikt/ds-react';

import { Nettressurs, Nettstatus } from '../../api/Nettressurs';
import { Kandidatliste } from './kandidatlistetyper';
import Modal from '../../common/modal/Modal';
import LeggTilKandidat from './LeggTilKandidat';
import css from './LeggTilKandidatModal.module.css';

export type KandidatOutboundDto = {
    kandidatnr: string;
    notat?: string;
};

type Props = {
    vis: boolean;
    onClose: () => void;
    kandidatliste: Nettressurs<Kandidatliste>;
};

const LeggTilKandidatModal: FunctionComponent<Props> = ({ vis, onClose, kandidatliste }) => {
    return (
        <Modal open={vis} aria-label="Legg til kandidat" onClose={onClose}>
            <Heading spacing level="2" size="large">
                Legg til kandidat
            </Heading>
            <Alert variant="warning" className={css.advarsel}>
                Før du legger en kandidat på kandidatlisten må du undersøke om personen oppfyller
                kravene som er nevnt i stillingen.
            </Alert>
            {kandidatliste.kind === Nettstatus.LasterInn && (
                <Loader size="medium" className={css.spinner} />
            )}

            {kandidatliste.kind === Nettstatus.Feil && (
                <ErrorMessage spacing>
                    Klarte ikke å laste ned kandidatliste for stillingen.
                </ErrorMessage>
            )}

            {kandidatliste.kind === Nettstatus.Suksess && (
                <LeggTilKandidat kandidatliste={kandidatliste.data} onClose={onClose} />
            )}
        </Modal>
    );
};

export default LeggTilKandidatModal;
