import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { Nettstatus } from 'felles/nettressurs';
import AppState from '../../state/AppState';
import IkkeFunnet from './ikke-funnet/IkkeFunnet';
import Sidefeil from '../../komponenter/sidefeil/Sidefeil';
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

    return <Sidefeil feilmelding="Klarte ikke å hente kandidatens CV" />;
};

export default CvSide;
