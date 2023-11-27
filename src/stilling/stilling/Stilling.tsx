import { BodyLong, Tabs } from '@navikt/ds-react';
import { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { Status, System } from 'felles/domene/stilling/Stilling';
import useInnloggetBruker from '../../felles/hooks/useInnloggetBruker';
import Kandidatlisteside from '../../kandidat/kandidatliste/Kandidatlisteside';
import store from '../../kandidat/state/reduxStore';
import useKandidatlisteId from '../api/useKandidatlisteId';
import DelayedSpinner from '../common/DelayedSpinner';
import { VarslingActionType } from '../common/varsling/varslingReducer';
import { State } from '../redux/store';
import css from './Stilling.module.css';
import VisStillingBanner from './VisStillingBanner';
import { REMOVE_AD_DATA } from './adDataReducer';
import { EDIT_AD, FETCH_AD, PREVIEW_EDIT_AD } from './adReducer';
import Administration from './administration/Administration';
import AdministrationLimited from './administration/limited/AdministrationLimited';
import Edit from './edit/Edit';
import Error from './error/Error';
import Forhåndsvisning from './forhåndsvisning/Forhåndsvisning';
import AdministrationPreview from './forhåndsvisning/administration/AdministrationPreview';
import PreviewHeader from './forhåndsvisning/header/PreviewHeader';
import Stillingstittel from './forhåndsvisning/header/Stillingstittel';
import KontekstAvKandidat from './kontekst-av-kandidat/KontekstAvKandidat';

export const REDIGERINGSMODUS_QUERY_PARAM = 'redigeringsmodus';

type QueryParams = { uuid: string };

const Stilling = () => {
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

    const { navIdent: innloggetBruker } = useInnloggetBruker(null);

    const erEier =
        stilling?.administration?.navIdent === innloggetBruker ||
        stillingsinfo?.eierNavident === innloggetBruker;

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

    const erEksternStilling = stilling?.createdBy !== System.Rekrutteringsbistand;

    return (
        <div>
            <div style={{ marginLeft: '50px' }}>
                <VisStillingBanner stilling={stilling} />
            </div>
            <Tabs defaultValue="om_stillingen">
                <Tabs.List>
                    <Tabs.Tab value="om_stillingen" label="Om stillingen" />
                    {erEier && <Tabs.Tab value="kandidater_stilling" label="Kandidater" />}
                </Tabs.List>
                <Tabs.Panel value="om_stillingen" style={{ position: 'relative' }}>
                    <div>
                        <div className={css.stilling}>
                            {kandidatnrFraStillingssøk && (
                                <KontekstAvKandidat
                                    kandidatlisteId={kandidatlisteId}
                                    kandidatnr={kandidatnrFraStillingssøk}
                                    stilling={stilling}
                                />
                            )}

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
                                                        <Stillingstittel
                                                            tittel={stilling.title}
                                                            employer={stilling.properties.employer}
                                                            location={stilling.location}
                                                        />
                                                        <Forhåndsvisning stilling={stilling} />
                                                    </>
                                                ) : (
                                                    <Edit
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
                                                <Stillingstittel
                                                    tittel={stilling.title}
                                                    employer={stilling.properties.employer}
                                                    location={stilling.location}
                                                />
                                                <Forhåndsvisning stilling={stilling} />
                                            </>
                                        )}
                                    </div>
                                </main>
                                <aside className={css.høyre}>
                                    {isEditingAd ? (
                                        <>
                                            {erEksternStilling ? (
                                                <AdministrationLimited
                                                    kandidatlisteId={kandidatlisteId}
                                                />
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
                    </div>
                </Tabs.Panel>
                {erEier && (
                    <Tabs.Panel value="kandidater_stilling">
                        <Provider store={store}>
                            <Kandidatlisteside skjulBanner={true} stillingsId={stilling.uuid} />
                        </Provider>
                    </Tabs.Panel>
                )}
            </Tabs>
        </div>
    );
};

export default Stilling;
