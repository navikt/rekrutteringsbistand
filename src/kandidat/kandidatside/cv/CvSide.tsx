import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { Nettstatus } from 'felles/nettressurs';
import Sidelaster from '../../../felles/komponenter/sidelaster/Sidelaster';
import Sidefeil from '../../komponenter/sidefeil/Sidefeil';
import AppState from '../../state/AppState';
import css from './CvSide.module.css';
import Cv from './cv/Cv';
import IkkeFunnet from './ikke-funnet/IkkeFunnet';
import Jobbprofil from './jobbprofil/Jobbprofil';

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
                <Jobbprofil cv={cv.data} />
                <Cv cv={cv.data} />
            </div>
        );
    }

    return <Sidefeil feilmelding="Klarte ikke å hente kandidatens CV" />;
};

export default CvSide;
