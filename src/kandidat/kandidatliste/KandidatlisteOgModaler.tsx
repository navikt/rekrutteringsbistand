import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Kandidatstatus } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import Kandidatlistetype from 'felles/domene/kandidatliste/Kandidatliste';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { AlertType, VisVarslingAction, useVisVarsling } from 'felles/varsling/Varsling';
import Stilling from '../../felles/domene/stilling/Stilling';
import AppState from '../state/AppState';
import Kandidatliste from './Kandidatliste';
import { Kandidattilstander } from './domene/Kandidatressurser';
import { erKobletTilStilling, kandidaterMåGodkjenneDelingAvCv } from './domene/kandidatlisteUtils';
import {
    ForespørslerGruppertPåAktørId,
    hentForespørslerForKandidatForStilling,
} from './knappe-rad/forespørsel-om-deling-av-cv/Forespørsel';
import SendSmsModal from './modaler/SendSmsModal';
import PresenterKandidaterModal from './modaler/presenter-kandidater/PresenterKandidaterModal';
import KandidatlisteAction from './reducer/KandidatlisteAction';
import KandidatlisteActionType from './reducer/KandidatlisteActionType';

type OwnProps = {
    kandidatliste: Kandidatlistetype;
    skjulBanner?: boolean;
    stilling?: Stilling;
    navKontor?: string;
};

type ConnectedProps = {
    endreStatusKandidat: any;
    fodselsnummer?: string;
    toggleArkivert: (
        kandidatlisteId: string,
        kandidatnr: string,
        arkivert: boolean,
        navKontor: string
    ) => void;
    angreArkiveringForKandidater: (
        kandidatlisteId: string,
        kandidatnumre: string[],
        navKontor: string
    ) => void;
    statusArkivering: Nettstatus;
    statusDearkivering: Nettstatus;
    toggleMarkeringAvKandidat: (kandidatnr: string) => void;
    endreMarkeringAvKandidater: (kandidatnumre: string[]) => void;
    kandidattilstander: Kandidattilstander;
    forespørslerOmDelingAvCv: Nettressurs<ForespørslerGruppertPåAktørId>;
};

type Props = ConnectedProps & OwnProps & { visVarsling: (props: VisVarslingAction) => void };

