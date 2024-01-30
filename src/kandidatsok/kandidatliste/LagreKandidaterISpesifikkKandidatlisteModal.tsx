import { Alert, BodyLong, Button, Loader, Modal } from '@navikt/ds-react';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { FunctionComponent, useState } from 'react';
import { leggTilKandidaterKandidatliste } from '../../api/kandidat-api/kandidat.api';
import { useHentStillingTittel } from '../../felles/hooks/useStilling';
import { KontekstAvKandidatlisteEllerStilling } from '../hooks/useKontekstAvKandidatlisteEllerStilling';
import { LagreKandidaterDto } from './LagreKandidaterIMineKandidatlisterModal';
import css from './LagreKandidaterISpesifikkKandidatlisteModal.module.css';

type Props = {
    vis: boolean;
    onClose: () => void;
    markerteKandidater: Set<string>;
    kontekstAvKandidatlisteEllerStilling: KontekstAvKandidatlisteEllerStilling;
};

const LagreKandidaterISpesifikkKandidatlisteModal: FunctionComponent<Props> = ({
    vis,
    onClose,
    markerteKandidater,
    kontekstAvKandidatlisteEllerStilling,
}) => {
    const [lagreKandidater, setLagreKandidater] = useState<Nettressurs<LagreKandidaterDto>>({
        kind: Nettstatus.IkkeLastet,
    });
    const [innsendingOk, setInnsengingOk] = useState<boolean | null>(null);

    const onBekreftClick = (kandidatlisteId: string) => async () => {
        const lagreKandidaterDto = Array.from(markerteKandidater).map((kandidat) => ({
            kandidatnr: kandidat,
        }));

        setLagreKandidater({ kind: Nettstatus.SenderInn, data: lagreKandidaterDto });

        try {
            const response = await leggTilKandidaterKandidatliste(
                kandidatlisteId,
                lagreKandidaterDto as any
            );

            if (response.ok) {
                setInnsengingOk(true);
            } else {
                setInnsengingOk(false);
            }
        } catch (e) {
            setLagreKandidater({
                kind: Nettstatus.Feil,
                error: { message: typeof e === 'string' ? e : String(e) },
            });
        }
    };

    const stillingstittel = useHentStillingTittel(
        kontekstAvKandidatlisteEllerStilling.kandidatliste.kind === Nettstatus.Suksess
            ? kontekstAvKandidatlisteEllerStilling.kandidatliste.data.stillingId
            : undefined
    );

    const visOppsummering = () => {
        return (
            <div>
                <Modal.Body>
                    {!innsendingOk ? (
                        <Alert fullWidth variant="error" size="small">
                            Feil under lagring
                        </Alert>
                    ) : (
                        <Alert fullWidth variant="success" size="small">
                            Fullført
                        </Alert>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            //todo bruk onClose og oppdater listen istedenfor reload.
                            window.location.reload();
                        }}
                    >
                        Lukk
                    </Button>
                </Modal.Footer>
            </div>
        );
    };

    return (
        <Modal
            open={vis}
            onClose={onClose}
            header={{
                heading: `Lagre ${markerteKandidater.size} kandidat
            ${markerteKandidater.size > 1 ? 'er' : ''} i kandidatlisten`,
            }}
        >
            <div className={css.innhold}>
                {kontekstAvKandidatlisteEllerStilling.kandidatliste.kind ===
                    Nettstatus.LasterInn && <Loader variant="interaction" size="2xlarge" />}
                {kontekstAvKandidatlisteEllerStilling.kandidatliste.kind === Nettstatus.Suksess && (
                    <>
                        {innsendingOk !== null ? (
                            visOppsummering()
                        ) : (
                            <>
                                <Modal.Body>
                                    <BodyLong>
                                        Ønsker du å lagre kandidaten i kandidatlisten til stillingen
                                        «
                                        {kontekstAvKandidatlisteEllerStilling.kandidatliste.data
                                            .stillingId
                                            ? stillingstittel
                                            : kontekstAvKandidatlisteEllerStilling.kandidatliste
                                                  .data.tittel}
                                        »?
                                    </BodyLong>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        variant="primary"
                                        onClick={onBekreftClick(
                                            kontekstAvKandidatlisteEllerStilling.kandidatliste.data
                                                .kandidatlisteId
                                        )}
                                    >
                                        Lagre
                                    </Button>
                                    <Button
                                        variant="tertiary"
                                        loading={lagreKandidater.kind === Nettstatus.SenderInn}
                                        onClick={() => {
                                            onClose();
                                        }}
                                    >
                                        Avbryt
                                    </Button>
                                </Modal.Footer>
                            </>
                        )}
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
