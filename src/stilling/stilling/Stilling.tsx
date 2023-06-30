import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { BodyLong } from '@navikt/ds-react';

import { EDIT_AD, FETCH_AD, PREVIEW_EDIT_AD } from './adReducer';
import { Nettstatus } from '../api/Nettressurs';
import { REMOVE_AD_DATA } from './adDataReducer';
import { State } from '../redux/store';
import { VarslingActionType } from '../common/varsling/varslingReducer';
import Administration from './administration/Administration';
import AdministrationLimited from './administration/limited/AdministrationLimited';
import AdministrationPreview from './forhåndsvisning/administration/AdministrationPreview';
import DelayedSpinner from '../common/DelayedSpinner';
import Edit from './edit/Edit';
import Error from './error/Error';
import PreviewHeader from './forhåndsvisning/header/PreviewHeader';
import useHentKandidatliste from './kandidathandlinger/useHentKandidatliste';
import Forhåndsvisning from './forhåndsvisning/Forhåndsvisning';
import Stillingstittel from './forhåndsvisning/header/Stillingstittel';
import KontekstAvKandidat from './kontekst-av-kandidat/KontekstAvKandidat';
import { Status, System } from '../domene/Stilling';
import css from './Stilling.module.css';

export const REDIGERINGSMODUS_QUERY_PARAM = 'redigeringsmodus';

type QueryParams = { uuid: string };

const Stilling = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { uuid } = useParams<QueryParams>();
    const { isEditingAd, isSavingAd, isLoadingAd } = useSelector((state: State) => state.ad);
    const [searchParams, setSearchParams] = useSearchParams();
    const fnrFraStillingssøk = searchParams.get('fnr');
    const navigate = useNavigate();
    const stilling = useSelector((state: State) => state.adData);
    const [kandidatliste, setKandidatliste] = useHentKandidatliste(stilling?.uuid);

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
                    Søk etter stillinger
                </Link>
            </div>
        );
    }

    const erEksternStilling = stilling?.createdBy !== System.Rekrutteringsbistand;
    const kandidatlisteId =
        kandidatliste.kind === Nettstatus.Suksess ? kandidatliste.data.kandidatlisteId : '';

    return (
        <div className={css.stilling}>
            {fnrFraStillingssøk && (
                <KontekstAvKandidat
                    fnr={fnrFraStillingssøk}
                    kandidatliste={kandidatliste}
                    setKandidatliste={setKandidatliste}
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
                                        <PreviewHeader kandidatliste={kandidatliste} />
                                        <Stillingstittel
                                            tittel={stilling.title}
                                            employer={stilling.properties.employer}
                                            location={stilling.location}
                                        />
                                        <Forhåndsvisning stilling={stilling} />
                                    </>
                                ) : (
                                    <Edit
                                        kandidatliste={kandidatliste}
                                        onPreviewAdClick={onPreviewAdClick}
                                    />
                                )}
                            </>
                        ) : (
                            <>
                                {!fnrFraStillingssøk && (
                                    <PreviewHeader kandidatliste={kandidatliste} />
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
};

export default Stilling;
