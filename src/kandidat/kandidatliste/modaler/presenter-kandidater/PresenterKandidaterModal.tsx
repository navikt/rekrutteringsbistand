import {
    Alert,
    BodyLong,
    BodyShort,
    Button,
    Heading,
    Label,
    Link,
    TextField,
    Textarea,
} from '@navikt/ds-react';
import classNames from 'classnames';
import { Nettstatus } from 'felles/nettressurs';
import { ChangeEvent, useState } from 'react';
import Modal from '../../../komponenter/modal/Modal';
import css from './PresenterKandidaterModal.module.css';
import { erGyldigEpost, inneholderSærnorskeBokstaver } from './epostValidering';

type Props = {
    vis?: boolean;
    deleStatus: Nettstatus;
    onSubmit: (beskjed: string, mailadresser: string[]) => void;
    onClose: () => void;
    antallMarkerteKandidater: number;
    antallKandidaterSomHarSvartJa: number;
    alleKandidaterMåGodkjenneForespørselOmDelingAvCvForÅPresentere: boolean;
};

type Mailadresse = {
    id: number;
    value: string;
    errorTekst?: string;
    show: boolean;
};

const PresenterKandidaterModal = ({
    vis = true,
    deleStatus,
    onSubmit,
    onClose,
    antallMarkerteKandidater,
    antallKandidaterSomHarSvartJa,
    alleKandidaterMåGodkjenneForespørselOmDelingAvCvForÅPresentere,
}: Props) => {
    const [beskjed, setBeskjed] = useState<string>('');
    const [mailadresser, setMailadresser] = useState<Mailadresse[]>([
        {
            id: 0,
            value: '',
            errorTekst: undefined,
            show: true,
        },
    ]);

    const onMailadresseChange = (id: number) => (event: ChangeEvent<HTMLInputElement>) => {
        setMailadresser(
            mailadresser.map((mailadresseFelt) => {
                if (mailadresseFelt.id === id) {
                    return {
                        ...mailadresseFelt,
                        value: event.target.value,
                        errorTekst: undefined,
                    };
                }

                return mailadresseFelt;
            })
        );
    };

    const onBeskjedChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setBeskjed(event.target.value);
    };

    const showInputFelt = (id: number) => {
        setMailadresser(
            mailadresser.map((mailadresseFelt) => {
                if (mailadresseFelt.id === id) {
                    return {
                        ...mailadresseFelt,
                        show: true,
                    };
                }
                return mailadresseFelt;
            })
        );
    };

    const leggTilMailadressefelt = () => {
        const id = mailadresser.length;

        setMailadresser(
            mailadresser.concat({
                id,
                value: '',
                errorTekst: undefined,
                show: false,
            })
        );

        setTimeout(() => {
            showInputFelt(id);
        }, 10);
    };

    const validerOgLagre = () => {
        const validerteMailadresser = mailadresser.map((mailadresseFelt) => {
            if (mailadresseFelt.id === 0 && !mailadresseFelt.value.trim()) {
                return {
                    ...mailadresseFelt,
                    errorTekst: 'Feltet er påkrevd',
                };
            } else if (!erGyldigEpost(mailadresseFelt.value.trim())) {
                return {
                    ...mailadresseFelt,
                    errorTekst: 'Mailadressen er ugyldig',
                };
            } else if (inneholderSærnorskeBokstaver(mailadresseFelt.value.trim())) {
                return {
                    ...mailadresseFelt,
                    errorTekst: 'Særnorske bokstaver i e-postadresse støttes ikke',
                };
            }

            return mailadresseFelt;
        });

        if (
            validerteMailadresser.filter((mailadresseFelt) => mailadresseFelt.errorTekst).length !==
            0
        ) {
            setMailadresser(validerteMailadresser);
        } else {
            const ikkeTommeMailadresser = mailadresser
                .map((mailadresseFelt) => mailadresseFelt.value)
                .filter((mailadresse) => mailadresse.trim());

            onSubmit(beskjed, ikkeTommeMailadresser);
        }
    };

    const antallSomSkalDeles = alleKandidaterMåGodkjenneForespørselOmDelingAvCvForÅPresentere
        ? antallKandidaterSomHarSvartJa
        : antallMarkerteKandidater;

    const antallKandidaterSomIkkeKanDeles =
        antallMarkerteKandidater - antallKandidaterSomHarSvartJa;

    return (
        <Modal
            open={vis}
            onClose={onClose}
            aria-label="Del kandidater med arbeidsgiver"
            className={css.presenterKandidaterModal}
        >
            <div className={css.wrapper}>
                {antallSomSkalDeles === 1 ? (
                    <Heading level="2" size="medium">
                        Del 1 kandidat med arbeidsgiver
                    </Heading>
                ) : (
                    <Heading
                        level="2"
                        size="medium"
                    >{`Del ${antallSomSkalDeles} kandidater med arbeidsgiver`}</Heading>
                )}
                {alleKandidaterMåGodkjenneForespørselOmDelingAvCvForÅPresentere &&
                    antallKandidaterSomIkkeKanDeles > 0 && (
                        <Alert variant="warning" size="small">
                            <BodyLong size="small" spacing>
                                {antallKandidaterSomIkkeKanDeles} av kandidatene har ikke svart
                                eller svart nei på om CV-en kan deles. Du kan derfor ikke dele
                                disse.
                            </BodyLong>
                            <BodyLong size="small" spacing>
                                Har du hatt dialog med kandidaten, og fått bekreftet at NAV kan dele
                                CV-en? Da må du registrere dette i aktivitetsplanen. Har du ikke
                                delt stillingen med kandidaten må du gjøre det først.{' '}
                                <Link href="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-markedsarbeid/SitePages/Del-stillinger-med-kandidater-i-Aktivitetsplanen.aspx#har-du-ringt-kandidaten-istedenfor-%C3%A5-dele-i-aktivitetsplanen">
                                    Se rutiner
                                </Link>
                                .
                            </BodyLong>
                        </Alert>
                    )}
                {!alleKandidaterMåGodkjenneForespørselOmDelingAvCvForÅPresentere && (
                    <Alert variant="warning" size="small">
                        <BodyLong size="small" spacing>
                            Husk at du må kontakte kandidatene og undersøke om stillingen er aktuell
                            før du deler med arbeidsgiver.
                        </BodyLong>
                    </Alert>
                )}
                <BodyShort size="small" spacing>
                    * er obligatoriske felter du må fylle ut
                </BodyShort>
                <BodyLong size="small">
                    Arbeidsgiveren du deler listen med vil motta en e-post med navn på stilling og
                    lenke for å logge inn. Etter innlogging kan arbeidsgiveren se kandidatlisten.
                </BodyLong>
                <div className={css.mailadresser}>
                    {mailadresser.map((mailadresseFelt) => (
                        <TextField
                            className={classNames(css.mailadresse, {
                                [css.mailadresseshow]: mailadresseFelt.show,
                            })}
                            size="small"
                            key={`mailadressefelt_${mailadresseFelt.id}`}
                            label={
                                mailadresseFelt.id === 0 ? 'E-postadresse til arbeidsgiver*' : ''
                            }
                            placeholder={
                                mailadresseFelt.id === 0
                                    ? 'For eksempel: kari.nordmann@firma.no'
                                    : undefined
                            }
                            value={mailadresseFelt.value}
                            onChange={onMailadresseChange(mailadresseFelt.id)}
                            error={
                                mailadresseFelt.errorTekst ? mailadresseFelt.errorTekst : undefined
                            }
                        />
                    ))}
                    <Button
                        variant="tertiary-neutral"
                        onClick={leggTilMailadressefelt}
                        className={css.leggTilMailadressefelt}
                    >
                        + Legg til flere
                    </Button>
                </div>
                <div>
                    <Textarea
                        label="Melding til arbeidsgiver"
                        value={beskjed}
                        onChange={onBeskjedChange}
                    />
                </div>
                <div className={css.knapper}>
                    <Button
                        variant="primary"
                        disabled={deleStatus === Nettstatus.LasterInn}
                        loading={deleStatus === Nettstatus.LasterInn}
                        onClick={validerOgLagre}
                    >
                        Del
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                        Avbryt
                    </Button>
                </div>
                {deleStatus === Nettstatus.Feil && (
                    <Label size="small" className={css.feilmelding}>
                        Kunne ikke dele med arbeidsgiver akkurat nå
                    </Label>
                )}
            </div>
        </Modal>
    );
};

export default PresenterKandidaterModal;