class LegacyKandidatlisteOgModaler extends React.Component<Props> {
    declare state: {
        deleModalOpen: boolean;
        sendSmsModalOpen: boolean;
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            deleModalOpen: false,
            sendSmsModalOpen: false,
        };
    }

    componentDidUpdate(prevProps: Props) {
        const enKandidatErNettoppArkivert =
            prevProps.statusArkivering === Nettstatus.LasterInn &&
            this.props.statusArkivering === Nettstatus.Suksess;

        const arkiveringFeiletNettopp =
            prevProps.statusArkivering === Nettstatus.LasterInn &&
            this.props.statusArkivering === Nettstatus.Feil;

        const enKandidatErNettoppDearkivert =
            prevProps.statusDearkivering === Nettstatus.LasterInn &&
            this.props.statusDearkivering === Nettstatus.Suksess;

        const dearkiveringFeiletNettopp =
            prevProps.statusDearkivering === Nettstatus.LasterInn &&
            this.props.statusDearkivering === Nettstatus.Feil;

        if (enKandidatErNettoppArkivert) {
            this.visInfobanner(`Kandidaten ble slettet`);
        }

        if (arkiveringFeiletNettopp) {
            this.visInfobanner(`Det skjedde noe galt under sletting av kandidaten`, 'error');
        }

        if (enKandidatErNettoppDearkivert) {
            this.visInfobanner(`Kandidaten ble lagt tilbake i kandidatlisten`);
        }

        if (dearkiveringFeiletNettopp) {
            this.visInfobanner(
                `Det skjedde noe galt, kunne ikke legge kandidaten tilbake i kandidatlisten`,
                'error'
            );
        }
    }

    fjernAllMarkering = () => {
        this.props.endreMarkeringAvKandidater([]);
    };

    toggleMarkert = (kandidatnr: string) => {
        this.props.toggleMarkeringAvKandidat(kandidatnr);
    };

    markerKandidater = (kandidatnumre: string[]) => {
        this.props.endreMarkeringAvKandidater(kandidatnumre);
    };

    onToggleDeleModal = () => {
        this.setState({
            deleModalOpen: !this.state.deleModalOpen,
        });
    };

    onCloseDeleModal = (fjernMarkering: boolean) => {
        this.setState({
            deleModalOpen: false,
        });

        if (fjernMarkering) {
            this.fjernAllMarkering();
        }
    };

    onToggleSendSmsModal = (vis = !this.state.sendSmsModalOpen) => {
        this.setState({
            sendSmsModalOpen: vis,
        });
    };

    hentMarkerteKandidater = () => {
        const { kandidatliste, kandidattilstander } = this.props;

        return kandidatliste.kandidater.filter(
            (kandidat) => kandidattilstander[kandidat.kandidatnr]?.markert
        );
    };

    hentMarkerteKandidaterSomHarSvartJa = () => {
        const forespørsler = this.props.forespørslerOmDelingAvCv;

        return this.hentMarkerteKandidater().filter(
            (kandidat) =>
                forespørsler.kind === Nettstatus.Suksess &&
                hentForespørslerForKandidatForStilling(kandidat.aktørid, forespørsler.data)
                    ?.gjeldendeForespørsel?.svar?.harSvartJa
        );
    };

    hentKandidatnumrePåMarkerteKandidater = () => {
        return this.hentMarkerteKandidater().map((kandidat) => kandidat.kandidatnr);
    };

    onKandidaterAngreArkivering = () => {
        const markerteKandidater = this.hentKandidatnumrePåMarkerteKandidater();

        this.props.angreArkiveringForKandidater(
            this.props.kandidatliste.kandidatlisteId,
            markerteKandidater,
            this.props.navKontor || ''
        );
    };

    visInfobanner = (tekst: string, type: AlertType = 'success') => {
        this.props.visVarsling({ innhold: tekst, alertType: type });
    };

    render() {
        const { deleModalOpen } = this.state;
        const { kandidatliste, endreStatusKandidat, toggleArkivert } = this.props;
        const { kandidater } = kandidatliste;

        const markerteKandidater = this.hentMarkerteKandidater();
        const kandidaterSomHarSvartJa = this.hentMarkerteKandidaterSomHarSvartJa();

        return (
            <div>
                <PresenterKandidaterModal
                    vis={deleModalOpen}
                    onClose={this.onCloseDeleModal}
                    kandidatliste={kandidatliste}
                    markerteKandidater={markerteKandidater}
                    kandidaterSomHarSvartJa={kandidaterSomHarSvartJa}
                    alleKandidaterMåGodkjenneForespørselOmDelingAvCvForÅPresentere={
                        erKobletTilStilling(kandidatliste) &&
                        kandidaterMåGodkjenneDelingAvCv(kandidatliste)
                    }
                    stilling={this.props.stilling}
                />
                {kandidatliste.stillingId && (
                    <>
                        <SendSmsModal
                            vis={this.state.sendSmsModalOpen}
                            onClose={() => this.onToggleSendSmsModal(false)}
                            kandidater={kandidater}
                            stillingskategori={kandidatliste.stillingskategori}
                            stillingId={kandidatliste.stillingId}
                            fjernAllMarkering={this.fjernAllMarkering}
                        />
                    </>
                )}
                <Kandidatliste
                    skjulBanner={this.props.skjulBanner}
                    kandidatliste={kandidatliste}
                    onToggleMarkert={this.toggleMarkert}
                    onFjernAllMarkering={this.fjernAllMarkering}
                    onMarkerKandidater={this.markerKandidater}
                    onKandidatStatusChange={endreStatusKandidat}
                    onKandidatShare={this.onToggleDeleModal}
                    onKandidaterAngreArkivering={this.onKandidaterAngreArkivering}
                    onSendSmsClick={() => this.onToggleSendSmsModal(true)}
                    onToggleArkivert={toggleArkivert}
                    organisasjonsnummerFraStilling={this.props.stilling?.employer?.orgnr}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    fodselsnummer: state.kandidatliste.fodselsnummer,
    statusArkivering: state.kandidatliste.arkivering.statusArkivering,
    statusDearkivering: state.kandidatliste.arkivering.statusDearkivering,
    kandidattilstander: state.kandidatliste.kandidattilstander,
    forespørslerOmDelingAvCv: state.kandidatliste.forespørslerOmDelingAvCv,
});

const mapDispatchToProps = (dispatch: Dispatch<KandidatlisteAction>) => ({
    endreStatusKandidat: (status: Kandidatstatus, kandidatlisteId: string, kandidatnr: string) => {
        dispatch({
            type: KandidatlisteActionType.EndreStatusKandidat,
            status,
            kandidatlisteId,
            kandidatnr,
        });
    },
    toggleArkivert: (
        kandidatlisteId: string,
        kandidatnr: string,
        arkivert: boolean,
        navKontor: string
    ) => {
        dispatch({
            type: KandidatlisteActionType.ToggleArkivert,
            kandidatlisteId,
            kandidatnr,
            arkivert,
            navKontor,
        });
    },
    angreArkiveringForKandidater: (
        kandidatlisteId: string,
        kandidatnumre: string[],
        navKontor: string
    ) => {
        dispatch({
            type: KandidatlisteActionType.AngreArkivering,
            kandidatlisteId,
            kandidatnumre,
            navKontor,
        });
    },
    toggleMarkeringAvKandidat: (kandidatnr: string) => {
        dispatch({
            type: KandidatlisteActionType.ToggleMarkeringAvKandidat,
            kandidatnr,
        });
    },
    endreMarkeringAvKandidater: (kandidatnumre: string[]) => {
        dispatch({
            type: KandidatlisteActionType.EndreMarkeringAvKandidater,
            kandidatnumre,
        });
    },
});

const ConnectedLegacyKandidatlisteOgModaler = connect(
    mapStateToProps,
    mapDispatchToProps
)(LegacyKandidatlisteOgModaler);

const KandidatlisteOgModaler = (props: OwnProps) => {
    const visVarsling = useVisVarsling();

    return <ConnectedLegacyKandidatlisteOgModaler visVarsling={visVarsling} {...props} />;
};
export default KandidatlisteOgModaler;
