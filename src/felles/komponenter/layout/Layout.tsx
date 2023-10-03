import { Accordion, Hide, Show } from '@navikt/ds-react';
import * as React from 'react';

import Banner from '../banner/Banner';
import { TilToppenKnapp } from '../tilToppenKnapp/TilToppenKnapp';
import css from './Layout.module.css';

export type Props = {
    children: React.ReactNode | undefined;
    tittel?: string;
    ikon?: React.ReactNode;
    banner?: React.ReactNode;
    sidepanel?: React.ReactNode | undefined;
    knappIBanner?: React.ReactNode | undefined;
};

const Layout = ({ tittel, ikon, sidepanel, banner, knappIBanner, children }: Props) => {
    return (
        <div className={css.wrapper}>
            <div className={css.layout}>
                {banner ? (
                    banner
                ) : (
                    <Banner ikon={ikon} tittel={tittel}>
                        {knappIBanner}
                    </Banner>
                )}
                <div className={css.container}>
                    {sidepanel && (
                        <aside className={css.sidebar}>
                            <Show above="md">{sidepanel}</Show>
                            <Hide above="md">
                                <Accordion>
                                    <Accordion.Item>
                                        <Accordion.Header>Filtrer</Accordion.Header>
                                        <Accordion.Content>{sidepanel}</Accordion.Content>
                                    </Accordion.Item>
                                </Accordion>
                            </Hide>
                        </aside>
                    )}
                    <main className={css.sideinnhold}>
                        {children}
                        <TilToppenKnapp />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Layout;
