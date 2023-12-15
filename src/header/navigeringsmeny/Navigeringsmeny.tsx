import { FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';

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
    },
    {
        tittel: 'Kandidatlister uten stillingsannonse',
        path: '/kandidater/lister',
    },
    {
        tittel: 'Formidlinger',
        path: '/formidlinger',
    },
];

const Navigeringsmeny: FunctionComponent = () => {
    const { pathname }: any = useLocation();

    return (
        <div className={css.navigeringsmeny}>
            <div className={css.inner}>
                <nav className={css.tabs}>
                    {tabs.map((tab) => (
                        <Tab
                            key={tab.path}
                            config={tab}
                            erAktiv={pathname === tab.path}
                            erFremhevet={tab.path === '/kandidater'}
                        />
                    ))}
                </nav>
                <Nyheter />
            </div>
        </div>
    );
};

export default Navigeringsmeny;
