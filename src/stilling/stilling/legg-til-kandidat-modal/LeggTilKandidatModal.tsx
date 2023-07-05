import { Alert, ErrorMessage, Heading, Loader } from '@navikt/ds-react';

import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import LeggTilKandidat from './LeggTilKandidat';
import Modal from '../../common/modal/Modal';
import css from './LeggTilKandidatModal.module.css';

type Props = {
    vis: boolean;
    onClose: () => void;
    kandidatliste: Nettressurs<Kandidatliste>;
};

const LeggTilKandidatModal = ({ vis, onClose, kandidatliste }: Props) => {
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
