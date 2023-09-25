import { Alert, BodyLong, Button, Loader, Modal } from '@navikt/ds-react';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { FunctionComponent, useState } from 'react';
import { lagreKandidaterIKandidatliste } from '../api/api';
import { KontekstAvKandidatlisteEllerStilling } from '../hooks/useKontekstAvKandidatlisteEllerStilling';
import { LagreKandidaterDto } from './LagreKandidaterIMineKandidatlisterModal';
import css from './LagreKandidaterISpesifikkKandidatlisteModal.module.css';

type Props = {
    vis: boolean;
    onClose: () => void;
    markerteKandidater: Set<string>;
    kontekstAvKandidatlisteEllerStilling: KontekstAvKandidatlisteEllerStilling;
    onSuksess: (kandidatliste: Kandidatliste) => void;
};

const LagreKandidaterISpesifikkKandidatlisteModal: FunctionComponent<Props> = ({
    vis,
    onClose,
    markerteKandidater,
    kontekstAvKandidatlisteEllerStilling,
    onSuksess,
}) => {
    const [lagreKandidater, setLagreKandidater] = useState<Nettressurs<LagreKandidaterDto>>({
        kind: Nettstatus.IkkeLastet,
    });

    const onBekreftClick = (kandidatlisteId: string) => async () => {
        const lagreKandidaterDto = Array.from(markerteKandidater).map((kandidat) => ({
            kandidatnr: kandidat,
        }));

        setLagreKandidater({ kind: Nettstatus.SenderInn, data: lagreKandidaterDto });

        try {
            const oppdatertKandidatliste = await lagreKandidaterIKandidatliste(
                lagreKandidaterDto,
                kandidatlisteId
            );

            setLagreKandidater({ kind: Nettstatus.Suksess, data: lagreKandidaterDto });
            onSuksess(oppdatertKandidatliste);
            onClose();
        } catch (e) {
            setLagreKandidater({
                kind: Nettstatus.Feil,
                error: { message: typeof e === 'string' ? e : String(e) },
            });
        }
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
                        <Modal.Body>
                            <BodyLong>
                                Ønsker du å lagre kandidaten i kandidatlisten til stillingen «
                                {kontekstAvKandidatlisteEllerStilling.kandidatliste.data.tittel}»?
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
