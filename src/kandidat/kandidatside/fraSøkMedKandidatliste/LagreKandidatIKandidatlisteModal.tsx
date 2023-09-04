import { BodyLong, Button, Modal } from '@navikt/ds-react';
import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import Sidelaster from '../../../felles/komponenter/sidelaster/Sidelaster';
import { postKandidatTilKandidatliste } from '../../api/api';
import KandidatlisteAction from '../../kandidatliste/reducer/KandidatlisteAction';
import KandidatlisteActionType from '../../kandidatliste/reducer/KandidatlisteActionType';
import { VarslingAction, VarslingActionType } from '../../varsling/varslingReducer';
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
    const dispatch: Dispatch<KandidatlisteAction | VarslingAction> = useDispatch();
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

        try {
            const oppdatertKandidatliste = await postKandidatTilKandidatliste(
                kandidatlisteId,
                kandidatnr
            );

            if (oppdatertKandidatliste.kind === Nettstatus.Suksess) {
                onSuccess(oppdatertKandidatliste.data);
                onClose();
            } else {
                setLagreKandidatStatus(Nettstatus.Feil);
            }
        } catch (e) {
            setLagreKandidatStatus(Nettstatus.Feil);
        }
    };

    const onSuccess = (kandidatliste: Kandidatliste) => {
        dispatch({
            type: VarslingActionType.VisVarsling,
            alertType: 'success',
            innhold: `Lagret kandidaten i kandidatlisten «${kandidatliste.tittel}»`,
        });

        dispatch({
            type: KandidatlisteActionType.OppdaterKandidatlisteMedKandidat,
            kandidatliste,
            kandidatnr,
        });
    };

    return (
        <Modal
            className={css.modal}
            open={vis}
            onClose={onClose}
            header={{ heading: 'Lagre kandidaten i kandidatlisten', closeButton: false }}
        >
            <>
                {kandidatliste.kind === Nettstatus.LasterInn && <Sidelaster />}
                {kandidatliste.kind === Nettstatus.Suksess && (
                    <>
                        <Modal.Body>
                            <BodyLong className={css.beskrivelse}>
                                Ønsker du å lagre kandidaten i kandidatlisten til stillingen «
                                {kandidatliste.data.tittel}»?
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
                    <BodyLong>Klarte ikke å lagre kandidat</BodyLong>
                )}
            </>
        </Modal>
    );
};

export default LagreKandidatIKandidatlisteModal;
