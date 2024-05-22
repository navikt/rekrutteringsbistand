import { FunctionComponent, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { ApplikasjonContext } from '../../felles/ApplikasjonContext';
import TilgangskontrollForInnhold, {
    Rolle,
} from '../../felles/tilgangskontroll/TilgangskontrollForInnhold';
import Nyheter from '../nyheter/Nyheter';
import css from './Navigeringsmeny.module.css';
import Tab, { TabConfig } from './Tab';

const tabs: TabConfig[] = [
    {
        tittel: 'Oversikt',
        path: '/',
    },
    {
        tittel: 'Stillinger',
        path: '/stillinger/stillingssok',
        queryParam: '?brukStandardsok=true',
    },
    {
        tittel: 'Kandidatsøk',
        path: '/kandidatsok',
        kreverRoller: [
            Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
            Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
        ],
    },
    {
        tittel: 'Formidlinger',
        path: '/formidlinger',
        kreverRoller: [
            Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
            Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
        ],
    },
];

const Navigeringsmeny: FunctionComponent = () => {
    const { pathname }: any = useLocation();
    const { tilgangskontrollErPå } = useContext(ApplikasjonContext);

    return (
        <div className={css.navigeringsmeny}>
            <div className={css.inner}>
                <nav className={css.tabs}>
                    {tabs.map((tab) =>
                        tab.kreverRoller && tilgangskontrollErPå ? (
                            <TilgangskontrollForInnhold
                                skjulVarsel
                                kreverEnAvRollene={tab.kreverRoller}
                            >
                                <Tab key={tab.path} config={tab} erAktiv={pathname === tab.path} />
                            </TilgangskontrollForInnhold>
                        ) : (
                            <Tab key={tab.path} config={tab} erAktiv={pathname === tab.path} />
                        )
                    )}
                </nav>
                <Nyheter />
            </div>
        </div>
    );
};

export default Navigeringsmeny;
