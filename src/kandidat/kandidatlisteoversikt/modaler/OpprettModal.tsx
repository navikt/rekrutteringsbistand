import { Alert, Modal } from '@navikt/ds-react';
import { FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { feil, Nettressurs, Nettstatus, suksess } from 'felles/nettressurs';
import { postKandidatliste } from '../../api/api';
import { VarslingAction, VarslingActionType } from '../../varsling/varslingReducer';
import Kandidatlisteskjema, { KandidatlisteDto } from './Kandidatlisteskjema';
import css from './Modal.module.css';

type Props = {
    onClose: (refreshKandidatlister?: boolean) => void;
};

const OpprettModal: FunctionComponent<Props> = ({ onClose }) => {
    const dispatch = useDispatch();
    const [status, setStatus] = useState<Nettressurs<KandidatlisteDto>>({
        kind: Nettstatus.IkkeLastet,
    });

    const opprettKandidatliste = async (kandidatlisteDto: KandidatlisteDto) => {
        setStatus({ kind: Nettstatus.SenderInn });

        try {
            await postKandidatliste(kandidatlisteDto);

            dispatch<VarslingAction>({
                type: VarslingActionType.VisVarsling,
                innhold: `Opprettet kandidatliste «${kandidatlisteDto.tittel}»`,
            });

            setStatus(suksess(kandidatlisteDto));
            onClose(true);
        } catch (e) {
            setStatus(
                feil({
                    message: 'Klarte ikke å opprette kandidatliste',
                    status: e.status,
                })
            );
        }
    };

    return (
        <Modal
            open
            aria-label="Opprett kandidatliste"
            onBeforeClose={onClose}
            header={{ heading: 'Opprett kandidatliste' }}
            className={css.modal}
        >
            <Kandidatlisteskjema
                onSave={opprettKandidatliste}
                saving={status.kind === Nettstatus.SenderInn}
                onClose={onClose}
                knappetekst="Opprett"
            />

            {status.kind === Nettstatus.Feil && (
                <Alert fullWidth variant="error" size="small">
                    {status.error.message}
                </Alert>
            )}
        </Modal>
    );
};

export default OpprettModal;
