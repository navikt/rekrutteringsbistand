import {
    Alert,
    BodyLong,
    Button,
    Checkbox,
    CheckboxGroup,
    UNSAFE_Combobox as Combobox,
    Modal,
    Radio,
    RadioGroup,
} from '@navikt/ds-react';
import {
    AvvikIFritekstfelt,
    avvikIFritekstfeltTilVisningsnavn,
    avvikMedVisningsnavnTilEnum,
    Avviksrapport,
    AvviksrapportOutboundDto,
} from 'felles/domene/kandidatliste/Avviksrapport';
import { useState } from 'react';
import css from './AvviksrapporteringModal.module.css';
import { api, post } from 'felles/api';
import useNavKontor from 'felles/store/navKontor';
import { ikkeLastet, lasterInn, Nettressurs, Nettstatus } from 'felles/nettressurs';

type Props = {
    vis: boolean;
    onClose: () => void;
};

const AvviksrapporteringModal = ({ vis, onClose }: Props) => {
    const [detHarVærtBrudd, setDetHarVærtBrudd] = useState<boolean | null>(null);
    const [typerBrudd, setTyperBrudd] = useState<string[]>([]);
    const [valgteAvvikIFritekstfelt, setValgteAvvikIFritekstfelt] = useState<AvvikIFritekstfelt[]>(
        []
    );
    const { navKontor } = useNavKontor();
    const [postSvar, setPostsvar] = useState<Nettressurs<Avviksrapport>>(ikkeLastet());

    const onLagreOgSendClick = async () => {
        let body: AvviksrapportOutboundDto = {
            avvikIFritekstfelt: typerBrudd.includes('avvikIFritekstfelt'),
            bruktTilFeilFormål: typerBrudd.includes('bruktTilFeilFormål'),
            forNavkontor: navKontor,
            listeOverAvvikIFritekstfelt: valgteAvvikIFritekstfelt,
        };
        setPostsvar(lasterInn());

        const svar = await post<Avviksrapport>(`${api.kandidat}/avvik`, body);
        setPostsvar(svar);
        if (svar.kind === Nettstatus.Suksess) {
            onClose();
        }
    };

    const onToggleAvvikIFritekstfelt = (avvikMedVisningsnavn: string, erValgt: boolean) => {
        const avvikSomEnum = avvikMedVisningsnavnTilEnum(avvikMedVisningsnavn);

        if (erValgt) {
            setValgteAvvikIFritekstfelt([...valgteAvvikIFritekstfelt, avvikSomEnum]);
        } else {
            setValgteAvvikIFritekstfelt(valgteAvvikIFritekstfelt.filter((a) => a !== avvikSomEnum));
        }
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
            onClose={onClose}
            header={{
                heading: 'Rapporter avvik',
            }}
        >
            <Modal.Body className={css.avvikModalBody}>
                <BodyLong spacing>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                </BodyLong>

                <RadioGroup
                    required
                    name="detHarVærtBrudd"
                    legend="Har det vært avvik i listen?"
                    value={detHarVærtBrudd}
                    onChange={setDetHarVærtBrudd}
                >
                    <Radio value={true}>Ja, det har vært avvik</Radio>
                    {detHarVærtBrudd === true && (
                        <CheckboxGroup
                            value={typerBrudd}
                            onChange={setTyperBrudd}
                            className={css.intendert}
                            legend="Hvilke typer brudd har det vært?"
                            hideLegend
                        >
                            <Checkbox value="bruktTilFeilFormål">Feil formål</Checkbox>
                            <Checkbox value="avvikIFritekstfelt">Feil i innhold</Checkbox>
                            {typerBrudd.includes('avvikIFritekstfelt') && (
                                <div className={css.intendert}>
                                    <Combobox
                                        isMultiSelect
                                        shouldAutocomplete
                                        className={css.avvikComboboks}
                                        label="Velg hvilke avvik som har skjedd i listen"
                                        options={muligeAvvikIFritekstfeltMedVisningsnavn}
                                        selectedOptions={valgteAvvikIFritekstfeltMedVisningsnavn}
                                        onToggleSelected={onToggleAvvikIFritekstfelt}
                                    />
                                </div>
                            )}
                        </CheckboxGroup>
                    )}

                    <Radio value={false}>Nei, det har ikke vært avvik</Radio>
                </RadioGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose} variant="secondary">
                    Avbryt
                </Button>
                <Button
                    onClick={onLagreOgSendClick}
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
