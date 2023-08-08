import { EyeIcon, HandshakeIcon } from '@navikt/aksel-icons';
import { BodyShort, ErrorMessage, Skeleton } from '@navikt/ds-react';
import { erIkkeProd } from 'felles/miljø';
import { Nettstatus } from 'felles/nettressurs';
import { FunctionComponent } from 'react';
import statistikkCss from './Statistikk.module.css';
import Telling from './Telling';
import useUtfallsstatistikk, {
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
                tall={data?.antallPresentert}
                beskrivelse="Delt med arbeidsgiver"
                ikon={<EyeIcon aria-hidden />}
                detaljer={
                    erIkkeProd && (
                        <AntallPrioriterte antall={data?.antallPresentertIPrioritertMålgruppe} />
                    )
                }
            />

            <Telling
                tall={data?.antallFåttJobben}
                beskrivelse="Fikk jobb"
                ikon={<HandshakeIcon aria-hidden />}
                detaljer={
                    erIkkeProd && (
                        <AntallPrioriterte antall={data?.antallFåttJobbenIPrioritertMålgruppe} />
                    )
                }
            />
        </div>
    );
};

const AntallPrioriterte = ({ antall }: { antall?: number }) => (
    <BodyShort size="small" className={statistikkCss.talldetaljer}>
        {antall !== undefined ? `${antall} er prioriterte` : <Skeleton width={100} />}
    </BodyShort>
);

export default Utfallsstatistikk;
