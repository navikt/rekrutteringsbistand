import { PersonPlusIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Tabs } from '@navikt/ds-react';
import { FunctionComponent, ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';

import { Nettstatus } from 'felles/nettressurs';
import { useLookupCv } from '../../../api/kandidat-søk-api/lookupCv';
import { useHentStillingTittel } from '../../../felles/hooks/useStilling';
import Layout from '../../../felles/komponenter/layout/Layout';
import { lenkeTilKandidatliste, lenkeTilKandidatsøk } from '../../app/paths';
import { erKobletTilStilling } from '../../kandidatliste/domene/kandidatlisteUtils';
import useScrollTilToppen from '../../utils/useScrollTilToppen';
import useFaner from '../hooks/useFaner';
import useKandidatliste from '../hooks/useKandidatliste';
import useNavigerbareKandidaterFraSøk from '../hooks/useNavigerbareKandidaterFraSøk';
import Kandidatheader from '../komponenter/header/Kandidatheader';
import Kandidatmeny from '../komponenter/meny/Kandidatmeny';
import { hentØktFraKandidatsøk } from '../søkekontekst';
import LagreKandidatIKandidatlisteModal from './LagreKandidatIKandidatlisteModal';

type Props = {
    tabs: ReactNode;
    kandidatnr: string;
    kandidatlisteId: string | null;
    stillingId: string | null;
    children?: ReactNode;
};

const FraSøkMedKandidatliste: FunctionComponent<Props> = ({
    tabs,
    kandidatnr,
    kandidatlisteId,
    stillingId,
    children,
}) => {
    useScrollTilToppen(kandidatnr);

    const [fane, setFane] = useFaner();
    const [visLagreKandidatModal, setVisLagreKandidatModal] = useState<boolean>(false);

    const { cv } = useLookupCv(kandidatnr);
    const kandidatliste = useKandidatliste({ stillingId, kandidatlisteId });
    // @ts-ignore TODO: written before strict-mode enabled
    const kandidatnavigering = useNavigerbareKandidaterFraSøk(kandidatnr, {
        stillingId,
        kandidatlisteId: kandidatlisteId ?? undefined,
    });

    const økt = hentØktFraKandidatsøk();

    const kandidatErAlleredeLagretIListen =
        kandidatliste.kind === Nettstatus.Suksess &&
        kandidatliste.data.kandidater.some((k) => k.kandidatnr === kandidatnr);

    const stillingTittel = useHentStillingTittel(
        kandidatliste.kind === Nettstatus.Suksess ? kandidatliste.data.stillingId : undefined
    );

    const brødsmulesti =
        kandidatliste.kind === Nettstatus.Suksess
            ? [
                  {
                      tekst: erKobletTilStilling(kandidatliste.data)
                          ? stillingTittel
                          : kandidatliste.data.tittel,
                      // @ts-ignore TODO: written before strict-mode enabled
                      href: lenkeTilKandidatliste(kandidatliste.data.stillingId),
                  },
                  {
                      tekst: 'Finn kandidater',
                      href: lenkeTilKandidatsøk(økt.searchParams),
                      state: { scrollTilKandidat: true },
                  },
              ]
            : undefined;

    return (
        <Layout
            banner={
                <Kandidatheader
                    kandidatnr={kandidatnr}
                    kandidatnavigering={kandidatnavigering}
                    // @ts-ignore TODO: written before strict-mode enabled
                    brødsmulesti={brødsmulesti}
                />
            }
        >
            <Tabs
                value={fane}
                // @ts-ignore TODO: written before strict-mode enabled
                onChange={setFane}
            >
                <Kandidatmeny tabs={tabs} cv={cv}>
                    {kandidatErAlleredeLagretIListen ? (
                        <BodyShort>
                            <span>Kandidaten er lagret i </span>
                            <Link
                                // @ts-ignore TODO: written before strict-mode enabled
                                to={lenkeTilKandidatliste(kandidatliste.data.stillingId)}
                                className="navds-link"
                            >
                                kandidatlisten
                            </Link>
                        </BodyShort>
                    ) : (
                        <Button
                            icon={<PersonPlusIcon aria-hidden />}
                            onClick={() => setVisLagreKandidatModal(true)}
                        >
                            Lagre kandidat
                        </Button>
                    )}
                </Kandidatmeny>
                <Tabs.Panel value={fane}>{children}</Tabs.Panel>
            </Tabs>

            <LagreKandidatIKandidatlisteModal
                vis={visLagreKandidatModal}
                kandidatliste={kandidatliste}
                kandidatnr={kandidatnr}
                onClose={() => setVisLagreKandidatModal(false)}
            />
        </Layout>
    );
};

export default FraSøkMedKandidatliste;
