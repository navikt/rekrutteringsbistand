import { Button, Heading, Pagination } from '@navikt/ds-react';
import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';

import { PlusCircleIcon } from '@navikt/aksel-icons';
import { KandidatlisteSammendrag } from 'felles/domene/kandidatliste/Kandidatliste';
import Banner from 'felles/komponenter/banner/Banner';
import { ReactComponent as Piktogram } from 'felles/komponenter/piktogrammer/finn-stillinger.svg';
import { Nettstatus } from 'felles/nettressurs';
import KandidatlisteAction from '../kandidatliste/reducer/KandidatlisteAction';
import KandidatlisteActionType from '../kandidatliste/reducer/KandidatlisteActionType';
import AppState from '../state/AppState';
import css from './Kandidatlisteoversikt.module.css';
import Filter, { Stillingsfilter } from './filter/Filter';
import EndreModal from './modaler/EndreModal';
import MarkerSomMinModal from './modaler/MarkerSomMinModal';
import OpprettModal from './modaler/OpprettModal';
import SlettModal from './modaler/SlettModal';
import { ListeoversiktAction, ListeoversiktActionType } from './reducer/ListeoversiktAction';
import { Søkekriterier } from './reducer/listeoversiktReducer';
import Kandidatlistesøk from './søk/Kandidatlistesøk';
import Kandidatlistetabell from './tabell/Kandidatlistetabell';
import TabellBody from './tabell/TabellBody';
import TabellHeader from './tabell/TabellHeader';

const SIDESTØRRELSE = 20;

enum Modalvisning {
    Ingen,
    Opprett,
    Endre,
    Slette,
    MarkerSomMin,
}

type ModalMedKandidatliste = {
    visning: Modalvisning.Endre | Modalvisning.MarkerSomMin | Modalvisning.Slette;
    kandidatliste: KandidatlisteSammendrag;
};

type ModalUtenKandidatliste = {
    visning: Modalvisning.Opprett | Modalvisning.Ingen;
};

export type KandidatlisterSøkekriterier = {
    query: string;
    type: Stillingsfilter;
    kunEgne: boolean;
    pagenumber: number;
    pagesize: number;
};

type Props = {
    hentKandidatlister: (søkekriterier: Søkekriterier) => void;
    kandidatlisterStatus: Nettstatus;
    kandidatlister: KandidatlisteSammendrag[];
    totaltAntallKandidatlister: number;
    søkekriterier: KandidatlisterSøkekriterier;
    nullstillValgtKandidatIKandidatliste: () => void;
};

