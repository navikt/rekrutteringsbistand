import { Label, Tabs } from '@navikt/ds-react';
import React, { Dispatch, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { KandidatFraOpenSearch } from 'felles/domene/kandidat/Kandidat';
import {
    KandidatIKandidatliste,
    Kandidatstatus,
} from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import Kandidatliste, { Kandidatlistestatus } from 'felles/domene/kandidatliste/Kandidatliste';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import Sidelaster from '../../../felles/komponenter/sidelaster/Sidelaster';
import { lenkeTilKandidatliste } from '../../app/paths';
import { erKobletTilStilling } from '../../kandidatliste/domene/kandidatlisteUtils';
import { filterTilQueryParams } from '../../kandidatliste/filter/filter-utils';
import StatusOgHendelser from '../../kandidatliste/kandidatrad/status-og-hendelser/StatusOgHendelser';
import KandidatlisteAction from '../../kandidatliste/reducer/KandidatlisteAction';
import KandidatlisteActionType from '../../kandidatliste/reducer/KandidatlisteActionType';
import Sidefeil from '../../komponenter/sidefeil/Sidefeil';
import AppState from '../../state/AppState';
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
import useKandidat from 'felles/komponenter/kandidatbanner/useKandidat';

type Props = {
    tabs: ReactNode;
    kandidatnr: string;
    kandidatlisteId: string;
    children: React.ReactNode;
};

const FraKandidatliste = ({ tabs, kandidatnr, kandidatlisteId, children, ...props }: Props) => {
    useScrollTilToppen(kandidatnr);
    useValgtKandidatIKandidatliste(kandidatnr, kandidatlisteId);

    const cv = useKandidat(kandidatnr);
    const kandidatliste = useKandidatliste(kandidatlisteId);

    if (kandidatliste.kind === Nettstatus.LasterInn) {
        return <Sidelaster />;
    } else if (kandidatliste.kind === Nettstatus.FinnesIkke) {
        return <Sidefeil feilmelding={`Fant ikke kandidatlisten med id ${kandidatlisteId}`} />;
    } else if (kandidatliste.kind === Nettstatus.Feil) {
        return (
            <Sidefeil
                feilmelding={`Klarte ikke å laste kandidatlisten med id ${kandidatlisteId}`}
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
    cv: Nettressurs<KandidatFraOpenSearch>;
    kandidat: KandidatIKandidatliste;
    kandidatliste: Kandidatliste;
    children: React.ReactNode;
}) => {
    const dispatch: Dispatch<KandidatlisteAction> = useDispatch();
    const state = useSelector((state: AppState) => state.kandidatliste);

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

    const endreStatusTekst = erKobletTilStilling(kandidatliste) ? 'Status/hendelse:' : 'Status:';

    const brødsmulesti = [
        {
            tekst: kandidatliste.tittel,
            href: lenkeTilKandidatliste(
                kandidatliste.kandidatlisteId,
                filterTilQueryParams(state.filter)
            ),
        },
    ];

    return (
        <>
            <Kandidatheader
                kandidatnr={kandidat.kandidatnr}
                kandidatnavigering={navigering}
                brødsmulesti={brødsmulesti}
            />
            <Tabs value={fane} onChange={setFane}>
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
        </>
    );
};

export default FraKandidatliste;
