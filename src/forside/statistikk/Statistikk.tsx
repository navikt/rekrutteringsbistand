import { BodyShort, Heading, Select } from '@navikt/ds-react';
import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import Forespørsler from './Forespørsler';
import css from './Statistikk.module.css';
import Utfallsstatistikk from './Utfallsstatistikk';
import { formaterDatoTilVisning, førsteDagIMåned, sisteDagIMåned } from './datoUtils';

type Props = {
    navKontor: string;
};

const Statistikk: FunctionComponent<Props> = ({ navKontor }) => {
    const [startDatoPeriode, setStartDatoPeriode] = useState<Date>(førsteDagIMåned(new Date()));
    const [navKontoretsNavn, setNavKontoretsNavn] = useState<string>(
        hentNavKontoretsNavn(navKontor)
    );

    useEffect(() => {
        setNavKontoretsNavn(hentNavKontoretsNavn(navKontor));
    }, [navKontor]);

    const onTidsperiodeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const startDatoPeriode = new Date(+event.target.value);
        setStartDatoPeriode(startDatoPeriode);
    };

    const antallMånederForHistorikk = 12;
    const tidsperioder = Array<Number>(antallMånederForHistorikk)
        .fill(0, 0, antallMånederForHistorikk)
        .map((_, i) => {
            const statistikkTidspunkt = new Date();
            statistikkTidspunkt.setDate(1);
            statistikkTidspunkt.setMonth(statistikkTidspunkt.getMonth() - i);

            const fraOgMed = førsteDagIMåned(new Date(statistikkTidspunkt));
            return fraOgMed;
        });

    const fraOgMed = startDatoPeriode;
    const tilOgMed = sisteDagIMåned(new Date(startDatoPeriode));

    return (
        <div className={css.statistikk}>
            <div className={css.konktekstForStatistikk}>
                <div className={css.dittNavKontor}>
                    <Heading level="2" size="medium" className={css.tittel}>
                        Ditt NAV-kontor
                    </Heading>
                    <BodyShort>{navKontoretsNavn}</BodyShort>
                </div>
                <div className={css.skillelinje} />
                <Select label="Periode" onChange={onTidsperiodeChange} className={css.tidsperiode}>
                    {tidsperioder.map((tidsperiode) => (
                        <option
                            value={tidsperiode.getTime()}
                            key={tidsperiode.getTime()}
                            className={css.periode}
                        >
                            {formaterDatoTilVisning(tidsperiode)} til{' '}
                            {formaterDatoTilVisning(sisteDagIMåned(new Date(tidsperiode)))}
                        </option>
                    ))}
                </Select>
            </div>
            <Utfallsstatistikk navKontor={navKontor} fraOgMed={fraOgMed} tilOgMed={tilOgMed} />
            <Forespørsler navKontor={navKontor} fraOgMed={fraOgMed} tilOgMed={tilOgMed} />
        </div>
    );
};

const hentNavKontoretsNavn = (navKontor: string) => {
    const modiaElement = document.getElementsByClassName('dekorator-select-container')[0];

    if (modiaElement) {
        const optionElement = Array.from(modiaElement.getElementsByTagName('option')).find(
            (enhet) => enhet.value === navKontor
        );

        if (optionElement) {
            return optionElement.innerText.slice(5);
        }
    }

    return `Enhet ${navKontor}`;
};

export default Statistikk;
