import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { Nettstatus } from 'felles/nettressurs';
import AppState from '../../state/AppState';
import IkkeFunnet from './ikke-funnet/IkkeFunnet';
import Sidelaster from '../../komponenter/sidelaster/Sidelaster';
import css from './CvSide.module.css';
import Jobbønsker from './jobbønsker/Jobbønsker';
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

const CvSide: FunctionComponent = () => {
    const { cv } = useSelector((state: AppState) => state.cv);

    if (cv.kind === Nettstatus.LasterInn || cv.kind === Nettstatus.IkkeLastet) {
        return <Sidelaster />;
    }

    if (cv.kind === Nettstatus.FinnesIkke) {
        return <IkkeFunnet />;
    }

    if (cv.kind === Nettstatus.Suksess) {
        return (
            <div className={css.side}>
                <div className={css.wrapper}>
                    <div className={css.mosaik}>
                        <div className={css.venstreSide}>
                            <Jobbønsker cv={cv.data} />
                            <Sammendrag cv={cv.data} />
                            <Kompetanse cv={cv.data} />
                            <Erfaringer cv={cv.data} />
                            <Utdanning cv={cv.data} />
                            <Fagbrev cv={cv.data} />
                        </div>
                        <div className={css.høyreSide}>
                            <Førerkort cv={cv.data} />
                            <Språk cv={cv.data} />
                            <Godkjenninger cv={cv.data} />
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
                    <Heading size="medium">Vi klarte ikke å hente detaljer om kandidaten</Heading>
                    <BodyLong size="medium">
                        Det kan være fordi kandidaten mangler informasjon på CVen, eller på grunn av
                        feil i systemene våre. Sjekk om kandidaten har fyllt ut CVen sin i
                        Modia-Arbeidsrettet Oppfølging. Etterpå kan du prøve å laste inn denne siden
                        på nytt. Hvis feilen vedvarer kan du kontakte brukerstøtte til
                        rekrutteringsbitand for å få hjelp med feilen.
                    </BodyLong>
                </Alert>
            </div>
        </div>
    );
};

export default CvSide;
