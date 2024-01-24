import { Button, Modal } from '@navikt/ds-react';
import { ChangeEvent, Dispatch, FunctionComponent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Nettstatus } from 'felles/nettressurs';
import { leggTilKandidatKandidatliste } from '../../../../api/kandidat-api/kandidat.api';
import KandidatlisteAction from '../../../kandidatliste/reducer/KandidatlisteAction';
import { VarslingAction, VarslingActionType } from '../../../varsling/varslingReducer';
import css from './LagreKandidatIMineKandidatlisterModal.module.css';
import VelgKandidatlister from './VelgKandidatlister';

type Props = {
    vis: boolean;
    onClose: () => void;
    kandidatnr: string;
};

const LagreKandidaterIMineKandidatlisterModal: FunctionComponent<Props> = ({
    vis,
    onClose,
    kandidatnr,
}) => {
    const dispatch: Dispatch<KandidatlisteAction | VarslingAction> = useDispatch();

    const [markerteLister, setMarkerteLister] = useState<Set<string>>(new Set());
    const [lagredeLister, setLagredeLister] = useState<Set<string>>(new Set());
    const [lagreIKandidatlister, setLagreIKandidatlister] = useState<Nettstatus>(
        Nettstatus.IkkeLastet
    );

    useEffect(() => {
        setMarkerteLister(new Set());
        setLagredeLister(new Set());
        setLagreIKandidatlister(Nettstatus.IkkeLastet);
    }, [kandidatnr]);

    const onKandidatlisteMarkert = (event: ChangeEvent<HTMLInputElement>) => {
        const kandidatlisteId = event.target.value;
        const markerte = new Set(markerteLister);

        if (event.target.checked) {
            markerte.add(kandidatlisteId);
        } else {
            markerte.delete(kandidatlisteId);
        }

        setMarkerteLister(markerte);
    };

    const onLagreKandidater = async () => {
        setLagreIKandidatlister(Nettstatus.SenderInn);

        try {
            const markerteKandidatlister = Array.from(markerteLister);

            const responser = await Promise.all(
                markerteKandidatlister.map((kandidatlisteId) =>
                    leggTilKandidatKandidatliste(kandidatlisteId, kandidatnr)
                )
            );

            if (responser.every((respons) => respons.ok)) {
                setLagreIKandidatlister(Nettstatus.Suksess);
                setMarkerteLister(new Set());

                // responser.forEach((oppdatertKandidatliste) => {
                //     if (oppdatertKandidatliste.kind === Nettstatus.Suksess) {
                //         onKandidatlisteOppdatert(oppdatertKandidatliste.data, kandidatnr);
                //     }
                // });

                visMeldingOmLagredeKandidater(markerteKandidatlister.length);
            }

            const oppdaterteLagredeLister = new Set(lagredeLister);
            markerteKandidatlister.forEach((kandidatlisteId) => {
                oppdaterteLagredeLister.add(kandidatlisteId);
            });

            setLagredeLister(oppdaterteLagredeLister);
        } catch (e) {
            setLagreIKandidatlister(Nettstatus.Feil);
        }
    };

    // const onKandidatlisteOppdatert = (kandidatliste: Kandidatliste, kandidatnr: string) => {
    //     dispatch({
    //         type: KandidatlisteActionType.OppdaterKandidatlisteMedKandidat,
    //         kandidatliste,
    //         kandidatnr,
    //     });
    // };

    const visMeldingOmLagredeKandidater = (antallKandidatlister: number) => {
        dispatch({
            type: VarslingActionType.VisVarsling,
            alertType: 'success',
            innhold: `Kandidaten er lagret i ${antallKandidatlister} kandidatliste${
                antallKandidatlister > 1 ? 'r' : ''
            }`,
        });
    };

    return (
        <Modal
            className={css.modal}
            open={vis}
            onClose={onClose}
            header={{ heading: 'Lagre kandidaten i kandidatlistene' }}
        >
            <Modal.Body>
                <VelgKandidatlister
                    markerteLister={markerteLister}
                    lagredeLister={lagredeLister}
                    onKandidatlisteMarkert={onKandidatlisteMarkert}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={onLagreKandidater}
                    disabled={markerteLister.size === 0}
                    loading={lagreIKandidatlister === Nettstatus.SenderInn}
                >
                    Lagre
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LagreKandidaterIMineKandidatlisterModal;
