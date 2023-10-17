import {
    Alert,
    BodyLong,
    Button,
    Checkbox,
    CheckboxGroup,
    UNSAFE_Combobox as Combobox,
    Label,
    Modal,
    Radio,
    RadioGroup,
    ReadMore,
} from '@navikt/ds-react';
import { sendEvent } from 'felles/amplitude';
import { api, post } from 'felles/api';
import {
    AvvikIFritekstfelt,
    Avviksrapport,
    AvviksrapportOutboundDto,
    avvikIFritekstfeltTilVisningsnavn,
    avvikMedVisningsnavnTilEnum,
} from 'felles/domene/kandidatliste/Avviksrapport';
import { Nettressurs, Nettstatus, ikkeLastet, lasterInn } from 'felles/nettressurs';
import useNavKontor from 'felles/store/navKontor';
import { useEffect, useState } from 'react';
import css from './AvviksrapporteringModal.module.css';

type IAvviksrapporteringModal = {
    kandidatlisteId: string;
    vis: boolean;
    onLagreAvvik: (avvik: Nettressurs<Avviksrapport>) => void;
    onClose: () => void;
};

const AvviksrapporteringModal = ({
    vis,
    onLagreAvvik,
    onClose,
    kandidatlisteId,
}: IAvviksrapporteringModal) => {
    const [detHarVærtBrudd, setDetHarVærtBrudd] = useState<boolean | null>(null);
    const [typerBrudd, setTyperBrudd] = useState<string[]>([]);
    const [valgteAvvikIFritekstfelt, setValgteAvvikIFritekstfelt] = useState<AvvikIFritekstfelt[]>(
        []
    );
    const { navKontor } = useNavKontor();
    const [postSvar, setPostsvar] = useState<Nettressurs<Avviksrapport>>(ikkeLastet());
    const [valideringsfeilDetHarVærtBrudd, setValideringsfeilDetHarVærtBruddDetHarVærtBrudd] =
        useState<string | null>(null);
    const [valideringsfeilTyperBrudd, setValideringsfeilTyperBrudd] = useState<string | null>(null);
    const [valideringsfeilBruddIFritekst, setValideringsfeilBruddIFritekst] = useState<
        string | null
    >(null);

    useEffect(() => {
        if (vis === true) {
            sendEvent('avviksrapportering', 'åpne_modal');
        }
    }, [vis]);

    const validerRapport = (): boolean => {
        const detErAvvikIFritekstfelt = typerBrudd.includes('avvikIFritekstfelt');
        const listenErBruktTilFeilFormål = typerBrudd.includes('bruktTilFeilFormål');

        if (detHarVærtBrudd === null) {
            setValideringsfeilDetHarVærtBruddDetHarVærtBrudd(
                'Du må først svare på om det har vært brudd'
            );
        } else if (
            detHarVærtBrudd === true &&
            !detErAvvikIFritekstfelt &&
            !listenErBruktTilFeilFormål
        ) {
            setValideringsfeilTyperBrudd(
                'Du må først svare på om det har vært feil formål eller feil i innhold'
            );
        } else if (
            detHarVærtBrudd === true &&
            detErAvvikIFritekstfelt &&
            valgteAvvikIFritekstfelt.length === 0
        ) {
            setValideringsfeilBruddIFritekst(
                'Du må først svare på hvilke typer brudd det har vært'
            );
        } else {
            return true;
        }

        return false;
    };

    const onLagreOgSendClick = async () => {
        if (validerRapport() === false) {
            return;
        }

        let outboundDto: AvviksrapportOutboundDto = {
            kandidatlisteId: kandidatlisteId,
            avvikIFritekstfelt: typerBrudd.includes('avvikIFritekstfelt'),
            bruktTilFeilFormål: typerBrudd.includes('bruktTilFeilFormål'),
            forNavkontor: navKontor,
            listeOverAvvikIFritekstfelt: valgteAvvikIFritekstfelt,
        };

        setPostsvar(lasterInn());
        const svar = await post<Avviksrapport>(`${api.kandidat}/avvik`, outboundDto);
        setPostsvar(svar);

        if (svar.kind === Nettstatus.Suksess) {
            sendEvent('avviksrapportering', 'rapporterte_avvik');

            onLagreAvvik(svar);
            onClose();
        }
    };

    const handleAvvikIFritekstfeltToggle = (avvikMedVisningsnavn: string, erValgt: boolean) => {
        setValideringsfeilBruddIFritekst(null);
        const avvikSomEnum = avvikMedVisningsnavnTilEnum(avvikMedVisningsnavn);

        if (erValgt) {
            setValgteAvvikIFritekstfelt([...valgteAvvikIFritekstfelt, avvikSomEnum]);
        } else {
            setValgteAvvikIFritekstfelt(valgteAvvikIFritekstfelt.filter((a) => a !== avvikSomEnum));
        }
    };

    const handleDetHarVærtBruddChange = (verdi: boolean) => {
        setDetHarVærtBrudd(verdi);
        setValideringsfeilDetHarVærtBruddDetHarVærtBrudd(null);
    };
    const handleTyperBruddChange = (verdi: string[]) => {
        setTyperBrudd(verdi);
        setValideringsfeilTyperBrudd(null);
    };

    const muligeAvvikIFritekstfeltMedVisningsnavn = Object.values(AvvikIFritekstfelt).map(
        (avvikskategori) => avvikIFritekstfeltTilVisningsnavn(avvikskategori)
    );

    const valgteAvvikIFritekstfeltMedVisningsnavn = valgteAvvikIFritekstfelt.map((valgtAvvik) =>
        avvikIFritekstfeltTilVisningsnavn(valgtAvvik)
    );

    return (
        <Modal
            className={css.avviksrapportering}
            open={vis}
            onClose={() => onClose()}
            header={{
                heading: 'Rapporter personvernavvik',
            }}
        >
            <Modal.Body className={css.avvikModalBody}>
                {/* //TODO Husk å endre */}
                <BodyLong>Listen innebærer et personvernavvik dersom:</BodyLong>
                <BodyLong as="ul" spacing>
                    <li>
                        Listen faller utenfor formålet med Rekrutteringsbistand, dvs. at listen ikke
                        er koblet til arbeidsformidling
                    </li>

                    <li>
                        <div className={css.punktMedHjelpetekst}>
                            Og/eller notatfeltet eller listenavnet inneholder personopplysninger med
                            høy sensitivitetsgrad, for eksempel særlige kategorier av
                            personopplysninger.
                        </div>
                    </li>
                </BodyLong>
                <BodyLong spacing>
                    Dersom listen identifiserer mottakere av sosiale tjenester, må dette rapporteres
                    til NAV-leder for videre håndtering. Opplysninger som er journalføringspliktige
                    må flyttes til riktig fagsystem. Vær oppmerksom på at kommunale opplysninger
                    ikke skal i statlige fagsystem og omvendt.
                </BodyLong>
                <Label as="p" spacing>
                    Alle lister som innebærer personvernavvik, skal slettes i sin helhet etter at
                    listen er rapportert inn.
                </Label>
                <ReadMore
                    className={css.lesMer}
                    header="Hva er personopplysninger med høy sensitivitetsgrad?"
                >
                    <BodyLong>
                        Med personopplysninger med høy sensitivitetsgrad mener vi her opplysninger
                        om:
                    </BodyLong>
                    <BodyLong as="ul">
                        <li>Etnisitet</li>
                        <li>Religion</li>
                        <li>Seksuell legning</li>
                        <li>
                            Helseopplysninger, som f.eks. diagnoser, sykdomshistorikk,
                            rusproblematikk, psykiske lidelser, Funksjonsnedsettelse
                        </li>
                        <li>
                            Straffehistorikk, som f.eks. fengselsopphold, soningshistorikk,
                            domfellelse
                        </li>
                        <li>
                            Sosiale og økonomiske forhold som eks. sosial tilpasningsdyktighet,
                            offentlige ytelser, kontakt med andre offentlige myndigheter for
                            eksempel barnevern, PPT-tjenesten
                        </li>
                        <li>
                            Subjektive negative refleksjoner angående bruker, som f.eks. «Deltaker
                            anses for å være lite skikket til arbeid på nåværende tidspunkt.» eller
                            «Deltaker anses for å fungere dårlig i samarbeid.»
                        </li>
                        <li>
                            Sensitive personopplysninger om tredjepersoner (for eksempel barn,
                            ektefelle)
                        </li>
                    </BodyLong>
                </ReadMore>

                <RadioGroup
                    required
                    name="detHarVærtBrudd"
                    legend="Er det personvernavvik i listen?"
                    value={detHarVærtBrudd}
                    onChange={handleDetHarVærtBruddChange}
                    error={valideringsfeilDetHarVærtBrudd}
                >
                    <Radio
                        description="En liste kan både være i strid med formålet, og inneholde personopplysninger med høy sensitivitetsgrad. I så fall må 
begge alternativer hukes av."
                        value={true}
                    >
                        Ja, det foreligger personvernavvik
                    </Radio>
                    {detHarVærtBrudd === true && (
                        <CheckboxGroup
                            value={typerBrudd}
                            onChange={handleTyperBruddChange}
                            error={valideringsfeilTyperBrudd}
                            className={css.intendert}
                            legend="Hvilke typer brudd har det vært?"
                            hideLegend
                        >
                            <Checkbox value="bruktTilFeilFormål">
                                Listen er i strid med formålet til Rekrutteringsbistand
                            </Checkbox>
                            <Checkbox value="avvikIFritekstfelt">
                                Listen inneholder personopplysninger med høy sensitivitetsgrad i
                                notatfelt eller navnet på listen
                            </Checkbox>
                            {typerBrudd.includes('avvikIFritekstfelt') && (
                                <div className={css.intendert}>
                                    <Combobox
                                        isMultiSelect
                                        shouldAutocomplete
                                        className={css.avvikComboboks}
                                        label="Velg hvilke personopplysninger som er delt i listen eller listenavnet"
                                        options={muligeAvvikIFritekstfeltMedVisningsnavn}
                                        selectedOptions={valgteAvvikIFritekstfeltMedVisningsnavn}
                                        onToggleSelected={handleAvvikIFritekstfeltToggle}
                                        error={valideringsfeilBruddIFritekst}
                                    />
                                </div>
                            )}
                        </CheckboxGroup>
                    )}

                    <Radio value={false}>Nei, listen utgjør ikke et personvernavvik</Radio>
                </RadioGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    disabled={postSvar.kind === Nettstatus.LasterInn}
                    onClick={onClose}
                    variant="secondary"
                >
                    Avbryt
                </Button>
                <Button
                    onClick={onLagreOgSendClick}
                    disabled={postSvar.kind === Nettstatus.LasterInn}
                    loading={postSvar.kind === Nettstatus.LasterInn}
                >
                    Lagre og send
                </Button>
            </Modal.Footer>
            {postSvar.kind === Nettstatus.Feil && (
                <Alert variant="error" size="small">
                    <span>Kunne ikke lagre avvik. Prøv igjen senere.</span>
                    <span> Feilmelding: {postSvar.error.message}</span>
                </Alert>
            )}
        </Modal>
    );
};

export default AvviksrapporteringModal;
