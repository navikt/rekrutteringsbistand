import {
    Alert,
    BodyLong,
    Button,
    Heading,
    Label,
    Link,
    TextField,
    Textarea,
} from '@navikt/ds-react';
import { sendEvent } from 'felles/amplitude';
import KandidatIKandidatliste from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import { Nettstatus } from 'felles/nettressurs';
import useNavKontor from 'felles/store/navKontor';
import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { postDelteKandidater } from '../../../api/api';
import Modal from '../../../komponenter/modal/Modal';
import { VarslingActionType } from '../../../varsling/varslingReducer';
import { kandidaterMåGodkjenneDelingAvCv } from '../../domene/kandidatlisteUtils';
import KandidatlisteActionType from '../../reducer/KandidatlisteActionType';
import css from './PresenterKandidaterModal.module.css';
import { erGyldigEpost, inneholderSærnorskeBokstaver } from './epostValidering';

const rutinerForDeling =
    'https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-markedsarbeid/SitePages/Del-stillinger-med-kandidater-i-Aktivitetsplanen.aspx#har-du-ringt-kandidaten-istedenfor-%C3%A5-dele-i-aktivitetsplanen';

type Props = {
    vis?: boolean;
    onClose: (fjernMarkering: boolean) => void;
    markerteKandidater: KandidatIKandidatliste[];
    kandidaterSomHarSvartJa: KandidatIKandidatliste[];
    alleKandidaterMåGodkjenneForespørselOmDelingAvCvForÅPresentere: boolean;
    kandidatliste: Kandidatliste;
};

type Mailadresse = {
    id: number;
    value: string;
    feilmelding?: string;
};

