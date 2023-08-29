import { BodyShort, Heading, Select } from '@navikt/ds-react';
import { NavKontor } from 'felles/store/navKontor';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import Forespørsler from './Forespørsler';
import css from './Statistikk.module.css';
import Utfallsstatistikk from './Utfallsstatistikk';
import { formaterDatoTilVisning, førsteDagIMåned, sisteDagIMåned } from './datoUtils';

type Props = {
    navKontor: NavKontor;
};

const Statistikk: FunctionComponent<Props> = ({ navKontor }) => {
    const [startDatoPeriode, setStartDatoPeriode] = useState<Date>(førsteDagIMåned(new Date()));

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
                <div>
                    <Heading level="2" size="medium">
                        Ditt NAV-kontor
                    </Heading>
                    <BodyShort>{navKontor.navn}</BodyShort>
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
            <Utfallsstatistikk
                navKontor={navKontor.enhetId}
                fraOgMed={fraOgMed}
                tilOgMed={tilOgMed}
            />
            <Forespørsler navKontor={navKontor.enhetId} fraOgMed={fraOgMed} tilOgMed={tilOgMed} />
        </div>
    );
};

export default Statistikk;
