import { ErrorMessage, Heading, Loader } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { useSvarstatistikk } from '../../../api/foresporsel-om-deling-av-cv-api/hooks/useSvarstatistikk';
import css from './Forespørsler.module.css';
import Svartelling, { SvartellingIkon } from './Svartelling';
// import useSvarstatistikk from './useSvarstatistikk';

type Props = {
    navKontor: string;
    fraOgMed: Date;
    tilOgMed: Date;
};

export const formaterSomProsentAvTotalen = (tall: number, antallTotalt: number) => {
    if (tall > 0) {
        const andelAvTotalen = tall / antallTotalt;
        return Math.round(andelAvTotalen * 100) + '%';
    } else {
        return '0%';
    }
};

const Forespørsler: FunctionComponent<Props> = ({ navKontor, fraOgMed, tilOgMed }) => {
    const svarstatistikk = useSvarstatistikk({ navKontor, fraOgMed, tilOgMed });

    if (svarstatistikk.isLoading || svarstatistikk.isValidating) {
        return <Loader />;
    }

    if (svarstatistikk.error) {
        return (
            <ErrorMessage>
                {svarstatistikk.error?.message ?? 'Feil ved lasting av statistikk'}
            </ErrorMessage>
        );
    }

    const { antallSvartJa, antallSvartNei, antallUtløpteSvar, antallVenterPåSvar } =
        svarstatistikk.data;

    const antallTotalt = antallSvartJa + antallSvartNei + antallVenterPåSvar + antallUtløpteSvar;

    return (
        <div className={css.forespørsler}>
            <Heading level="2" size="medium">
                Stillinger delt med kandidater i Aktivitetsplanen
            </Heading>
            <div className={css.delingstatistikk}>
                <Svartelling
                    svartellingIkon={SvartellingIkon.Delt}
                    oppsummering={antallTotalt + ''}
                    detaljer="ganger har en stilling blitt delt med en kandidat i Aktivitetsplanen"
                    forklaring=""
                />
                <Svartelling
                    svartellingIkon={SvartellingIkon.Ja}
                    oppsummering={
                        formaterSomProsentAvTotalen(antallSvartJa, antallTotalt) + ' svarte ja'
                    }
                    detaljer="til at CV-en kan deles med arbeidsgiver"
                    forklaring={`(${antallSvartJa} av ${antallTotalt})`}
                />
                <Svartelling
                    svartellingIkon={SvartellingIkon.Nei}
                    oppsummering={
                        formaterSomProsentAvTotalen(antallSvartNei, antallTotalt) + ' svarte nei'
                    }
                    detaljer="til at CV-en kan deles med arbeidsgiver"
                    forklaring={`(${antallSvartNei} av ${antallTotalt})`}
                />
                <Svartelling
                    svartellingIkon={SvartellingIkon.SvarteIkke}
                    oppsummering={
                        formaterSomProsentAvTotalen(antallUtløpteSvar, antallTotalt) +
                        ' svarte ikke'
                    }
                    detaljer="på om CV-en kan deles med arbeidsgiver"
                    forklaring={`(${antallUtløpteSvar} av ${antallTotalt})`}
                />
            </div>
        </div>
    );
};

export default Forespørsler;