const PresenterKandidaterModal = ({
    vis = true,
    onClose,
    markerteKandidater,
    kandidaterSomHarSvartJa,
    alleKandidaterMåGodkjenneForespørselOmDelingAvCvForÅPresentere,
    kandidatliste,
}: Props) => {
    const dispatch = useDispatch();
    const valgtNavKontor = useNavKontor((state) => state.navKontor);

    const [delestatus, setDelestatus] = useState<Nettstatus>(Nettstatus.IkkeLastet);
    const [beskjed, setBeskjed] = useState<string>('');
    const [mailadresser, setMailadresser] = useState<Mailadresse[]>([
        {
            id: 0,
            value: '',
        },
    ]);

    const presenterKandidater = async (adresser: string[], kandidatnumre: Array<string>) => {
        setDelestatus(Nettstatus.SenderInn);

        const response = await postDelteKandidater(
            beskjed,
            adresser,
            kandidatliste.kandidatlisteId,
            kandidatnumre,
            valgtNavKontor
        );

        if (response.ok) {
            setDelestatus(Nettstatus.Suksess);

            const prefix = markerteKandidater.length > 1 ? 'Kandidatene' : 'Kandidaten';
            const melding = prefix + ' er delt med arbeidsgiver';

            dispatch({
                type: KandidatlisteActionType.PresenterKandidaterSuccess,
                kandidatliste: response,
            });

            dispatch({
                type: VarslingActionType.VisVarsling,
                innhold: melding,
            });

            sendAmplitudeEventForPresentertKandidatliste(kandidatliste, kandidatnumre);
            onClose(true);
        } else {
            setDelestatus(Nettstatus.Feil);
        }
    };

    const handleDelClick = () => {
        const validerteMailadresser = mailadresser.map(validerEpostadresse);

        if (validerteMailadresser.some((adresse) => adresse.feilmelding)) {
            setMailadresser(validerteMailadresser);
        } else {
            const ikkeTommeMailadresser = mailadresser
                .map((adresse) => adresse.value)
                .filter((mailadresse) => mailadresse.trim());

            if (valgtNavKontor === null) {
                const kandidaterSomSkalDeles = kandidaterMåGodkjenneDelingAvCv(kandidatliste)
                    ? kandidaterSomHarSvartJa.map((k) => k.kandidatnr)
                    : markerteKandidater.map((kandidat) => kandidat.kandidatnr);

                presenterKandidater(ikkeTommeMailadresser, kandidaterSomSkalDeles);
            }
        }
    };

    const onMailadresseChange = (id: number) => (event: ChangeEvent<HTMLInputElement>) => {
        setMailadresser(
            mailadresser.map((mailadresseFelt) => {
                if (mailadresseFelt.id === id) {
                    return {
                        ...mailadresseFelt,
                        value: event.target.value,
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
            })
        );
    };

    const antallSomSkalDeles = alleKandidaterMåGodkjenneForespørselOmDelingAvCvForÅPresentere
        ? kandidaterSomHarSvartJa.length
        : markerteKandidater.length;

    const antallKandidaterSomIkkeKanDeles =
        markerteKandidater.length - kandidaterSomHarSvartJa.length;

    const [førsteMailadresse, ...andreMailadresser] = mailadresser;

    return (
        <Modal
            open={vis}
            onClose={() => onClose(false)}
            aria-label="Del kandidater med arbeidsgiver"
            className={css.presenterKandidaterModal}
        >
            <div className={css.wrapper}>
                <Heading level="2" size="medium">
                    <span>Del </span>
                    <span>{antallSomSkalDeles} </span>
                    <span>{antallSomSkalDeles === 1 ? 'kandidat' : 'kandidater'}</span>
                    <span> med arbeidsgiver</span>
                </Heading>
                {alleKandidaterMåGodkjenneForespørselOmDelingAvCvForÅPresentere &&
                    antallKandidaterSomIkkeKanDeles > 0 && (
                        <Alert variant="warning" size="small">
                            <BodyLong spacing>
                                {antallKandidaterSomIkkeKanDeles} av kandidatene har ikke svart
                                eller svart nei på om CV-en kan deles. Du kan derfor ikke dele
                                disse.
                            </BodyLong>
                            <BodyLong spacing>
                                Har du hatt dialog med kandidaten, og fått bekreftet at NAV kan dele
                                CV-en? Da må du registrere dette i aktivitetsplanen. Har du ikke
                                delt stillingen med kandidaten må du gjøre det først.{' '}
                                <Link href={rutinerForDeling}>Se rutiner</Link>.
                            </BodyLong>
                        </Alert>
                    )}
                {!alleKandidaterMåGodkjenneForespørselOmDelingAvCvForÅPresentere && (
                    <Alert variant="warning" size="small">
                        <BodyLong spacing>
                            Husk at du må kontakte kandidatene og undersøke om stillingen er aktuell
                            før du deler med arbeidsgiver.
                        </BodyLong>
                    </Alert>
                )}
                <BodyLong>
                    Arbeidsgiveren du deler listen med vil motta en e-post med navn på stilling og
                    lenke for å logge inn. Etter innlogging kan arbeidsgiveren se kandidatlisten.
                </BodyLong>
                <div className={css.mailadresser}>
                    <TextField
                        type="email"
                        className={css.mailadresse}
                        label={'E-postadresse til arbeidsgiver (må fylles ut)'}
                        placeholder={'For eksempel: kari.nordmann@firma.no'}
                        value={førsteMailadresse.value}
                        onChange={onMailadresseChange(førsteMailadresse.id)}
                        error={
                            førsteMailadresse.feilmelding
                                ? førsteMailadresse.feilmelding
                                : undefined
                        }
                    />

                    {andreMailadresser.map((adressefelt) => (
                        <TextField
                            type="email"
                            hideLabel
                            label={`Mailadresse ${adressefelt.id + 1}`}
                            className={css.mailadresse}
                            key={adressefelt.id}
                            value={adressefelt.value}
                            onChange={onMailadresseChange(adressefelt.id)}
                            error={adressefelt.feilmelding}
                        />
                    ))}
                    <Button
                        variant="secondary"
                        size="small"
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
                        onChange={(event) => setBeskjed(event.target.value)}
                    />
                </div>
                <div className={css.knapper}>
                    <Button
                        variant="primary"
                        disabled={delestatus === Nettstatus.LasterInn}
                        loading={delestatus === Nettstatus.LasterInn}
                        onClick={handleDelClick}
                    >
                        Del
                    </Button>
                    <Button variant="secondary" onClick={() => onClose(false)}>
                        Avbryt
                    </Button>
                </div>
                {delestatus === Nettstatus.Feil && (
                    <Label size="small" className={css.feilmelding}>
                        Kunne ikke dele med arbeidsgiver akkurat nå
                    </Label>
                )}
            </div>
        </Modal>
    );
};

const validerEpostadresse = (adresse: Mailadresse) => {
    if (adresse.id === 0 && !adresse.value.trim()) {
        return {
            ...adresse,
            feilmelding: 'Feltet er påkrevd',
        };
    } else if (!erGyldigEpost(adresse.value.trim())) {
        return {
            ...adresse,
            feilmelding: 'Mailadressen er ugyldig',
        };
    } else if (inneholderSærnorskeBokstaver(adresse.value.trim())) {
        return {
            ...adresse,
            feilmelding: 'Særnorske bokstaver i e-postadresse støttes ikke',
        };
    }

    return adresse;
};

const sendAmplitudeEventForPresentertKandidatliste = (
    kandidatliste: Kandidatliste,
    kandidaterSomSkalDeles: string[]
) => {
    const opprettetDato = new Date(kandidatliste.opprettetTidspunkt);
    const forskjellMs = new Date().getTime() - opprettetDato.getTime();
    const antallDagerSidenOpprettelse = Math.round(forskjellMs / 1000 / 60 / 60 / 24);

    sendEvent('kandidatliste', 'presenter_kandidater', {
        antallKandidater: kandidaterSomSkalDeles.length,
        totaltAntallKandidater: kandidatliste.kandidater.length,
        antallDagerSidenOpprettelse,
        erFørstePresentering: kandidatliste.kandidater.every(
            (kandidat) => kandidat.utfallsendringer.length === 0
        ),
        stillingskategori: kandidatliste.stillingskategori,
    });
};

export default PresenterKandidaterModal;
