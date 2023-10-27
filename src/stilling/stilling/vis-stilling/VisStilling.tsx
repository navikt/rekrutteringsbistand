import { Tabs } from '@navikt/ds-react';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../../../felles/komponenter/layout/Layout';
import Stilling from '../Stilling';
import css from './VisStilling.module.css';
import VisStillingBanner from './header/VisStillingBanner';
import kanddata from './kandidatliste.json';
import OmAnnonse from './moduler/OmAnnonse';
import OmBedrift from './moduler/OmBedrift';
import OmStilling from './moduler/OmStilling';
import StillingSidebar from './siderbar/StillingSidebar';
import data from './stilling-response.json';

export interface IVisStilling {
    children?: React.ReactNode | undefined;
}

const VisStilling: React.FC<IVisStilling> = ({ children }) => {
    // const { uuid } = useParams();
    const [searchParams] = useSearchParams();
    const kandidatnrFraStillingssøk = searchParams.get('kandidat');
    // const { data, isLoading, error } = useHentStilling(uuid);

    // if (isLoading || error) {
    //     return <div>loading elle error</div>;
    // }

    // const { stilling2 } = data;

    const kandidatliste = kanddata as any;
    const stilling = data.stilling;

    return (
        <div>
            <Layout banner={<VisStillingBanner stilling={stilling as any} />}>
                <Tabs defaultValue="om_stillingen">
                    <Tabs.List>
                        <Tabs.Tab value="om_stillingen" label="Om stillingen" />
                        {/* <Tabs.Tab value="kandidater" label="Kandidater" /> */}
                    </Tabs.List>
                    <Tabs.Panel value="om_stillingen">
                        <div className={css.stillingsWrapper}>
                            <div className={css.hovedinnhold}>
                                <OmStilling stilling={stilling as any} />
                                <hr />
                                <OmBedrift stilling={stilling as any} />
                                <hr />
                                <OmAnnonse
                                    stilling={stilling as any}
                                    stillingsinfo={data.stillingsinfo as any}
                                />
                            </div>
                            <div className={css.sidebar}>
                                <StillingSidebar
                                    kandidatliste={kandidatliste}
                                    kandidatnrFraStillingssøk={kandidatnrFraStillingssøk}
                                />
                            </div>
                        </div>
                    </Tabs.Panel>
                    {/* <Tabs.Panel value="kandidater">Inbox-tab</Tabs.Panel> */}
                </Tabs>
            </Layout>
            <div style={{ marginTop: '5rem' }}>
                <Stilling />
            </div>
        </div>
    );
};

export default VisStilling;
