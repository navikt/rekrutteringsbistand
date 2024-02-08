import { Button, Tabs } from '@navikt/ds-react';
import { FunctionComponent, MouseEvent, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TasklistIcon } from '@navikt/aksel-icons';
import { useLookupCv } from '../../../api/kandidat-søk-api/lookupCv';
import Layout from '../../../felles/komponenter/layout/Layout';
import { lenkeTilKandidatsøk } from '../../app/paths';
import useScrollTilToppen from '../../utils/useScrollTilToppen';
import useFaner from '../hooks/useFaner';
import useNavigerbareKandidaterFraSøk from '../hooks/useNavigerbareKandidaterFraSøk';
import Kandidatheader from '../komponenter/header/Kandidatheader';
import Kandidatmeny from '../komponenter/meny/Kandidatmeny';
import { hentØktFraKandidatsøk } from '../søkekontekst';
import css from './FraSøkUtenKontekst.module.css';
import LagreKandidaterIMineKandidatlisterModal from './lagre-kandidat-modal/LagreKandidatIMineKandidatlisterModal';

type Props = {
    tabs: ReactNode;
    kandidatnr: string;
    children?: ReactNode;
};

const FraSøkUtenKontekst: FunctionComponent<Props> = ({ tabs, kandidatnr, children }) => {
    useScrollTilToppen(kandidatnr);

    const navigate = useNavigate();
    const [fane, setFane] = useFaner();
    const { cv } = useLookupCv(kandidatnr);
    const kandidatnavigering = useNavigerbareKandidaterFraSøk(kandidatnr);
    const [visKandidatlisterModal, setVisKandidatlisterModal] = useState<boolean>(false);

    const finnStillingUrl = `/stillinger/stillingssok/kandidat/${kandidatnr}?brukKriterierFraKandidat=true`;

    const økt = hentØktFraKandidatsøk();

    const brødsmulesti = [
        {
            tekst: 'Kandidatsøk',
            href: lenkeTilKandidatsøk(økt.searchParams),
            state: { scrollTilKandidat: true },
        },
    ];

    const handleFinnStillingClick = (event: MouseEvent) => {
        event.preventDefault();

        navigate(finnStillingUrl);
    };

    return (
        <Layout
            banner={
                <Kandidatheader
                    kandidatnr={kandidatnr}
                    kandidatnavigering={kandidatnavigering}
                    brødsmulesti={brødsmulesti}
                />
            }
        >
            <Tabs value={fane} onChange={setFane as any} className={css.tabs}>
                <Kandidatmeny tabs={tabs} cv={cv}>
                    {cv && (
                        <Button as="a" href={finnStillingUrl} onClick={handleFinnStillingClick}>
                            Finn stilling
                        </Button>
                    )}
                    <Button
                        as="a"
                        variant="secondary"
                        icon={<TasklistIcon aria-hidden />}
                        onClick={() => setVisKandidatlisterModal(true)}
                    >
                        Legg til i lister
                    </Button>
                </Kandidatmeny>
                <Tabs.Panel value={fane}>{children}</Tabs.Panel>
            </Tabs>
            <LagreKandidaterIMineKandidatlisterModal
                vis={visKandidatlisterModal}
                kandidatnr={kandidatnr}
                onClose={() => setVisKandidatlisterModal(false)}
            />
        </Layout>
    );
};

export default FraSøkUtenKontekst;
