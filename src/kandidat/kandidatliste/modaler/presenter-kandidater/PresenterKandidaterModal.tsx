import {
    Accordion,
    Alert,
    BodyLong,
    Button,
    Chips,
    ErrorMessage,
    Heading,
    Link,
    Textarea,
} from '@navikt/ds-react';
import { sendEvent } from 'felles/amplitude';
import KandidatIKandidatliste from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import { Nettstatus } from 'felles/nettressurs';
import useNavKontor from 'felles/store/navKontor';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postDelteKandidater } from '../../../api/api';
import Modal from '../../../komponenter/modal/Modal';
import { VarslingActionType } from '../../../varsling/varslingReducer';
import { kandidaterMåGodkjenneDelingAvCv } from '../../domene/kandidatlisteUtils';
import KandidatlisteActionType from '../../reducer/KandidatlisteActionType';
import LeggTilEpostadresse from './LeggTilEpostadresse';
import css from './PresenterKandidaterModal.module.css';

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
    const [melding, setMelding] = useState<string>('');
    const [epostadresser, setEpostadresser] = useState<string[]>([]);
    const [epostFeilmelding, setEpostFeilmelding] = useState<string | undefined>();

    const resetState = () => {
        setMelding('');
        setDelestatus(Nettstatus.IkkeLastet);
        setEpostadresser([]);
    };

    const presenterKandidater = async (kandidatnumre: Array<string>) => {
        setDelestatus(Nettstatus.SenderInn);

        const response = await postDelteKandidater(
            melding,
            epostadresser,
            kandidatliste.kandidatlisteId,
            kandidatnumre,
            valgtNavKontor
        );

        if (response.kind === Nettstatus.Suksess) {
            const prefix = markerteKandidater.length > 1 ? 'Kandidatene' : 'Kandidaten';
            const melding = prefix + ' er delt med arbeidsgiver';

            dispatch({
                type: KandidatlisteActionType.PresenterKandidaterSuccess,
                kandidatliste: response.data,
            });

            dispatch({
                type: VarslingActionType.VisVarsling,
                innhold: melding,
            });

            sendAmplitudeEventForPresentertKandidatliste(kandidatliste, kandidatnumre);
            resetState();

            onClose(true);
        } else {
            if (response.kind === Nettstatus.Feil) {
                console.error('Det skjedde en feil:', response.error.message);
            }

            setDelestatus(Nettstatus.Feil);
        }
    };

    const handleDelClick = () => {
        if (valgtNavKontor !== null) {
            if (epostadresser.length > 0) {
                const kandidaterSomSkalDeles = kandidaterMåGodkjenneDelingAvCv(kandidatliste)
                    ? kandidaterSomHarSvartJa.map((k) => k.kandidatnr)
                    : markerteKandidater.map((kandidat) => kandidat.kandidatnr);

                presenterKandidater(kandidaterSomSkalDeles);
            } else {
                setEpostFeilmelding('Oppgi minst én e-postadresse');
            }
        }
    };

    const handleLeggTilEpost = (adresse: string) => {
        const adresserUtenDuplikater = new Set([...epostadresser, adresse]);

        console.log('Hey ho:', Array.from(adresserUtenDuplikater));

        setEpostadresser(Array.from(adresserUtenDuplikater));
    };

    const handleSlettEpost = (index: number) => {
        setEpostadresser(epostadresser.filter((_, searchIndex) => searchIndex !== index));
    };

    const antallSomSkalDeles = alleKandidaterMåGodkjenneForespørselOmDelingAvCvForÅPresentere
        ? kandidaterSomHarSvartJa.length
        : markerteKandidater.length;

    const antallKandidaterSomIkkeKanDeles =
        markerteKandidater.length - kandidaterSomHarSvartJa.length;

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
                    Send en e-post med {antallSomSkalDeles} kandidater med arbeidsgiveren.
                </BodyLong>

                <div className={css.epostadresser}>
                    <LeggTilEpostadresse
                        onLeggTil={handleLeggTilEpost}
                        feilmelding={epostFeilmelding}
                    />

                    {epostadresser.length > 0 && (
                        <Chips>
                            {epostadresser.map((adresse, index) => (
                                <Chips.Removable
                                    key={adresse}
                                    onDelete={() => handleSlettEpost(index)}
                                >
                                    {adresse}
                                </Chips.Removable>
                            ))}
                        </Chips>
                    )}
                </div>

                <div>
                    <Textarea
                        label="Melding til arbeidsgiver (frivillig)"
                        value={melding}
                        description="Sørg for at du ikke skriver noe sensitivt. For eksempel opplysninger om helse, soning, rus, eller informasjon om NAV-ytelser og oppfølging."
                        onChange={(event) => setMelding(event.target.value)}
                    />
                </div>
                <Accordion>
                    <Accordion.Item>
                        <Accordion.Header>Forhåndsvis e-posten</Accordion.Header>
                        <Accordion.Content>TODO</Accordion.Content>
                    </Accordion.Item>
                </Accordion>
                <div className={css.knapper}>
                    <Button variant="secondary" onClick={() => onClose(false)}>
                        Avbryt
                    </Button>
                    <Button
                        variant="primary"
                        disabled={delestatus === Nettstatus.SenderInn}
                        loading={delestatus === Nettstatus.SenderInn}
                        onClick={handleDelClick}
                    >
                        Del kandidatene
                    </Button>
                </div>
                {delestatus === Nettstatus.Feil && (
                    <ErrorMessage>Kunne ikke dele med arbeidsgiver akkurat nå</ErrorMessage>
                )}
            </div>
        </Modal>
    );
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
