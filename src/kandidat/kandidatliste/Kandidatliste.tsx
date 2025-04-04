import { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { Search } from '@navikt/ds-react';
import { Kandidatstatus } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import Kandidatlistetype, { Kandidatlistestatus } from 'felles/domene/kandidatliste/Kandidatliste';
import { Stillingskategori } from 'felles/domene/stilling/Stilling';
import { Nettstatus } from 'felles/nettressurs';
import useMaskerFødselsnumre from '../app/useMaskerFødselsnumre';
import AppState from '../state/AppState';
import css from './Kandidatliste.module.css';
import { erInaktiv } from './domene/kandidatUtils';
import {
    erEierAvKandidatlisten,
    erKobletTilStilling,
    kandidaterMåGodkjenneDelingAvCv,
} from './domene/kandidatlisteUtils';
import FeilVedSendingAvForespørsel from './feil-ved-sending-av-forespørsel/FeilVedSendingAvForespørsel';
import Filter from './filter/Filter';
import { filterTilQueryParams, queryParamsTilFilter } from './filter/filter-utils';
import FormidlingAvUsynligKandidatrad from './formidling-av-usynlig-kandidatrad/FormidlingAvUsynligKandidatrad';
import useAntallFiltertreff from './hooks/useAntallFiltertreff';
import useErAlleMarkerte from './hooks/useErAlleMarkerte';
import useFiltrerteKandidater from './hooks/useFiltrerteKandidater';
import useHentForespørslerOmDelingAvCv from './hooks/useHentForespørslerOmDelingAvCv';
import useSorterteKandidater from './hooks/useSorterteKandidater';
import IngenKandidater from './ingen-kandidater/IngenKandidater';
import Kandidatrad from './kandidatrad/Kandidatrad';
import { Hendelse } from './kandidatrad/status-og-hendelser/etiketter/Hendelsesetikett';
import KnappeRad from './knappe-rad/KnappeRad';
import ListeHeader from './liste-header/ListeHeader';
import KandidatlisteActionType from './reducer/KandidatlisteActionType';
import { Kandidatlistefilter } from './reducer/kandidatlisteReducer';
import SideHeader from './side-header/SideHeader';
import SmsFeilAlertStripe from './smsFeilAlertStripe/SmsFeilAlertStripe';
import TomListe from './tom-liste/TomListe';
import OrganisasjonsnummerAlert from './OrganisasjonsnummerAlert';

type Props = {
    kandidatliste: Kandidatlistetype;
    onToggleMarkert: (kandidatnr: string) => void;
    onFjernAllMarkering: () => void;
    onMarkerKandidater: (kandidatnumre: string[]) => void;
    onKandidatStatusChange: any;
    onKandidatShare: any;
    onKandidaterAngreArkivering: any;
    onSendSmsClick: any;
    onToggleArkivert: any;
    skjulBanner?: boolean;
    organisasjonsnummerFraStilling?: string | null;
};

const Kandidatliste: FunctionComponent<Props> = ({
    kandidatliste,
    onFjernAllMarkering,
    onMarkerKandidater,
    onSendSmsClick,
    onKandidatShare,
    onKandidaterAngreArkivering,
    onKandidatStatusChange,
    onToggleMarkert,
    onToggleArkivert,
    skjulBanner,
    organisasjonsnummerFraStilling,
}) => {
    useMaskerFødselsnumre();
    useHentForespørslerOmDelingAvCv(kandidatliste.stillingId);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { filter, forespørslerOmDelingAvCv } = useSelector(
        (state: AppState) => state.kandidatliste
    );

    const filtrerteKandidater = useFiltrerteKandidater(kandidatliste.kandidater);
    const alleFiltrerteErMarkerte = useErAlleMarkerte(filtrerteKandidater);
    const { sorterteKandidater, sortering, setSortering } = useSorterteKandidater(
        filtrerteKandidater,
        forespørslerOmDelingAvCv
    );

    const antallFiltertreff = useAntallFiltertreff(
        kandidatliste.kandidater,
        forespørslerOmDelingAvCv,
        filter
    );
    const antallFilterTreffJSON = JSON.stringify(antallFiltertreff);

    useEffect(() => {
        const oppdatertFilter = queryParamsTilFilter(new URLSearchParams(location.search));
        dispatch({
            type: KandidatlisteActionType.EndreKandidatlisteFilter,
            filter: oppdatertFilter,
        });
    }, [dispatch, location.search, antallFilterTreffJSON]);

    const setFilterIUrl = (filter: Kandidatlistefilter) => {
        const query = filterTilQueryParams(filter).toString();
        navigate(
            {
                search: query,
            },
            {
                replace: true,
            }
        );
    };

    const toggleVisArkiverteOgFjernMarkering = () => {
        setFilterIUrl({
            ...filter,
            visArkiverte: !filter.visArkiverte,
        });

        onFjernAllMarkering();
    };

    const onToggleStatus = (status: Kandidatstatus) => {
        setFilterIUrl({
            ...filter,
            status: {
                ...filter.status,
                [status]: !filter.status[status],
            },
        });
    };

    const onToggleHendelse = (hendelse: Hendelse) => {
        setFilterIUrl({
            ...filter,
            hendelse: {
                ...filter.hendelse,
                [hendelse]: !filter.hendelse[hendelse],
            },
        });
    };

    const setNavnefilter = (navn: string) => {
        dispatch({
            type: KandidatlisteActionType.EndreKandidatlisteFilter,
            filter: {
                ...filter,
                navn,
            },
        });
    };

    const onCheckAlleKandidater = () => {
        if (alleFiltrerteErMarkerte) {
            onFjernAllMarkering();
        } else {
            onMarkerKandidater(
                filtrerteKandidater
                    .filter((kandidat) => !erInaktiv(kandidat) || kandidat.arkivert)
                    .map((k) => k.kandidatnr)
            );
        }
    };

    const listenInneholderKandidater =
        kandidatliste.kandidater.length > 0 ||
        kandidatliste.formidlingerAvUsynligKandidat.length > 0;

    const kandidatlistenErÅpen = kandidatliste.status === Kandidatlistestatus.Åpen;
    const kanArkivereKandidater = !filter.visArkiverte && kandidatlistenErÅpen;

    const orgnummerDivergererMellomStillingOgKandidat: boolean =
        kandidatliste &&
        kandidatliste.organisasjonReferanse != null &&
        organisasjonsnummerFraStilling != null &&
        kandidatliste.organisasjonReferanse !== organisasjonsnummerFraStilling;

    return (
        <div className={css.innhold}>
            <SideHeader kandidatliste={kandidatliste} skjulBanner={skjulBanner} />
            {listenInneholderKandidater ? (
                <>
                    <div className={css.grid}>
                        <div className={css.knapperad}>
                            {kandidatliste.kanEditere &&
                                kandidatliste.stillingskategori !== 'FORMIDLING' && (
                                    <SmsFeilAlertStripe
                                        kandidater={kandidatliste.kandidater}
                                        stillingId={kandidatliste.stillingId ?? null}
                                    />
                                )}
                            {erKobletTilStilling(kandidatliste) &&
                                forespørslerOmDelingAvCv.kind === Nettstatus.Suksess && (
                                    <FeilVedSendingAvForespørsel
                                        forespørslerOmDelingAvCv={forespørslerOmDelingAvCv.data}
                                        kandidatliste={kandidatliste}
                                    />
                                )}
                            {orgnummerDivergererMellomStillingOgKandidat && (
                                <OrganisasjonsnummerAlert />
                            )}
                            <KnappeRad
                                kandidatliste={kandidatliste}
                                onSendSmsClick={onSendSmsClick}
                                onKandidatShare={onKandidatShare}
                                onKandidaterAngreArkivering={onKandidaterAngreArkivering}
                                visArkiverte={filter.visArkiverte}
                            >
                                <Search
                                    label="Søk alle Nav sine sider"
                                    variant="simple"
                                    onChange={(e) => setNavnefilter(e)}
                                    title="Søk etter navn i listen"
                                />
                            </KnappeRad>
                        </div>
                        <Filter
                            className={css.filter}
                            antallTreff={antallFiltertreff}
                            visArkiverte={filter.visArkiverte}
                            statusfilter={filter.status}
                            hendelsefilter={
                                kandidaterMåGodkjenneDelingAvCv(kandidatliste) ||
                                kandidatliste.stillingskategori === Stillingskategori.Formidling
                                    ? filter.hendelse
                                    : undefined
                            }
                            onToggleArkiverte={toggleVisArkiverteOgFjernMarkering}
                            onToggleStatus={onToggleStatus}
                            onToggleHendelse={onToggleHendelse}
                        />
                        <div role="table" aria-label="Kandidater" className={css.liste}>
                            <ListeHeader
                                kandidatliste={kandidatliste}
                                alleMarkert={alleFiltrerteErMarkerte}
                                onCheckAlleKandidater={onCheckAlleKandidater}
                                visArkiveringskolonne={kanArkivereKandidater}
                                sortering={sortering}
                                setSortering={setSortering}
                            />
                            {kandidatliste.formidlingerAvUsynligKandidat.map(
                                (formidlingAvUsynligKandidat) => (
                                    <FormidlingAvUsynligKandidatrad
                                        kandidatlisteId={kandidatliste.kandidatlisteId}
                                        kandidatlistenErLukket={!kandidatlistenErÅpen}
                                        key={formidlingAvUsynligKandidat.lagtTilTidspunkt}
                                        formidling={formidlingAvUsynligKandidat}
                                        erEierAvKandidatlisten={erEierAvKandidatlisten(
                                            kandidatliste
                                        )}
                                    />
                                )
                            )}
                            {sorterteKandidater.length > 0 ? (
                                sorterteKandidater.map((kandidat) => (
                                    <Kandidatrad
                                        key={kandidat.kandidatnr}
                                        kandidat={kandidat}
                                        kandidatliste={kandidatliste}
                                        onKandidatStatusChange={onKandidatStatusChange}
                                        onToggleKandidat={onToggleMarkert}
                                        toggleArkivert={onToggleArkivert}
                                        visArkiveringskolonne={kanArkivereKandidater}
                                    />
                                ))
                            ) : (
                                <IngenKandidater>
                                    {filter.visArkiverte
                                        ? 'Det er ingen vanlige kandidater som passer med valgte kriterier'
                                        : 'Du har ingen vanlige kandidater i kandidatlisten'}
                                </IngenKandidater>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <TomListe
                    kandidatlistenErLukket={!kandidatlistenErÅpen}
                    orgnummerDivergererMellomStillingOgKandidat={
                        orgnummerDivergererMellomStillingOgKandidat
                    }
                ></TomListe>
            )}
        </div>
    );
};

export default Kandidatliste;
