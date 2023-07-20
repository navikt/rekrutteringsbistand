import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { Nettstatus } from 'felles/nettressurs';
import AppState from '../../state/AppState';
import Jobbprofil from './jobbprofil/Jobbprofil';
import KandidatCv from './cv/Cv';
import IkkeFunnet from './ikke-funnet/IkkeFunnet';
import Sidelaster from '../../komponenter/sidelaster/Sidelaster';
import Sidefeil from '../../komponenter/sidefeil/Sidefeil';
import css from './CvSide.module.css';

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
            <main className={css.side}>
                <div className={css.innhold}>
                    <Jobbprofil cv={cv.data} />
                    <KandidatCv cv={cv.data} />
                </div>
            </main>
        );
    }

    return <Sidefeil feilmelding="Klarte ikke å hente kandidatens CV" />;
};

export default CvSide;
