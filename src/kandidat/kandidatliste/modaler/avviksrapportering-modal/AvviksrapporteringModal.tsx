import {
    BodyLong,
    Button,
    Checkbox,
    CheckboxGroup,
    Modal,
    Radio,
    RadioGroup,
} from '@navikt/ds-react';
import { useState } from 'react';
import css from './AvviksrapporteringModal.module.css';

type Props = {
    vis: boolean;
    onClose: () => void;
};

const AvviksrapporteringModal = ({ vis, onClose }: Props) => {
    const [detHarVærtBrudd, setDetHarVærtBrudd] = useState<boolean | null>(null);
    const [typerBrudd, setTyperBrudd] = useState<string[]>([]);

    return (
        <Modal
            className={css.avviksrapportering}
            open={vis}
            onClose={onClose}
            header={{
                heading: 'Rapporter avvik',
            }}
        >
            <Modal.Body>
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
                                <div className={css.intendert}>Placeholder for Combobox</div>
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
                <Button>Lagre og send</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AvviksrapporteringModal;
