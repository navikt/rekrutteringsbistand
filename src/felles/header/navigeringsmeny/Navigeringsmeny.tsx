import { SparklesIcon } from '@navikt/aksel-icons';
import { Button, Link } from '@navikt/ds-react';
import { FunctionComponent, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ApplikasjonContext } from '../../ApplikasjonContext';
import { getMiljø, Miljø } from '../../miljø';
import { Rolle } from '../../tilgangskontroll/Roller';
import { TilgangskontrollForInnhold } from '../../tilgangskontroll/TilgangskontrollForInnhold';
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
        tittel: 'Etterregistrering formidlinger',
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
                    {tabs.map((tab, index) =>
                        tab.kreverRoller && tilgangskontrollErPå ? (
                            <TilgangskontrollForInnhold
                                key={index}
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
                <div className={css.navigeringsmenyHøyre}>
                    <Nyheter />
                    <Link
                        style={{ textDecoration: 'none' }}
                        href={
                            getMiljø() === Miljø.ProdGcp
                                ? 'https://rekrutteringsbistand-frontend.intern.nav.no/'
                                : 'https://rekrutteringsbistand-frontend.intern.dev.nav.no/'
                        }
                    >
                        <Button icon={<SparklesIcon />} variant="tertiary">
                            Prøv nye rekrutteringsbistand
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navigeringsmeny;
