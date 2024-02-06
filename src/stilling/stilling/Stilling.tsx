import { BodyLong, Tabs } from '@navikt/ds-react';
import { ReactNode, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { hentTittelFraStilling, Status, System } from 'felles/domene/stilling/Stilling';
import useInnloggetBruker from '../../api/frackend/hooks/useInnloggetBruker';
import useKandidatlisteId from '../../felles/hooks/useKandidatlisteId';
import { lenkeTilStilling } from '../../felles/lenker';
import Kandidatlisteside from '../../kandidat/kandidatliste/Kandidatlisteside';
import store from '../../kandidat/state/reduxStore';
import DelayedSpinner from '../common/DelayedSpinner';
import { VarslingActionType } from '../common/varsling/varslingReducer';
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

    const dispatch = useDispatch();
    const location = useLocation();
    const { uuid } = useParams<QueryParams>();
    const { isEditingAd, isSavingAd, isLoadingAd } = useSelector((state: State) => state.ad);

    const [searchParams, setSearchParams] = useSearchParams();
    const kandidatnrFraStillingssøk = searchParams.get('kandidat');
    const navigate = useNavigate();
    const stilling = useSelector((state: State) => state.adData);
    const stillingsinfo = useSelector((state: State) => state.stillingsinfoData);

    const { kandidatlisteId } = useKandidatlisteId(uuid);

    const { bruker } = useInnloggetBruker();

    const erEier =
        stilling?.administration?.navIdent === bruker.navIdent ||
        stillingsinfo?.eierNavident === bruker.navIdent;

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

    const showRecoveryMessage = (message: string) => {
        dispatch({
            type: VarslingActionType.VisVarsling,
            innhold: message,
        });
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
                stillingsId: stilling.uuid,
                fane:
                    fane === 'om_stillingen' ? undefined : fane === 'kandidater' ? fane : undefined,
            })
        );
    };

    useEffect(() => {
        const erRedigeringsmodus = searchParams.get(REDIGERINGSMODUS_QUERY_PARAM) === 'true';

        if (isEditingAd && isSavingAd) {
            enableEditMode();
            showRecoveryMessage(
                'Vi beholdt endringene dine, men de er ennå ikke publisert fordi sesjonen din utløp'
            );
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
                                            kandidatlisteId={kandidatlisteId}
                                            erEier={erEier}
                                        />
                                        {optionalTittel}
                                        <Forhåndsvisning stilling={stilling} />
                                    </>
                                ) : (
                                    <Edit
                                        innloggetBruker={bruker.navIdent}
                                        erEier={erEier}
                                        onPreviewAdClick={onPreviewAdClick}
                                        kandidatlisteId={kandidatlisteId}
                                    />
                                )}
                            </>
                        ) : (
                            <>
                                {!kandidatnrFraStillingssøk && (
                                    <PreviewHeader
                                        erEier={erEier}
                                        kandidatlisteId={kandidatlisteId}
                                    />
                                )}
                                {optionalTittel}
                                <Forhåndsvisning stilling={stilling} />
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
                        <AdministrationPreview />
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
                        {harKandidatlisteSomKanÅpnes && (
                            <Tabs.Tab value="kandidater" label="Kandidater" />
                        )}
                    </Tabs.List>
                    <StillingKandidatKnapper
                        kandidatlisteId={kandidatlisteId}
                        stillingId={stilling.uuid}
                        erEier={erEier}
                    />
                </div>
                <Tabs.Panel value="om_stillingen" style={{ position: 'relative' }}>
                    {stillingsSide()}
                </Tabs.Panel>
                {harKandidatlisteSomKanÅpnes && (
                    <Tabs.Panel value="kandidater">
                        <Provider store={store}>
                            <Kandidatlisteside skjulBanner={true} stilling={stilling} />
                        </Provider>
                    </Tabs.Panel>
                )}
            </Tabs>
        </>
    );
};

export default Stilling;
