import { Alert, BodyLong, Button, Modal } from '@navikt/ds-react';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { FunctionComponent, useState } from 'react';
import { leggTilKandidaterKandidatliste } from '../../api/kandidat-api/leggTilKandidat';
import { useHentStillingTittel } from '../../felles/hooks/useStilling';
import { LagreKandidaterDto } from './LagreKandidaterIMineKandidatlisterModal';
import css from './LagreKandidaterISpesifikkKandidatlisteModal.module.css';

type Props = {
    vis: boolean;
    onClose: () => void;
    markerteKandidater: Set<string>;
    stillingId: string;
};

const LagreKandidaterISpesifikkKandidatlisteModal: FunctionComponent<Props> = ({
    vis,
    onClose,
    markerteKandidater,
    stillingId,
}) => {
    const [lagreKandidater, setLagreKandidater] = useState<Nettressurs<LagreKandidaterDto>>({
        kind: Nettstatus.IkkeLastet,
    });
    const [innsendingOk, setInnsengingOk] = useState<boolean | null>(null);
    const [feilmelding, setFeilmelding] = useState<string | null>(null);

    const onBekreftClick = (stillingId: string) => async () => {
        const lagreKandidaterDto = Array.from(markerteKandidater).map((kandidat) => ({
            kandidatnr: kandidat,
        }));

        setLagreKandidater({ kind: Nettstatus.SenderInn, data: lagreKandidaterDto });

        try {
            const response = await leggTilKandidaterKandidatliste(stillingId, lagreKandidaterDto);

            if (response.ok) {
                setInnsengingOk(true);
            } else {
                setInnsengingOk(false);
                if (response.status === 403) {
                    setFeilmelding('Du har ikke tilgang til å utføre denne handlingen');
                } else {
                    setFeilmelding('En feil oppstod under lagring');
                }
            }
        } catch (e) {
            setLagreKandidater({
                kind: Nettstatus.Feil,
                error: { message: typeof e === 'string' ? e : String(e) },
            });
        }
    };

    const stillingstittel = useHentStillingTittel(stillingId);

    const visOppsummering = () => (
        <div>
            <Modal.Body>
                {!innsendingOk ? (
                    <Alert fullWidth variant="error" size="small">
                        ${feilmelding ?? 'En feil oppstod under lagring'}
                    </Alert>
                ) : (
                    <Alert fullWidth variant="success" size="small">
                        Fullført
                    </Alert>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => window.location.reload()}>
                    Lukk
                </Button>
            </Modal.Footer>
        </div>
    );

    return (
        <Modal
            open={vis}
            onClose={onClose}
            header={{
                heading: `Lagre ${markerteKandidater.size} kandidat${markerteKandidater.size > 1 ? 'er' : ''} i kandidatlisten`,
            }}
        >
            <div className={css.innhold}>
                {innsendingOk !== null ? (
                    visOppsummering()
                ) : (
                    <>
                        <Modal.Body>
                            <BodyLong>
                                Ønsker du å lagre kandidaten i kandidatlisten til stillingen{' '}
                                {stillingstittel}
                            </BodyLong>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={onBekreftClick(stillingId)}>
                                Lagre
                            </Button>
                            <Button
                                variant="tertiary"
                                loading={lagreKandidater.kind === Nettstatus.SenderInn}
                                onClick={onClose}
                            >
                                Avbryt
                            </Button>
                        </Modal.Footer>
                    </>
                )}
                {lagreKandidater.kind === Nettstatus.Feil && (
                    <Alert fullWidth variant="error" size="small">
                        {lagreKandidater.error.message}
                    </Alert>
                )}
            </div>
        </Modal>
    );
};

export default LagreKandidaterISpesifikkKandidatlisteModal;
