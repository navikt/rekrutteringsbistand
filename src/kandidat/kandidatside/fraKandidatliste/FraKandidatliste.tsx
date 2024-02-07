import { Label, Tabs } from '@navikt/ds-react';
import React, { Dispatch, ReactNode } from 'react';
import { useDispatch } from 'react-redux';

import Kandidat from 'felles/domene/kandidat/Kandidat';
import {
    KandidatIKandidatliste,
    Kandidatstatus,
} from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import Kandidatliste, { Kandidatlistestatus } from 'felles/domene/kandidatliste/Kandidatliste';
import { Nettstatus } from 'felles/nettressurs';
import { useLookupCvHook } from '../../../api/kandidat-søk-api/lookupCv';
import { useHentStillingTittel } from '../../../felles/hooks/useStilling';
import Layout from '../../../felles/komponenter/layout/Layout';
import Sidelaster from '../../../felles/komponenter/sidelaster/Sidelaster';
import { lenkeTilStilling } from '../../../felles/lenker';
import StatusOgHendelser from '../../kandidatliste/kandidatrad/status-og-hendelser/StatusOgHendelser';
import KandidatlisteAction from '../../kandidatliste/reducer/KandidatlisteAction';
import KandidatlisteActionType from '../../kandidatliste/reducer/KandidatlisteActionType';
import Sidefeil from '../../komponenter/sidefeil/Sidefeil';
import useScrollTilToppen from '../../utils/useScrollTilToppen';
import useFaner from '../hooks/useFaner';
import useKandidatliste from '../hooks/useKandidatliste';
import Kandidatheader from '../komponenter/header/Kandidatheader';
import Kandidatmeny from '../komponenter/meny/Kandidatmeny';
import css from './FraKandidatliste.module.css';
import useForespørselOmDelingAvCv from './useForespørselOmDelingAvCv';
import useNavigerbareKandidater from './useNavigerbareKandidater';
import useSendtKandidatmelding from './useSendtKandidatmelding';
import useValgtKandidatIKandidatliste from './useValgtKandidatIKandidatliste';

type Props = {
    tabs: ReactNode;
    kandidatnr: string;
    kandidatlisteId: string | null;
    stillingId: string | null;
    children: React.ReactNode;
};

const FraKandidatliste = ({ tabs, kandidatnr, kandidatlisteId, stillingId, children }: Props) => {
    useScrollTilToppen(kandidatnr);
    // @ts-ignore TODO: written before strict-mode enabled
    useValgtKandidatIKandidatliste(kandidatnr, kandidatlisteId);

    const { cv } = useLookupCvHook(kandidatnr);
    const kandidatliste = useKandidatliste({ stillingId, kandidatlisteId });

    if (!kandidatlisteId && !stillingId) {
        return <Sidefeil feilmelding="Mangler kandidatlisteId eller stillingId" />;
    }

    if (kandidatliste.kind === Nettstatus.LasterInn) {
        return <Sidelaster />;
    } else if (kandidatliste.kind === Nettstatus.FinnesIkke) {
        return (
            <Sidefeil
                feilmelding={`Fant ikke kandidatlisten med ${
                    kandidatlisteId ? 'kandidatliste' : 'stilling'
                }-id ${kandidatlisteId || stillingId}`}
            />
        );
    } else if (kandidatliste.kind === Nettstatus.Feil) {
        return (
            <Sidefeil
                feilmelding={`Klarte ikke å laste kandidatlisten med ${
                    kandidatlisteId ? 'kandidatliste' : 'stilling'
                }-id ${kandidatlisteId || stillingId}`}
            />
        );
    } else if (kandidatliste.kind === Nettstatus.Suksess) {
        const kandidat = kandidatliste.data.kandidater.find((k) => k.kandidatnr === kandidatnr);

        if (!kandidat) {
            return <Sidefeil feilmelding={`Fant ikke kandidat med kandidatnr ${kandidatnr}`} />;
        }

        return (
            <FraKandidatlisteInner
                tabs={tabs}
                cv={cv}
                kandidat={kandidat}
                kandidatliste={kandidatliste.data}
            >
                {children}
            </FraKandidatlisteInner>
        );
    } else {
        return null;
    }
};

const FraKandidatlisteInner = ({
    tabs,
    cv,
    kandidat,
    kandidatliste,
    children,
}: {
    tabs: ReactNode;
    cv: Kandidat;
    kandidat: KandidatIKandidatliste;
    kandidatliste: Kandidatliste;
    children: React.ReactNode;
}) => {
    const dispatch: Dispatch<KandidatlisteAction> = useDispatch();

    const [fane, setFane] = useFaner();
    const forespørsel = useForespørselOmDelingAvCv(kandidat, kandidatliste);
    const melding = useSendtKandidatmelding(kandidat, kandidatliste);
    const navigering = useNavigerbareKandidater(kandidat.kandidatnr, kandidatliste);

    const onKandidatStatusChange = (status: Kandidatstatus) => {
        dispatch({
            type: KandidatlisteActionType.EndreStatusKandidat,
            status,
            kandidatlisteId: kandidatliste.kandidatlisteId,
            kandidatnr: kandidat.kandidatnr,
        });
    };

    const endreStatusTekst = 'Status/hendelse:';

    const stillingTittel = useHentStillingTittel(kandidatliste.stillingId);

    const brødsmulesti = [
        {
            tekst: stillingTittel,
            href: lenkeTilStilling({ stillingsId: kandidatliste.stillingId, fane: 'kandidater' }),
        },
    ];

    return (
        <Layout
            banner={
                <Kandidatheader
                    kandidatnr={kandidat.kandidatnr}
                    kandidatnavigering={navigering}
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
                    <div className={css.velgStatus}>
                        <Label htmlFor="cv-status-og-hendelse">{endreStatusTekst}</Label>
                        <StatusOgHendelser
                            id="cv-status-og-hendelse"
                            kandidat={kandidat}
                            kandidatliste={kandidatliste}
                            forespørselOmDelingAvCv={forespørsel}
                            onStatusChange={onKandidatStatusChange}
                            sms={melding}
                            kanEditere={
                                kandidatliste.kanEditere &&
                                kandidatliste.status === Kandidatlistestatus.Åpen
                            }
                        />
                    </div>
                </Kandidatmeny>
                <Tabs.Panel value={fane}>{children}</Tabs.Panel>
            </Tabs>
        </Layout>
    );
};

export default FraKandidatliste;
