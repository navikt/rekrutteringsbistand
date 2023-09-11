import { FunctionComponent } from 'react';

import { Nettstatus } from 'felles/nettressurs';
import Sidelaster from 'felles/komponenter/sidelaster/Sidelaster';
import css from './CvSide.module.css';
import Jobbønsker from './cv/jobbønsker/Jobbønsker';
import Erfaringer from './cv/Erfaringer';
import Utdanning from './cv/Utdanning';
import Fagbrev from './cv/Fagbrev';
import Førerkort from './cv/Førerkort';
import Språk from './cv/Språk';
import Godkjenninger from './cv/Godkjenninger';
import Kurs from './cv/Kurs';
import Sammendrag from './cv/Sammendrag';
import Kompetanse from './cv/Kompetanse';
import { Alert, BodyLong, Heading } from '@navikt/ds-react';
import { useParams } from 'react-router-dom';
import useCv from '../hooks/useCv';

const CvSide: FunctionComponent = () => {
    const { kandidatnr } = useParams<{ kandidatnr: string }>();
    const cv = useCv(kandidatnr!);

    if (cv.kind === Nettstatus.LasterInn || cv.kind === Nettstatus.IkkeLastet) {
        return <Sidelaster />;
    }

    if (cv.kind === Nettstatus.FinnesIkke) {
        return (
            <div className={css.side}>
                <div className={css.wrapper}>
                    <Alert variant="warning">
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

    if (cv.kind === Nettstatus.Suksess) {
        return (
            <div className={css.side}>
                <div className={css.wrapper}>
                    <div className={css.mosaik}>
                        <div className={css.kolonne}>
                            <Jobbønsker cv={cv.data} />
                            <Sammendrag cv={cv.data} />
                            <Kompetanse cv={cv.data} />
                            <Utdanning cv={cv.data} />
                            <Fagbrev cv={cv.data} />
                            <Erfaringer cv={cv.data} />
                        </div>
                        <div className={css.kolonne}>
                            <Førerkort cv={cv.data} />
                            <Godkjenninger cv={cv.data} />
                            <Språk cv={cv.data} />
                            <Kurs cv={cv.data} />
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
