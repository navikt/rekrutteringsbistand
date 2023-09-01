import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Kandidatstatus } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import Kandidatlistetype from 'felles/domene/kandidatliste/Kandidatliste';
import { SmsStatus } from 'felles/domene/sms/Sms';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import AppState from '../state/AppState';
import { AlertType, VarslingAction, VarslingActionType } from '../varsling/varslingReducer';
import Kandidatliste from './Kandidatliste';
import { Kandidatmeldinger, Kandidattilstander } from './domene/Kandidatressurser';
import { erKobletTilStilling, kandidaterMåGodkjenneDelingAvCv } from './domene/kandidatlisteUtils';
import {
    ForespørslerGruppertPåAktørId,
    hentForespørslerForKandidatForStilling,
} from './knappe-rad/forespørsel-om-deling-av-cv/Forespørsel';
import SendSmsModal from './modaler/SendSmsModal';
import LeggTilKandidatModal from './modaler/legg-til-kandidat-modal/LeggTilKandidatModal';
import PresenterKandidaterModal from './modaler/presenter-kandidater/PresenterKandidaterModal';
import KandidatlisteAction from './reducer/KandidatlisteAction';
import KandidatlisteActionType from './reducer/KandidatlisteActionType';

type OwnProps = {
    kandidatliste: Kandidatlistetype;
};

type ConnectedProps = {
    endreStatusKandidat: any;
    smsSendStatus: SmsStatus;
    resetSmsSendStatus: () => void;
    fodselsnummer?: string;
    toggleArkivert: (kandidatlisteId: string, kandidatnr: string, arkivert: boolean) => void;
    angreArkiveringForKandidater: (kandidatlisteId: string, kandidatnumre: string[]) => void;
    statusArkivering: Nettstatus;
    statusDearkivering: Nettstatus;
    toggleMarkeringAvKandidat: (kandidatnr: string) => void;
    endreMarkeringAvKandidater: (kandidatnumre: string[]) => void;
    kandidattilstander: Kandidattilstander;
    sendteMeldinger: Nettressurs<Kandidatmeldinger>;
    forespørslerOmDelingAvCv: Nettressurs<ForespørslerGruppertPåAktørId>;
    visVarsling: (innhold: string, alertType: AlertType) => void;
};

type Props = ConnectedProps & OwnProps;

class KandidatlisteOgModaler extends React.Component<Props> {
    declare state: {
        deleModalOpen: boolean;
        leggTilModalOpen: boolean;
        sendSmsModalOpen: boolean;
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            deleModalOpen: false,
            leggTilModalOpen: false,
            sendSmsModalOpen: false,
        };
    }

    componentDidUpdate(prevProps: Props) {
        const smsErNettoppSendtTilKandidater =
            this.props.smsSendStatus !== prevProps.smsSendStatus &&
            this.props.smsSendStatus === SmsStatus.Sendt;

        const feilMedSmsUtsending =
            this.props.smsSendStatus !== prevProps.smsSendStatus &&
            this.props.smsSendStatus === SmsStatus.Feil;

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

        if (smsErNettoppSendtTilKandidater) {
            this.props.resetSmsSendStatus();
            this.visInfobanner('SMS-en er sendt');
            this.fjernAllMarkering();
            this.setState({
                sendSmsModalOpen: false,
            });
        }

        if (feilMedSmsUtsending) {
            this.props.resetSmsSendStatus();
            this.visInfobanner('Det skjedde en feil', 'error');
            this.setState({
                sendSmsModalOpen: false,
            });
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

    onToggleLeggTilKandidatModal = () => {
        this.setState({
            leggTilModalOpen: !this.state.leggTilModalOpen,
        });
    };

    onToggleSendSmsModal = (vis: boolean = !this.state.sendSmsModalOpen) => {
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
            markerteKandidater
        );
    };

    visInfobanner = (tekst: string, type: AlertType = 'success') => {
        this.props.visVarsling(tekst, type);
    };

    render() {
        const { deleModalOpen, leggTilModalOpen } = this.state;
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
                />
                <LeggTilKandidatModal
                    vis={leggTilModalOpen}
                    onClose={this.onToggleLeggTilKandidatModal}
                    stillingsId={kandidatliste.stillingId}
                    kandidatliste={kandidatliste}
                />
                {kandidatliste.stillingId &&
                    this.props.sendteMeldinger.kind === Nettstatus.Suksess && (
                        <>
                            <SendSmsModal
                                vis={this.state.sendSmsModalOpen}
                                onClose={() => this.onToggleSendSmsModal(false)}
                                kandidatlisteId={kandidatliste.kandidatlisteId}
                                kandidater={kandidater}
                                sendteMeldinger={this.props.sendteMeldinger.data}
                                stillingskategori={kandidatliste.stillingskategori}
                                stillingId={kandidatliste.stillingId}
                            />
                        </>
                    )}
                <Kandidatliste
                    kandidatliste={kandidatliste}
                    onToggleMarkert={this.toggleMarkert}
                    onFjernAllMarkering={this.fjernAllMarkering}
                    onMarkerKandidater={this.markerKandidater}
                    onKandidatStatusChange={endreStatusKandidat}
                    onKandidatShare={this.onToggleDeleModal}
                    onKandidaterAngreArkivering={this.onKandidaterAngreArkivering}
                    onSendSmsClick={() => this.onToggleSendSmsModal(true)}
                    onLeggTilKandidat={this.onToggleLeggTilKandidatModal}
                    onToggleArkivert={toggleArkivert}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    smsSendStatus: state.kandidatliste.sms.sendStatus,
    fodselsnummer: state.kandidatliste.fodselsnummer,
    sendteMeldinger: state.kandidatliste.sms.sendteMeldinger,
    statusArkivering: state.kandidatliste.arkivering.statusArkivering,
    statusDearkivering: state.kandidatliste.arkivering.statusDearkivering,
    kandidattilstander: state.kandidatliste.kandidattilstander,
    forespørslerOmDelingAvCv: state.kandidatliste.forespørslerOmDelingAvCv,
});

const mapDispatchToProps = (dispatch: Dispatch<KandidatlisteAction | VarslingAction>) => ({
    visVarsling: (innhold: string, alertType: AlertType) => {
        dispatch({
            type: VarslingActionType.VisVarsling,
            innhold,
            alertType,
        });
    },
    endreStatusKandidat: (status: Kandidatstatus, kandidatlisteId: string, kandidatnr: string) => {
        dispatch({
            type: KandidatlisteActionType.EndreStatusKandidat,
            status,
            kandidatlisteId,
            kandidatnr,
        });
    },
    resetSmsSendStatus: () => {
        dispatch({ type: KandidatlisteActionType.ResetSendSmsStatus });
    },
    toggleArkivert: (kandidatlisteId: string, kandidatnr: string, arkivert: boolean) => {
        dispatch({
            type: KandidatlisteActionType.ToggleArkivert,
            kandidatlisteId,
            kandidatnr,
            arkivert,
        });
    },
    angreArkiveringForKandidater: (kandidatlisteId: string, kandidatnumre: string[]) => {
        dispatch({
            type: KandidatlisteActionType.AngreArkivering,
            kandidatlisteId,
            kandidatnumre,
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

export default connect(mapStateToProps, mapDispatchToProps)(KandidatlisteOgModaler);
