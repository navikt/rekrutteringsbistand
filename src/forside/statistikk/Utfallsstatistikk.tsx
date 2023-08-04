import { EyeIcon, HandshakeIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';
import statistikkCss from './Statistikk.module.css';
import Telling from './Telling';
import useUtfallsstatistikk from './useUtfallsstatistikk';
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

    return (
        <div>
            <div className={statistikkCss.tall}>
                <Telling
                    tall={antallFåttJobben}
                    beskrivelse="Delt med arbeidsgiver"
                    ikon={<EyeIcon aria-hidden />}
                />

                <Telling
                    tall={antallPresentert}
                    beskrivelse="Fikk jobb"
                    ikon={<HandshakeIcon aria-hidden />}
                />
            </div>
        </div>
    );
};

export default Utfallsstatistikk;
