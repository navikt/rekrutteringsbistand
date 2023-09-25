import { EyeIcon, HandshakeIcon } from '@navikt/aksel-icons';
import { BodyShort, ErrorMessage, Skeleton } from '@navikt/ds-react';
import { erIkkeProd } from 'felles/miljø';
import { Nettstatus } from 'felles/nettressurs';
import { FunctionComponent } from 'react';
import statistikkCss from './Statistikk.module.css';
import Telling from './Telling';
import useUtfallsstatistikk, {
    Antall,
    Utfallsstatistikk as UtfallsstatistikkType,
} from './useUtfallsstatistikk';

type Props = {
    navKontor: string;
    fraOgMed: Date;
    tilOgMed: Date;
};

const Utfallsstatistikk: FunctionComponent<Props> = ({ navKontor, fraOgMed, tilOgMed }) => {
    const statistikk = useUtfallsstatistikk(navKontor, fraOgMed, tilOgMed);

    if (statistikk.kind === Nettstatus.Feil) {
        return <ErrorMessage>{statistikk.error.message}</ErrorMessage>;
    }

    let data: UtfallsstatistikkType | undefined;
    if (statistikk.kind === Nettstatus.Suksess) {
        data = statistikk.data;
    }
    return (
        <div className={statistikkCss.tall}>
            <Telling
                tall={data?.antPresentasjoner.totalt}
                beskrivelse="Delt med arbeidsgiver"
                ikon={<EyeIcon aria-hidden />}
                detaljer={erIkkeProd && <AntallPrioriterte antall={data?.antPresentasjoner} />}
            />

            <Telling
                tall={data?.antFåttJobben.totalt}
                beskrivelse="Fikk jobb"
                ikon={<HandshakeIcon aria-hidden />}
                detaljer={erIkkeProd && <AntallPrioriterte antall={data?.antFåttJobben} />}
            />
        </div>
    );
};

const AntallPrioriterte = ({ antall }: { antall?: Antall }) => {
    if (antall !== undefined) {
        return (
            <BodyShort size="small" className={statistikkCss.talldetaljer}>
                {antall.under30år} var under 30 år &nbsp;&bull;&nbsp;{' '}
                {antall.innsatsgruppeIkkeStandard} hadde ikke standardinnsats
            </BodyShort>
        );
    } else {
        return <Skeleton width={100} />;
    }
};

export default Utfallsstatistikk;
