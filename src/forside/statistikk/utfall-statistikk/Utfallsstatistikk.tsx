import { EyeIcon, HandshakeIcon } from '@navikt/aksel-icons';
import { BodyShort, ErrorMessage, Loader, Skeleton } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { useUtfallsstatistikk } from '../../../api/statistikk-api/hooks/useUtfallsstatistikk';
import { AntallDTO } from '../../../api/statistikk-api/statistikk.dto';
import statistikkCss from '../Statistikk.module.css';
import Telling from './Telling';

type Props = {
    navKontor: string;
    fraOgMed: Date;
    tilOgMed: Date;
};

const Utfallsstatistikk: FunctionComponent<Props> = ({ navKontor, fraOgMed, tilOgMed }) => {
    const statistikk = useUtfallsstatistikk({ navKontor, fraOgMed, tilOgMed });

    if (statistikk.isLoading || statistikk.isValidating) {
        return <Loader />;
    }

    if (statistikk.error) {
        return (
            <ErrorMessage>
                {statistikk.error?.message ?? 'Feil ved lasting av statistikk'}
            </ErrorMessage>
        );
    }

    return (
        <div className={statistikkCss.tall}>
            <Telling
                tall={statistikk.data?.antPresentasjoner.totalt}
                beskrivelse="Delt med arbeidsgiver"
                ikon={<EyeIcon aria-hidden />}
                detaljer={<AntallPrioriterte antall={statistikk.data?.antPresentasjoner} />}
            />

            <Telling
                tall={statistikk.data?.antFåttJobben.totalt}
                beskrivelse="Fikk jobb"
                ikon={<HandshakeIcon aria-hidden />}
                detaljer={<AntallPrioriterte antall={statistikk.data?.antFåttJobben} />}
            />
        </div>
    );
};

const AntallPrioriterte = ({ antall }: { antall?: AntallDTO }) => {
    if (antall !== undefined) {
        return (
            <BodyShort size="small" as="ul" className={statistikkCss.talldetaljer}>
                <li>{antall.under30år} var under 30 år</li>
                <li>{antall.innsatsgruppeIkkeStandard} hadde ikke standardinnsats</li>
            </BodyShort>
        );
    } else {
        return <Skeleton width={100} />;
    }
};

export default Utfallsstatistikk;
