import { BodyLong, Button, Heading, Loader, Modal } from '@navikt/ds-react';
import { FunctionComponent, useState } from 'react';
import { lagreKandidaterIKandidatliste } from '../api/api';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { KontekstAvKandidatlisteEllerStilling } from '../hooks/useKontekstAvKandidatlisteEllerStilling';
import { LagreKandidaterDto } from './LagreKandidaterIMineKandidatlisterModal';
import css from './LagreKandidaterISpesifikkKandidatlisteModal.module.css';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';

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
        <Modal open={vis} onClose={onClose} closeButton={false}>
            <div className={css.innhold}>
                <Heading level="1" size="medium">
                    Lagre {markerteKandidater.size} kandidat
                    {markerteKandidater.size > 1 ? 'er' : ''} i kandidatlisten
                </Heading>
                {kontekstAvKandidatlisteEllerStilling.kandidatliste.kind ===
                    Nettstatus.LasterInn && <Loader />}
                {kontekstAvKandidatlisteEllerStilling.kandidatliste.kind === Nettstatus.Suksess && (
                    <>
                        <BodyLong className={css.beskrivelse}>
                            Ønsker du å lagre kandidaten i kandidatlisten til stillingen «
                            {kontekstAvKandidatlisteEllerStilling.kandidatliste.data.tittel}»?
                        </BodyLong>
                        <div className={css.knapper}>
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
                        </div>
                    </>
                )}
                {lagreKandidater.kind === Nettstatus.Feil && (
                    <BodyLong>{lagreKandidater.error.message}</BodyLong>
                )}
            </div>
        </Modal>
    );
};

export default LagreKandidaterISpesifikkKandidatlisteModal;
