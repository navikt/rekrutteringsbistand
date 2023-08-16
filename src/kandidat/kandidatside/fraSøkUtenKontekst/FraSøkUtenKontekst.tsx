import { MagnifyingGlassIcon, PersonPlusIcon } from '@navikt/aksel-icons';
import { Button, Label, Tabs } from '@navikt/ds-react';
import { FunctionComponent, ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';

import { Nettstatus } from 'felles/nettressurs';
import { lenkeTilKandidatsøk } from '../../app/paths';
import useScrollTilToppen from '../../utils/useScrollTilToppen';
import useCv from '../hooks/useCv';
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

    const [fane, setFane] = useFaner();
    const cv = useCv(kandidatnr);
    const kandidatnavigering = useNavigerbareKandidaterFraSøk(kandidatnr);
    const [visKandidatlisterModal, setVisKandidatlisterModal] = useState<boolean>(false);

    const økt = hentØktFraKandidatsøk();

    const brødsmulesti = [
        {
            tekst: 'Kandidatsøk',
            href: lenkeTilKandidatsøk(økt.searchParams),
            state: { scrollTilKandidat: true },
        },
    ];

    return (
        <>
            <Kandidatheader
                cv={cv}
                kandidatnr={kandidatnr}
                kandidatnavigering={kandidatnavigering}
                brødsmulesti={brødsmulesti}
            />
            <Tabs value={fane} onChange={setFane as any}>
                <Kandidatmeny tabs={tabs} cv={cv}>
                    <div className={css.knapper}>
                        {cv.kind === Nettstatus.Suksess && (
                            <Link
                                to={`/stillingssok/${kandidatnr}?brukKritererFraKandidat=true`}
                                className="navds-button navds-button--secondary navds-button--small"
                            >
                                <MagnifyingGlassIcon />
                                <Label as="span" size="small">
                                    Finn stilling
                                </Label>
                            </Link>
                        )}
                        <Button
                            size="small"
                            icon={<PersonPlusIcon aria-hidden />}
                            onClick={() => setVisKandidatlisterModal(true)}
                        >
                            Velg kandidatlister
                        </Button>
                    </div>
                </Kandidatmeny>
                <Tabs.Panel value={fane}>{children}</Tabs.Panel>
            </Tabs>
            <LagreKandidaterIMineKandidatlisterModal
                vis={visKandidatlisterModal}
                kandidatnr={kandidatnr}
                onClose={() => setVisKandidatlisterModal(false)}
            />
        </>
    );
};

export default FraSøkUtenKontekst;
