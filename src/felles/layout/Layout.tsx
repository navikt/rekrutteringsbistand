import { Accordion, Heading, Hide, Show } from '@navikt/ds-react';
import * as React from 'react';

import { TilToppenKnapp } from '../komponenter/tilToppenKnapp/TilToppenKnapp';
import stil from './Layout.module.css';
export interface ILayout {
    children: React.ReactNode | undefined;
    tittel?: string;
    ikon?: React.ReactNode;
    altBanner?: React.ReactNode;
    sidepanel?: React.ReactNode | undefined;
    bannerKnapp?: React.ReactNode | undefined;
}

const Layout: React.FC<ILayout> = ({
    tittel,
    ikon,
    sidepanel,
    altBanner,
    bannerKnapp,
    children,
}) => {
    return (
        <div className={stil.wrapper}>
            <div className={stil.layout}>
                {altBanner ? (
                    altBanner
                ) : (
                    <header>
                        <div className={stil.banner}>
                            <div className={stil.bannerTittel}>
                                <div className={stil.ikon}>{ikon}</div>
                                <Heading level="2" size="large">
                                    {tittel}
                                </Heading>
                            </div>
                            {bannerKnapp}
                        </div>
                    </header>
                )}
                <div className={stil.container}>
                    {sidepanel && (
                        <aside className={stil.sidebar}>
                            <Show above="md">{sidepanel}</Show>
                            <Hide above="md">
                                <Accordion>
                                    <Accordion.Item>
                                        <Accordion.Header>Sidepanel</Accordion.Header>
                                        <Accordion.Content>{sidepanel}</Accordion.Content>
                                    </Accordion.Item>
                                </Accordion>
                            </Hide>
                        </aside>
                    )}
                    <main className={stil.sideinnhold}>
                        {children}
                        <TilToppenKnapp />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Layout;

// Margins:
// >1280dp -> 2,5rem = 40px
// >1024 = 32px
// >768 = 24px
// <767 = 20px
// Bunn 80px