class Kandidatlisteoversikt extends React.Component<Props> {
    declare state: {
        søkeOrd: string;
        modal: ModalUtenKandidatliste | ModalMedKandidatliste;
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            søkeOrd: this.props.søkekriterier.query,
            modal: {
                visning: Modalvisning.Ingen,
            },
        };
    }

    componentDidMount() {
        this.refreshKandidatlister();
        this.props.nullstillValgtKandidatIKandidatliste();
    }

    refreshKandidatlister = () => {
        const { query, type, kunEgne, pagenumber } = this.props.søkekriterier;
        this.props.hentKandidatlister({
            query,
            type,
            kunEgne,
            pagenumber,
            pagesize: SIDESTØRRELSE,
        });
    };

    onFilterChange = (verdi: Stillingsfilter) => {
        const { query, kunEgne, type } = this.props.søkekriterier;

        if (verdi !== type) {
            this.props.hentKandidatlister({
                query,
                type: verdi,
                kunEgne,
                pagenumber: 0,
                pagesize: SIDESTØRRELSE,
            });
        }
    };

    onSøkeOrdChange = (value: string) => {
        this.setState({ søkeOrd: value });
    };

    onSubmitSøkKandidatlister = (e) => {
        e.preventDefault();
        const { type, kunEgne } = this.props.søkekriterier;
        this.props.hentKandidatlister({
            query: this.state.søkeOrd,
            type,
            kunEgne,
            pagenumber: 0,
            pagesize: SIDESTØRRELSE,
        });
    };

    onNullstillSøkClick = () => {
        const { query, type, kunEgne, pagenumber } = this.props.søkekriterier;
        if (this.state.søkeOrd !== '') {
            this.setState({ søkeOrd: '' });
        }

        if (query !== '' || type !== '' || !kunEgne || pagenumber !== 0) {
            this.props.hentKandidatlister({
                query: '',
                type: Stillingsfilter.Ingen,
                kunEgne: true,
                pagenumber: 0,
                pagesize: SIDESTØRRELSE,
            });
        }
    };

    onOpprettClick = () => {
        this.setState({
            modal: {
                visning: Modalvisning.Opprett,
            },
        });
    };

    handleRedigerClick = (kandidatliste: KandidatlisteSammendrag) => {
        this.setState({
            modal: {
                visning: Modalvisning.Endre,
                kandidatliste,
            },
        });
    };

    handleMarkerSomMinClick = (kandidatliste: KandidatlisteSammendrag) => {
        this.setState({
            modal: {
                visning: Modalvisning.MarkerSomMin,
                kandidatliste,
            },
        });
    };

    handleSlettClick = (kandidatliste: KandidatlisteSammendrag) => {
        this.setState({
            modal: {
                visning: Modalvisning.Slette,
                kandidatliste,
            },
        });
    };

    handleLukkModal = (refreshKandidatlister?: boolean) => {
        this.setState({
            modal: {
                visning: Modalvisning.Ingen,
            },
        });

        if (refreshKandidatlister === true) {
            this.refreshKandidatlister();
        }
    };

    onVisMineKandidatlister = () => {
        const { query, type, kunEgne } = this.props.søkekriterier;
        if (!kunEgne) {
            this.props.hentKandidatlister({
                query,
                type,
                kunEgne: true,
                pagenumber: 0,
                pagesize: SIDESTØRRELSE,
            });
        }
    };

    onVisAlleKandidatlister = () => {
        const { query, type, kunEgne } = this.props.søkekriterier;
        if (kunEgne) {
            this.props.hentKandidatlister({
                query,
                type,
                kunEgne: false,
                pagenumber: 0,
                pagesize: SIDESTØRRELSE,
            });
        }
    };

    onPageChange = (nyttSidenummer: number) => {
        const { query, type, kunEgne } = this.props.søkekriterier;
        this.props.hentKandidatlister({
            query,
            type,
            kunEgne,
            pagenumber: nyttSidenummer - 1,
            pagesize: SIDESTØRRELSE,
        });
    };

    visSuccessMelding = (melding: string) => {
        this.setState({
            visSuccessMelding: true,
            successMelding: melding,
        });
    };

    render() {
        const { kandidatlister, totaltAntallKandidatlister, kandidatlisterStatus, søkekriterier } =
            this.props;
        const { søkeOrd, modal } = this.state;

        const tittel = `${
            totaltAntallKandidatlister === undefined ? '0' : totaltAntallKandidatlister
        } kandidatliste${totaltAntallKandidatlister === 1 ? '' : 'r'}`;

        return (
            <div>
                {modal.visning === Modalvisning.Opprett && (
                    <OpprettModal onClose={this.handleLukkModal} />
                )}
                {modal.visning === Modalvisning.Endre && (
                    <EndreModal
                        kandidatliste={modal.kandidatliste}
                        onClose={this.handleLukkModal}
                    />
                )}
                {modal.visning === Modalvisning.MarkerSomMin && (
                    <MarkerSomMinModal
                        kandidatliste={modal.kandidatliste}
                        stillingsId={modal.kandidatliste.stillingId}
                        onClose={this.handleLukkModal}
                    />
                )}
                {modal.visning === Modalvisning.Slette && (
                    <SlettModal
                        kandidatliste={modal.kandidatliste}
                        onClose={this.handleLukkModal}
                    />
                )}
                <Banner tittel="Kandidatlister" ikon={<Piktogram />}>
                    <Button
                        variant="secondary"
                        icon={<PlusCircleIcon />}
                        onClick={this.onOpprettClick}
                    >
                        Opprett ny
                    </Button>
                </Banner>
                <div className={css.wrapper}>
                    <div className={css.venstreKolonne}>
                        <Kandidatlistesøk
                            søkeOrd={søkeOrd}
                            onSøkeOrdChange={this.onSøkeOrdChange}
                            onSubmitSøkKandidatlister={this.onSubmitSøkKandidatlister}
                            nullstillSøk={this.onNullstillSøkClick}
                        />
                        <Filter
                            className={css.filter}
                            søkekriterier={søkekriterier}
                            onVisMineKandidatlister={this.onVisMineKandidatlister}
                            onVisAlleKandidatlister={this.onVisAlleKandidatlister}
                            onFilterChange={this.onFilterChange}
                        />
                    </div>

                    <div className={css.overTabell}>
                        <Heading level="1" size="medium">
                            {tittel}
                        </Heading>
                    </div>
                    <Kandidatlistetabell
                        className={css.tabell}
                        nettstatus={kandidatlisterStatus}
                        kandidatlister={kandidatlister}
                    >
                        <TabellHeader />
                        <TabellBody
                            kandidatlister={kandidatlister}
                            onRedigerClick={this.handleRedigerClick}
                            onMarkerSomMinClick={this.handleMarkerSomMinClick}
                            onSlettClick={this.handleSlettClick}
                        />
                    </Kandidatlistetabell>
                    {kandidatlisterStatus === Nettstatus.Suksess && (
                        <Pagination
                            page={søkekriterier.pagenumber + 1}
                            count={Math.ceil(totaltAntallKandidatlister / SIDESTØRRELSE)}
                            onPageChange={this.onPageChange}
                            className={classNames(css.underTabell, css.paginering)}
                        />
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    kandidatlisterStatus: state.listeoversikt.hentListerStatus,
    kandidatlister: state.listeoversikt.kandidatlister.liste,
    totaltAntallKandidatlister: state.listeoversikt.kandidatlister.antall,
    søkekriterier: state.listeoversikt.søkekriterier,
});

const mapDispatchToProps = (
    dispatch: (action: ListeoversiktAction | KandidatlisteAction) => void
) => ({
    hentKandidatlister: (søkekriterier: Søkekriterier) =>
        dispatch({
            type: ListeoversiktActionType.HentKandidatlister,
            søkekriterier,
        }),
    nullstillValgtKandidatIKandidatliste: () =>
        dispatch({
            type: KandidatlisteActionType.VelgKandidat,
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Kandidatlisteoversikt);
