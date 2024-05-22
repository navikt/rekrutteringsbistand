import { BodyLong, Tabs } from '@navikt/ds-react';
import { ReactNode, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import {
    hentTittelFraStilling,
    Status,
    Stillingskategori,
    System,
} from 'felles/domene/stilling/Stilling';
import { useVisVarsling } from 'felles/varsling/Varsling';
import { useMeg } from '../../api/frackend/meg';
import useKandidatlisteId from '../../felles/hooks/useKandidatlisteId';
import { lenkeTilStilling } from '../../felles/lenker';
import TilgangskontrollForInnhold, {
    Rolle,
} from '../../felles/tilgangskontroll/TilgangskontrollForInnhold';
import Kandidatlisteside from '../../kandidat/kandidatliste/Kandidatlisteside';
import store from '../../kandidat/state/reduxStore';
import DelayedSpinner from '../common/DelayedSpinner';
import { State } from '../redux/store';
import { REMOVE_AD_DATA } from './adDataReducer';
import Administration from './administration/Administration';
import AdministrationLimited from './administration/limited/AdministrationLimited';
import { EDIT_AD, FETCH_AD, PREVIEW_EDIT_AD } from './adReducer';
import Edit from './edit/Edit';
import Error from './error/Error';
import AdministrationPreview from './forhåndsvisning/administration/AdministrationPreview';
import Forhåndsvisning from './forhåndsvisning/Forhåndsvisning';
import PreviewHeader from './forhåndsvisning/header/PreviewHeader';
import Stillingstittel from './forhåndsvisning/header/Stillingstittel';
import KontekstAvKandidat from './kontekst-av-kandidat/KontekstAvKandidat';
import css from './Stilling.module.css';
import StillingKandidatKnapper from './StillingKandidatKnapper';
import VisStillingBanner from './VisStillingBanner';

export const REDIGERINGSMODUS_QUERY_PARAM = 'redigeringsmodus';

type QueryParams = { uuid: string };

const Stilling = () => {
    const params = useParams<{ fane: string | undefined }>();
    const fane = params.fane ?? 'om_stillingen';
    const visVarsling = useVisVarsling();

    const dispatch = useDispatch();
    const location = useLocation();
    const { uuid } = useParams<QueryParams>();
    const { isEditingAd, isSavingAd, isLoadingAd } = useSelector((state: State) => state.ad);

    const [searchParams, setSearchParams] = useSearchParams();
    const kandidatnrFraStillingssøk = searchParams.get('kandidat');
    const navigate = useNavigate();
    const stilling = useSelector((state: State) => state.adData);
    const stillingsinfo = useSelector((state: State) => state.stillingsinfoData);

    const erFormidling = stillingsinfo.stillingskategori === Stillingskategori.Formidling;

    const { kandidatlisteId } = useKandidatlisteId(uuid);

    const { navIdent } = useMeg();

    const erEier =
        stilling?.administration?.navIdent === navIdent || stillingsinfo?.eierNavident === navIdent;

    const harKandidatlisteSomKanÅpnes = erEier && kandidatlisteId;

    const getStilling = (uuid: string, edit: boolean) => {
        dispatch({ type: FETCH_AD, uuid, edit });
    };

    const previewAd = () => {
        dispatch({ type: PREVIEW_EDIT_AD });
    };

    const removeAdData = () => {
        dispatch({ type: REMOVE_AD_DATA });
    };

    const enableEditMode = () => {
        dispatch({ type: EDIT_AD });
    };

    const fjernRedigeringsmodusFraUrl = () => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.delete(REDIGERINGSMODUS_QUERY_PARAM);

        setSearchParams(newSearchParams);
    };

    const onPreviewAdClick = () => {
        fjernRedigeringsmodusFraUrl();
        previewAd();
    };

    const onFaneChange = (fane: string) => {
        navigate(
            lenkeTilStilling({
                /*@ts-ignore: TODO: written before strict-mode enabled */
                stillingsId: stilling.uuid,
                fane:
                    fane === 'om_stillingen' ? undefined : fane === 'kandidater' ? fane : undefined,
            })
        );
    };

    if (isEditingAd && !erEier) {
        fjernRedigeringsmodusFraUrl();
        previewAd();
    }

    useEffect(() => {
        const erRedigeringsmodus = searchParams.get(REDIGERINGSMODUS_QUERY_PARAM) === 'true';

        if (isEditingAd && isSavingAd) {
            enableEditMode();
            visVarsling({
                innhold:
                    'Vi beholdt endringene dine, men de er ennå ikke publisert fordi sesjonen din utløp',
            });
        } else if (uuid) {
            getStilling(uuid, erRedigeringsmodus);
        }

        return () => {
            removeAdData();
        };

        /* eslint-disable react-hooks/exhaustive-deps */
    }, [uuid]);

    useEffect(() => {
        const manglerUuidIUrl = !uuid && stilling?.uuid;

        // Skjer når man kommer rett til /stillinger/stilling uten uuid
        if (manglerUuidIUrl) {
            navigate(
                {
                    pathname: `/stillinger/stilling/${uuid}`,
                },
                {
                    replace: true,
                    state: location.state,
                }
            );
        }
    }, [uuid]);

    if (isLoadingAd || !stilling) {
        return (
            <div className={css.spinner}>
                <DelayedSpinner />
            </div>
        );
    }

    if (stilling.status === Status.Slettet) {
        return (
            <div className={css.slettet}>
                <BodyLong spacing>Stillingen er slettet</BodyLong>
                <Link to="/stillinger" className="navds-link">
                    Stillinger
                </Link>
            </div>
        );
    }

    const stillingsSide = (optionalTittel: ReactNode = null) => (
        <div className={css.stilling}>
            <div className={css.innhold}>
                <main className={css.venstre}>
                    <div className={css.venstreInnhold}>
                        {isEditingAd ? (
                            <>
                                {erEksternStilling ? (
                                    <>
                                        <PreviewHeader
                                            /*@ts-ignore: TODO: written before strict-mode enabled */
                                            kandidatlisteId={kandidatlisteId}
                                            erEier={erEier}
                                        />
                                        {optionalTittel}
                                        <Forhåndsvisning
                                            stilling={stilling}
                                            erFormidling={erFormidling}
                                        />
                                    </>
                                ) : (
                                    <Edit
                                        erFormidling={erFormidling}
                                        innloggetBruker={navIdent}
                                        onPreviewAdClick={onPreviewAdClick}
                                    />
                                )}
                            </>
                        ) : (
                            <>
                                {!kandidatnrFraStillingssøk && (
                                    <PreviewHeader
                                        erEier={erEier}
                                        /*@ts-ignore: TODO: written before strict-mode enabled */
                                        kandidatlisteId={kandidatlisteId}
                                    />
                                )}
                                {optionalTittel}
                                <Forhåndsvisning stilling={stilling} erFormidling={erFormidling} />
                            </>
                        )}
                    </div>
                </main>
                <aside className={css.høyre}>
                    {isEditingAd ? (
                        <>
                            {erEksternStilling ? (
                                <AdministrationLimited kandidatlisteId={kandidatlisteId} />
                            ) : (
                                <Administration />
                            )}
                        </>
                    ) : (
                        <AdministrationPreview erEier={erEier} />
                    )}
                </aside>
            </div>
            <Error />
        </div>
    );

    const erEksternStilling = stilling?.createdBy !== System.Rekrutteringsbistand;

    if (kandidatnrFraStillingssøk) {
        return (
            <>
                <KontekstAvKandidat
                    /*@ts-ignore: TODO: written before strict-mode enabled */
                    kandidatlisteId={kandidatlisteId}
                    kandidatnr={kandidatnrFraStillingssøk}
                    stilling={stilling}
                />
                {stillingsSide(
                    <Stillingstittel
                        tittel={hentTittelFraStilling(stilling)}
                        employer={stilling.properties.employer}
                        location={stilling.location}
                    />
                )}
            </>
        );
    }

    return (
        <>
            <div className={css.banner}>
                <VisStillingBanner stilling={stilling} stillingsinfo={stillingsinfo} />
            </div>
            <Tabs value={fane} onChange={onFaneChange}>
                <div className={css.faner}>
                    <Tabs.List>
                        <Tabs.Tab value="om_stillingen" label="Om stillingen" />
                        <TilgangskontrollForInnhold
                            skjulVarsel
                            kreverEnAvRollene={[
                                Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                                Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
                            ]}
                        >
                            {harKandidatlisteSomKanÅpnes && (
                                <Tabs.Tab value="kandidater" label="Kandidater" />
                            )}
                        </TilgangskontrollForInnhold>
                    </Tabs.List>
                    <StillingKandidatKnapper
                        /*@ts-ignore: TODO: written before strict-mode enabled */
                        kandidatlisteId={kandidatlisteId}
                        stillingId={stilling.uuid}
                        erEier={erEier}
                        erFormidling={erFormidling}
                    />
                </div>
                <Tabs.Panel value="om_stillingen" style={{ position: 'relative' }}>
                    {stillingsSide()}
                </Tabs.Panel>

                {harKandidatlisteSomKanÅpnes && (
                    <Tabs.Panel value="kandidater">
                        <TilgangskontrollForInnhold
                            kreverEnAvRollene={[
                                Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                            ]}
                        >
                            <Provider store={store}>
                                <Kandidatlisteside skjulBanner={true} stilling={stilling} />
                            </Provider>
                        </TilgangskontrollForInnhold>
                    </Tabs.Panel>
                )}
            </Tabs>
        </>
    );
};

export default Stilling;
