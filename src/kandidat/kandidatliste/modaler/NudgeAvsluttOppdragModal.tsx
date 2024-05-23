import { BodyShort, Button, Modal } from '@navikt/ds-react';
import { FunctionComponent, useEffect, useState } from 'react';

interface Props {
    antallKandidaterSomHarFåttJobb: number;
    antallStillinger: number;
    onBekreft: () => void;
    onAvbryt: () => void;
}

const NudgeAvsluttOppdragModal: FunctionComponent<Props> = ({
    antallKandidaterSomHarFåttJobb,
    antallStillinger,
    onBekreft,
    onAvbryt,
}) => {
    const [klar, setKlar] = useState<boolean>(false);

    useEffect(() => {
        const klarTimeout = setTimeout(() => {
            setKlar(true);
        }, 400);

        return () => {
            clearTimeout(klarTimeout);
        };
    }, []);

    if (!klar) {
        return null;
    }

    return (
        <Modal
            open={true}
            aria-label="Forslag om å avslutte oppdraget"
            onClose={onAvbryt}
            header={{ heading: 'Ferdig med oppdraget?' }}
        >
            <Modal.Body>
                <BodyShort spacing>
                    {antallKandidaterSomHarFåttJobb} av {antallStillinger} stilling
                    {antallStillinger === 1 ? '' : 'er'} er besatt
                </BodyShort>
                <BodyShort>Er du ferdig med oppdraget og vil avslutte?</BodyShort>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onBekreft}>Avslutt oppdrag</Button>
                <Button variant="secondary" onClick={onAvbryt}>
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NudgeAvsluttOppdragModal;
