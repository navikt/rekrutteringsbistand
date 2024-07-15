import { Button, Modal } from '@navikt/ds-react';
import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';

import { Nettstatus } from 'felles/nettressurs';
import css from './LagreKandidatIMineKandidatlisterModal.module.css';
import VelgKandidatlister from './VelgKandidatlister';
import { useVisVarsling } from 'felles/varsling/Varsling';
import { leggTilKandidatIKandidatliste } from '../../../../api/kandidat-api/leggTilKandidat';

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
    const visVarsling = useVisVarsling();
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
        const stillingId = event.target.value;
        const markerte = new Set(markerteLister);

        if (event.target.checked) {
            markerte.add(stillingId);
        } else {
            markerte.delete(stillingId);
        }

        setMarkerteLister(markerte);
    };

    const onLagreKandidater = async () => {
        setLagreIKandidatlister(Nettstatus.SenderInn);

        try {
            const markerteKandidatlister = Array.from(markerteLister);
            const responser = await Promise.all(
                markerteKandidatlister.map((stillingId) =>
                    leggTilKandidatIKandidatliste({ stillingId, kandidatnr })
                )
            );

            if (responser.every((respons) => respons.ok)) {
                setLagreIKandidatlister(Nettstatus.Suksess);
                setMarkerteLister(new Set());

                visMeldingOmLagredeKandidater(markerteKandidatlister.length);
            }

            const oppdaterteLagredeLister = new Set(lagredeLister);
            markerteKandidatlister.forEach((stillingId) => {
                oppdaterteLagredeLister.add(stillingId);
            });

            setLagredeLister(oppdaterteLagredeLister);
        } catch (e) {
            setLagreIKandidatlister(Nettstatus.Feil);
        }
    };

    const visMeldingOmLagredeKandidater = (antallKandidatlister: number) => {
        visVarsling({
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
