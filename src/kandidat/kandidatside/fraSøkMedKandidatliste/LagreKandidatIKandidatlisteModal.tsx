import { Alert, BodyLong, Button, Modal } from '@navikt/ds-react';
import { FunctionComponent, useEffect, useState } from 'react';

import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { leggTilKandidatKandidatliste } from '../../../api/kandidat-api/kandidat.api';
import { useHentStillingTittel } from '../../../felles/hooks/useStilling';
import Sidelaster from '../../../felles/komponenter/sidelaster/Sidelaster';
import { erKobletTilStilling } from '../../kandidatliste/domene/kandidatlisteUtils';
import css from './LagreKandidatIKandidatlisteModal.module.css';

type Props = {
    vis: boolean;
    onClose: () => void;
    kandidatnr: string;
    kandidatliste: Nettressurs<Kandidatliste>;
};

const LagreKandidatIKandidatlisteModal: FunctionComponent<Props> = ({
    vis,
    onClose,
    kandidatnr,
    kandidatliste,
}) => {
    // const dispatch: Dispatch<KandidatlisteAction | VarslingAction> = useDispatch();
    const [lagreKandidatStatus, setLagreKandidatStatus] = useState<Nettstatus>(
        Nettstatus.IkkeLastet
    );

    useEffect(() => {
        setLagreKandidatStatus(Nettstatus.IkkeLastet);
    }, [kandidatnr]);

    const onBekreftClick = (kandidatlisteId: string) => async () => {
        if (lagreKandidatStatus === Nettstatus.SenderInn) {
            return;
        }

        setLagreKandidatStatus(Nettstatus.SenderInn);

        // TODO Verifiser / legg til nettstatus etter endring av funksjon
        try {
            const oppdatertKandidatliste = await leggTilKandidatKandidatliste(
                kandidatlisteId,
                kandidatnr
            );

            if (oppdatertKandidatliste.ok) {
                // onSuccess();
                onClose();
            } else {
                setLagreKandidatStatus(Nettstatus.Feil);
            }
        } catch (e) {
            setLagreKandidatStatus(Nettstatus.Feil);
        }
    };

    // const onSuccess = (kandidatliste: Kandidatliste) => {
    //     dispatch({
    //         type: VarslingActionType.VisVarsling,
    //         alertType: 'success',
    //         innhold: `Lagret kandidaten i kandidatlisten «${kandidatliste.tittel}»`,
    //     });

    //     dispatch({
    //         type: KandidatlisteActionType.OppdaterKandidatlisteMedKandidat,
    //         kandidatliste,
    //         kandidatnr,
    //     });
    // };

    const stillingstittel = useHentStillingTittel(
        kandidatliste.kind === Nettstatus.Suksess ? kandidatliste.data.stillingId : undefined
    );

    return (
        <Modal
            className={css.modal}
            open={vis}
            onClose={onClose}
            header={{ heading: 'Lagre kandidaten i kandidatlisten' }}
        >
            <>
                {kandidatliste.kind === Nettstatus.LasterInn && <Sidelaster />}
                {kandidatliste.kind === Nettstatus.Suksess && (
                    <>
                        <Modal.Body>
                            <BodyLong>
                                Ønsker du å lagre kandidaten i kandidatlisten til stillingen «
                                {erKobletTilStilling(kandidatliste.data)
                                    ? stillingstittel
                                    : kandidatliste.data.tittel}
                                »?
                            </BodyLong>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                loading={lagreKandidatStatus === Nettstatus.SenderInn}
                                onClick={onBekreftClick(kandidatliste.data.kandidatlisteId)}
                            >
                                Lagre
                            </Button>
                            <Button
                                variant="tertiary"
                                disabled={lagreKandidatStatus === Nettstatus.SenderInn}
                                onClick={onClose}
                            >
                                Avbryt
                            </Button>
                        </Modal.Footer>
                    </>
                )}
                {lagreKandidatStatus === Nettstatus.Feil && (
                    <Alert fullWidth variant="error" size="small">
                        Klarte ikke å lagre kandidat
                    </Alert>
                )}
            </>
        </Modal>
    );
};

export default LagreKandidatIKandidatlisteModal;
