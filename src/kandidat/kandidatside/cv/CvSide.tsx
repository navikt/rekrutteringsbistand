import { FunctionComponent } from 'react';

import { Alert, BodyLong, Heading } from '@navikt/ds-react';
import Sidelaster from 'felles/komponenter/sidelaster/Sidelaster';
import { useParams } from 'react-router';
import { useLookupCv } from '../../../api/kandidat-søk-api/lookupCv';
import css from './CvSide.module.css';
import Erfaringer from './cv/Erfaringer';
import Fagbrev from './cv/Fagbrev';
import Førerkort from './cv/Førerkort';
import Godkjenninger from './cv/Godkjenninger';
import Kompetanse from './cv/Kompetanse';
import Kurs from './cv/Kurs';
import Sammendrag from './cv/Sammendrag';
import Språk from './cv/Språk';
import Utdanning from './cv/Utdanning';
import Jobbønsker from './cv/jobbønsker/Jobbønsker';

const CvSide: FunctionComponent = () => {
    const { kandidatnr } = useParams();

    const { cv, error, isLoading } = useLookupCv(kandidatnr);

    if (isLoading) {
        return <Sidelaster />;
    }

    if (error?.message === '403') {
        return (
            <div className={css.side}>
                <div className={css.wrapper}>
                    <Alert variant="error">
                        <Heading size="medium">Ingen tilgang</Heading>
                        <p>Tilgangen ble avvist fordi brukeren har adressebeskyttelse</p>
                    </Alert>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={css.side}>
                <div className={css.wrapper}>
                    <Alert variant="error">
                        <Heading size="medium">
                            Vi klarte ikke å laste inn detaljer om kandidaten
                        </Heading>
                        <div>
                            <BodyLong size="medium" spacing>
                                Det kan være fordi de har fått en ny status, eller på grunn av feil
                                i systemene våre.
                            </BodyLong>
                            <BodyLong size="medium" spacing>
                                Sjekk statusen til kandidaten i Modia-Arbeidsrettet Oppfølging.
                                Etterpå kan du prøve å laste inn denne siden på nytt.
                            </BodyLong>
                            <BodyLong size="medium">
                                Hvis feilen vedvarer kan du kontakte brukerstøtte til
                                rekrutteringsbistand for å få hjelp med feilen.
                            </BodyLong>
                        </div>
                    </Alert>
                </div>
            </div>
        );
    }

    if (cv) {
        return (
            <div className={css.side}>
                <div className={css.wrapper}>
                    <div className={css.mosaik}>
                        <div className={css.kolonne}>
                            <Jobbønsker cv={cv} />
                            <Sammendrag cv={cv} />
                            <Kompetanse cv={cv} />
                            <Utdanning cv={cv} />
                            <Fagbrev cv={cv} />
                            <Erfaringer cv={cv} />
                        </div>
                        <div className={css.kolonne}>
                            <Førerkort cv={cv} />
                            <Godkjenninger cv={cv} />
                            <Språk cv={cv} />
                            <Kurs cv={cv} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={css.side}>
            <div className={css.wrapper}>
                <Alert variant="error">
                    <Heading size="medium">Vi klarte ikke å vise detaljer om kandidaten</Heading>
                    <div>
                        <BodyLong size="medium" spacing>
                            Det kan være fordi kandidaten mangler informasjon på CVen, fordi de har
                            fått en ny status, eller på grunn av feil i systemene våre.
                        </BodyLong>
                        <BodyLong size="medium" spacing>
                            Sjekk om kandidaten har fylt ut CVen sin i Modia-Arbeidsrettet
                            Oppfølging. Etterpå kan du prøve å laste inn denne siden på nytt.
                        </BodyLong>
                        <BodyLong size="medium">
                            Hvis feilen vedvarer kan du kontakte brukerstøtte til
                            rekrutteringsbistand for å få hjelp med feilen.
                        </BodyLong>
                    </div>
                </Alert>
            </div>
        </div>
    );
};

export default CvSide;
