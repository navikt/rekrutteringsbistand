import { Alert, BodyShort, Label } from '@navikt/ds-react';
import { useRouteError } from 'react-router-dom';
import css from './Appfeil.module.css';

const Appfeil = () => {
    const error = useRouteError();

    return (
        <div className={css.appfeil}>
            <Alert variant="error">
                <Label as="p">Det skjedde en feil</Label>
                <BodyShort spacing>Vennligst prøv igjen senere</BodyShort>

                <Label as="p">Teknisk beskrivelse</Label>
                <BodyShort className={css.feilmelding}>
                    {String(error) ?? 'Det skjedde en uventet feil'}
                </BodyShort>
            </Alert>
        </div>
    );
};

export default Appfeil;
