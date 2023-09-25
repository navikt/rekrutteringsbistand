import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Button, Pagination } from '@navikt/ds-react';
import classNames from 'classnames';
import { ReactComponent as Piktogram } from 'felles/komponenter/piktogrammer/se-mine-stillinger.svg';
import { Nettstatus } from 'felles/nettressurs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { useNavigationType } from 'react-router-dom';
import Layout from '../../felles/layout/Layout';
import OpprettNyStilling from '../opprett-ny-stilling/OpprettNyStilling';
import { State } from '../redux/store';
import { CLEAR_COPIED_ADS } from '../stilling/adReducer';
import StopAdModal from '../stilling/administration/adStatus/StopAdModal';
import AntallStillinger from './AntallStillinger';
import css from './MineStillinger.module.css';
import { MineStillingerAction, MineStillingerActionType } from './MineStillingerAction';
import Filter from './filter/Filter';
import MineStillingerTabell from './tabell/MineStillingerTabell';

const MineStillinger = () => {
    const navigationType = useNavigationType();
    const dispatch = useDispatch();
    const { search } = useLocation();
    const { resultat, page } = useSelector((state: State) => state.mineStillinger);
    const reportee = useSelector((state: State) => state.reportee.data);

    const skalViseOpprettStillingModal = () => {
        const queryParams = new URLSearchParams(search);
        return queryParams.has('visOpprettStillingModal');
    };

    const [visOpprettStillingModal, setVisOpprettStillingModal] = useState(
        skalViseOpprettStillingModal()
    );

    useEffect(() => {
        if (reportee) {
            dispatch({ type: MineStillingerActionType.FetchMyAds });
        }
    }, [reportee, dispatch]);

    useEffect(() => {
        if (navigationType === 'PUSH') {
            dispatch({ type: MineStillingerActionType.ResetMyAdsPage });
        }

        return () => {
            dispatch({ type: CLEAR_COPIED_ADS });
        };
    }, [dispatch, navigationType]);

    const onOpprettNyClick = () => {
        setVisOpprettStillingModal(true);
    };

    const onOpprettNyStillingClose = () => {
        setVisOpprettStillingModal(false);
    };

    const onPageChange = (page: number) => {
        page = page - 1;
        dispatch<MineStillingerAction>({ type: MineStillingerActionType.ChangeMyAdsPage, page });
    };

    return (
        <Layout
            tittel="Mine stillinger"
            ikon={<Piktogram />}
            bannerKnapp={
                <Button
                    variant="secondary"
                    onClick={onOpprettNyClick}
                    icon={<PlusCircleIcon aria-hidden />}
                >
                    Opprett ny
                </Button>
            }
            sidepanel={<Filter className={css.filter} />}
        >
            <div className={css.wrapper}>
                <StopAdModal fromMyAds />

                <div className={css.antallStillinger}>
                    <AntallStillinger resultat={resultat} />
                </div>
                <MineStillingerTabell resultat={resultat} className={css.tabell} />

                {resultat.kind === Nettstatus.Suksess && (
                    <>
                        {resultat.data.content.length > 0 ? (
                            <Pagination
                                page={page + 1}
                                count={resultat.data.totalPages}
                                onPageChange={onPageChange}
                                className={classNames(css.underTabell, css.paginering)}
                            />
                        ) : null}
                    </>
                )}
                {visOpprettStillingModal && (
                    <OpprettNyStilling onClose={onOpprettNyStillingClose} />
                )}
            </div>
        </Layout>
    );
};

export default MineStillinger;
