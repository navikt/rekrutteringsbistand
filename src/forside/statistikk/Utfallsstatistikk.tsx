import { FunctionComponent } from 'react';
import Telling from './Telling';
import useUtfallsstatistikk from './useUtfallsstatistikk';
import statistikkCss from './Statistikk.module.css';
import tellingCss from './Telling.module.css';

type Props = {
    navKontor: string;
    fraOgMed: Date;
    tilOgMed: Date;
};

const Utfallsstatistikk: FunctionComponent<Props> = ({ navKontor, fraOgMed, tilOgMed }) => {
    const { antallPresentert, antallFåttJobben } = useUtfallsstatistikk(
        navKontor,
        fraOgMed,
        tilOgMed
    );

    const beskrivelseForAntallFåttJobben = `${
        antallFåttJobben === 1 ? 'person' : 'personer'
    } har fått jobb`;

    const beskrivelseForAntallPresentert = `${
        antallPresentert === 1 ? 'person' : 'personer'
    } har blitt presentert for arbeidsgiver`;

    return (
        <div>
            <div className={statistikkCss.tall}>
                <Telling
                    tall={antallFåttJobben}
                    beskrivelse={beskrivelseForAntallFåttJobben}
                    className={tellingCss.fattJobb}
                />
                <Telling
                    tall={antallPresentert}
                    beskrivelse={beskrivelseForAntallPresentert}
                    className={tellingCss.presentert}
                />
            </div>
        </div>
    );
};

export default Utfallsstatistikk;
