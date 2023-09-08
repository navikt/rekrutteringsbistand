import { Alert, BodyLong, Button, Modal } from '@navikt/ds-react';
import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Enhetsregistertreff } from 'felles/domene/stilling/Enhetsregister';
import { Stillingskategori } from 'felles/domene/stilling/Stilling';
import { State } from '../redux/store';
import { REDIGERINGSMODUS_QUERY_PARAM } from '../stilling/Stilling';
import { CREATE_AD } from '../stilling/adReducer';
import css from './OpprettNyStilling.module.css';
import VelgArbeidsgiver from './VelgArbeidsgiver';
import VelgStillingskategori from './VelgStillingskategori';

type Props = {
    onClose: () => void;
};

const OpprettNyStilling: FunctionComponent<Props> = ({ onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { hasSavedChanges } = useSelector((state: State) => state.ad);
    const stilling = useSelector((state: State) => state.ad.originalData);

    const [stillingskategori, setStillingskategori] = useState<Stillingskategori | null>(null);
    const [stillingskategorifeilmelding, setStillingskatergorifeilmelding] = useState<
        string | undefined
    >();
    const [arbeidsgiver, setArbeidsgiver] = useState<Enhetsregistertreff | null>(null);
    const [arbeidsgiverfeilmelding, setArbeidsgiverfeilmelding] = useState<string | undefined>();

    useEffect(() => {
        if (hasSavedChanges === true && stilling) {
            navigate(
                {
                    pathname: `/stillinger/stilling/${stilling.uuid}`,
                    search: `${REDIGERINGSMODUS_QUERY_PARAM}=true`,
                },
                {
                    replace: true,
                }
            );
        }
        // eslint-disable-next-line
    }, [hasSavedChanges, stilling]);

    const onOpprettClick = () => {
        if (stillingskategori === null || arbeidsgiver === null) {
            if (stillingskategori === null) {
                setStillingskatergorifeilmelding('Du må velge en stillingskategori');
            }

            if (arbeidsgiver === null) {
                setArbeidsgiverfeilmelding('Du må velge en arbeidsgiver');
            }

            return;
        }
        dispatch({
            type: CREATE_AD,
            kategori: stillingskategori,
            arbeidsgiver: arbeidsgiver,
        });
    };

    const onStillingkategoriChange = (valgtKategori: Stillingskategori) => {
        setStillingskatergorifeilmelding(undefined);
        setStillingskategori(valgtKategori);
    };

    return (
        <Modal
            open
            onClose={onClose}
            aria-label="Opprett ny stilling, velg kategori"
            header={{ heading: 'Opprett ny stilling' }}
        >
            <Modal.Body>
                <Alert variant="warning" className={css.advarsel}>
                    <BodyLong spacing>
                        Det arbeides fremdeles med å avklare hva som er lov å registrere i
                        Rekrutteringsbistand. Derfor kan du ikke registrere NAV-kurs, webinar,
                        arbeidstrening og lignende. Det er kun kategoriene nedenfor som skal brukes.
                    </BodyLong>
                    <BodyLong>
                        Du kan ikke endre stillingskategori eller arbeidsgiver etter stillingen er
                        opprettet.
                    </BodyLong>
                </Alert>
                <VelgStillingskategori
                    stillingskategori={stillingskategori}
                    onChange={onStillingkategoriChange}
                    feilmelding={stillingskategorifeilmelding}
                />
                <VelgArbeidsgiver
                    arbeidsgiver={arbeidsgiver}
                    setArbeidsgiver={setArbeidsgiver}
                    feilmelding={arbeidsgiverfeilmelding}
                    setFeilmelding={setArbeidsgiverfeilmelding}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onOpprettClick} className={css.opprettKnapp}>
                    Opprett
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default OpprettNyStilling;
