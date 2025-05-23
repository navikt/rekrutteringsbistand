import { BeaconSignalsIcon } from '@navikt/aksel-icons';
import { Alert, BodyShort, Button, Label, Modal, Popover } from '@navikt/ds-react';
import { ChangeEvent, FunctionComponent, MouseEvent, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { KandidatIKandidatliste } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import { Nettstatus } from 'felles/nettressurs';
import { useVisVarsling } from 'felles/varsling/Varsling';
import { ApplikasjonContext } from '../../../../felles/ApplikasjonContext';
import AppState from '../../../state/AppState';
import KandidatlisteAction from '../../reducer/KandidatlisteAction';
import KandidatlisteActionType from '../../reducer/KandidatlisteActionType';
import { ForespørselOutboundDto } from './Forespørsel';
import css from './ForespørselOmDelingAvCv.module.css';
import VelgSvarfrist, { Svarfrist, lagSvarfristPåSekundet } from './VelgSvarfrist';
import useIkkeForespurteKandidater from './useIkkeForespurteKandidater';

type Props = {
    stillingsId: string;
    markerteKandidater: KandidatIKandidatliste[];
};

const ForespørselOmDelingAvCv: FunctionComponent<Props> = ({ stillingsId, markerteKandidater }) => {
    const dispatch = useDispatch();
    const { valgtNavKontor } = useContext(ApplikasjonContext);

    const { sendForespørselOmDelingAvCv } = useSelector((state: AppState) => state.kandidatliste);
    const [modalErÅpen, setModalErÅpen] = useState<boolean>(false);
    const [svarfrist, setSvarfrist] = useState<Svarfrist>(Svarfrist.ToDager);
    const [egenvalgtFrist, setEgenvalgtFrist] = useState<Date | undefined>();
    const [egenvalgtFristFeilmelding, setEgenvalgtFristFeilmelding] = useState<
        string | undefined
    >();
    const visVarsling = useVisVarsling();

    const markerteKandidaterSomIkkeErForespurt = useIkkeForespurteKandidater(markerteKandidater);
    const antallSpurtFraFør =
        markerteKandidater.length - markerteKandidaterSomIkkeErForespurt.length;

    const [kanIkkeDeleFeilmelding, setKanIkkeDeleFeilmelding] = useState<string | undefined>();
    const [kanIkkeDelePopover, setKanIkkeDelePopover] = useState<Element | null>(null);

    useEffect(() => {
        if (modalErÅpen) {
            const resetSendForespørsel = () => {
                dispatch<KandidatlisteAction>({
                    type: KandidatlisteActionType.ResetSendForespørselOmDelingAvCv,
                });
            };

            resetSendForespørsel();

            setSvarfrist(Svarfrist.ToDager);
            setEgenvalgtFrist(undefined);
            setEgenvalgtFristFeilmelding(undefined);
        }
    }, [modalErÅpen, dispatch]);

    useEffect(() => {
        const fjernMarkeringAvAlleKandidater = () => {
            dispatch<KandidatlisteAction>({
                type: KandidatlisteActionType.EndreMarkeringAvKandidater,
                kandidatnumre: [],
            });
        };

        if (sendForespørselOmDelingAvCv.kind === Nettstatus.Suksess) {
            lukkModal();
            visVarsling({
                innhold: 'Forespørselen ble sendt til kandidatene',
            });
            fjernMarkeringAvAlleKandidater();
        }
    }, [sendForespørselOmDelingAvCv.kind, dispatch, visVarsling]);

    const onSvarfristChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSvarfrist(event.target.value as Svarfrist);
    };

    const onEgenvalgtFristChange = (dato?: Date) => {
        setEgenvalgtFrist(dato);
    };

    const onEgenvalgtFristFeilmeldingChange = (feilmelding?: string) => {
        setEgenvalgtFristFeilmelding(feilmelding);
    };

    const lukkKanIkkeDelePopover = () => {
        setKanIkkeDelePopover(null);
    };

    const åpneModal = () => {
        setModalErÅpen(true);
    };

    const lukkModal = () => {
        setModalErÅpen(false);
    };

    const onDelMedKandidatClick = (event: MouseEvent<HTMLElement>) => {
        if (kanIkkeDelePopover) {
            setKanIkkeDelePopover(null);
        } else {
            if (valgtNavKontor === null) {
                setKanIkkeDelePopover(event.currentTarget);
                setKanIkkeDeleFeilmelding(
                    'Du må representere et Nav-kontor før du kan dele stillingen med kandidaten.'
                );
            } else if (markerteKandidater.length === 0) {
                setKanIkkeDelePopover(event.currentTarget);
                setKanIkkeDeleFeilmelding(
                    'Du må huke av for kandidatene du ønsker å dele stillingen med.'
                );
            } else if (markerteKandidaterSomIkkeErForespurt.length === 0) {
                setKanIkkeDelePopover(event.currentTarget);
                setKanIkkeDeleFeilmelding(
                    'Du har allerede delt stillingen med alle de markerte kandidatene. Hvis en kandidat har svart "nei" eller svarfristen er utløpt, kan du dele stillingen på nytt via "blyanten" til kandidaten.'
                );
            } else {
                åpneModal();
            }
        }
    };

    const onDelStillingMedKandidater = async () => {
        if ((egenvalgtFristFeilmelding || !egenvalgtFrist) && svarfrist === Svarfrist.Egenvalgt) {
            onEgenvalgtFristFeilmeldingChange('Mangler gyldig dato');
            return;
        }

        const outboundDto: ForespørselOutboundDto = {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            aktorIder: markerteKandidaterSomIkkeErForespurt.map((kandidat) => kandidat.aktørid!),
            stillingsId,
            svarfrist: lagSvarfristPåSekundet(svarfrist, egenvalgtFrist),
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            navKontor: valgtNavKontor!.navKontor,
        };

        dispatch<KandidatlisteAction>({
            type: KandidatlisteActionType.SendForespørselOmDelingAvCv,
            forespørselOutboundDto: outboundDto,
        });
    };

    return (
        <div>
            <Button
                variant="tertiary"
                onClick={onDelMedKandidatClick}
                icon={<BeaconSignalsIcon aria-label="Del stillingen med de markerte kandidatene" />}
            >
                Del med kandidat
            </Button>
            <Modal
                open={modalErÅpen}
                aria-label="Del stillingen med de markerte kandidatene2"
                className={css.foresporselOmDelingAvCvModal}
                onClose={lukkModal}
                header={{
                    heading: `Del med ${markerteKandidaterSomIkkeErForespurt.length} ${
                        markerteKandidaterSomIkkeErForespurt.length === 1
                            ? 'kandidat'
                            : 'kandidater'
                    } i aktivitetsplanen`,
                }}
            >
                <Modal.Body>
                    {antallSpurtFraFør > 0 && (
                        <Alert variant="warning" size="small" className={css.tidigereDelt}>
                            Du har tidligere delt stillingen med {antallSpurtFraFør}{' '}
                            {antallSpurtFraFør === 1
                                ? 'kandidat. Denne kandidaten'
                                : 'kandidater. De'}{' '}
                            vil ikke motta stillingen på nytt i aktivitetsplanen.
                        </Alert>
                    )}
                    <BodyShort size="small" spacing>
                        Det opprettes et stillingskort i Aktivitetsplanen. Kandidatene vil bli
                        varslet på SMS, og kan svare "ja" eller "nei" til at CV-en skal bli delt med
                        arbeidsgiver. Du vil se svaret i kandidatlisten.
                    </BodyShort>
                    <Alert variant="info" className={css.deltAdvarsel}>
                        <Label size="small">
                            Stillingsannonsen vil bli delt med kandidaten. Det er viktig at
                            annonseteksten er informativ og lett å forstå.
                        </Label>
                    </Alert>
                    <VelgSvarfrist
                        svarfrist={svarfrist}
                        onSvarfristChange={onSvarfristChange}
                        egenvalgtFrist={egenvalgtFrist}
                        egenvalgtFristFeilmelding={egenvalgtFristFeilmelding}
                        onEgenvalgtFristChange={onEgenvalgtFristChange}
                        onEgenvalgtFristFeilmeldingChange={onEgenvalgtFristFeilmeldingChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={onDelStillingMedKandidater}
                        variant="primary"
                        loading={sendForespørselOmDelingAvCv.kind === Nettstatus.SenderInn}
                    >
                        Del stilling
                    </Button>
                    <Button variant="secondary" onClick={lukkModal}>
                        Avbryt
                    </Button>
                </Modal.Footer>
                {sendForespørselOmDelingAvCv.kind === Nettstatus.Feil && (
                    <Alert variant="error" size="small" className={css.deltFeilmelding}>
                        <span>
                            Kunne ikke dele stillingsannonsen med kandidatene. Prøv igjen senere.
                        </span>
                        <span>Feilmelding: {sendForespørselOmDelingAvCv.error.message}</span>
                    </Alert>
                )}
            </Modal>
            <Popover
                open
                anchorEl={kanIkkeDelePopover}
                onClose={lukkKanIkkeDelePopover}
                placement="bottom"
                className={css.ingenValgtPopover}
            >
                <Popover.Content>
                    {kanIkkeDeleFeilmelding && (
                        <BodyShort as="div" size="small">
                            {kanIkkeDeleFeilmelding}
                        </BodyShort>
                    )}
                </Popover.Content>
            </Popover>
        </div>
    );
};

export default ForespørselOmDelingAvCv;
