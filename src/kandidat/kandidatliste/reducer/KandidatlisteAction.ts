import KandidatIKandidatliste, {
    Kandidatstatus,
    Kandidatutfall,
} from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import Kandidatliste, { Kandidatlistestatus } from 'felles/domene/kandidatliste/Kandidatliste';
import { Error } from 'felles/nettressurs';
import { FormidlingAvUsynligKandidatOutboundDto } from '../../../api/server.dto';
import { SearchApiError } from '../../api/fetchUtils';
import { ForespørslerForStillingInboundDto } from '../../api/forespørselOmDelingAvCvApi';
import { Visningsstatus } from '../domene/Kandidatressurser';
import { ForespørselOutboundDto } from '../knappe-rad/forespørsel-om-deling-av-cv/Forespørsel';
import KandidatlisteActionType from './KandidatlisteActionType';
import { Kandidatlistefilter, Kandidatsortering } from './kandidatlisteReducer';

export interface HentKandidatlisteMedStillingsIdAction {
    type: KandidatlisteActionType.HentKandidatlisteMedStillingsId;
    stillingsId: string;
}

export interface HentKandidatlisteMedStillingsIdSuccessAction {
    type: KandidatlisteActionType.HentKandidatlisteMedStillingsIdSuccess;
    kandidatliste: Kandidatliste;
}

export interface HentKandidatlisteMedStillingsIdFailureAction {
    type: KandidatlisteActionType.HentKandidatlisteMedStillingsIdFailure;
    error: Error;
}

export interface HentKandidatlisteMedKandidatlisteIdAction {
    type: KandidatlisteActionType.HentKandidatlisteMedKandidatlisteId;
    kandidatlisteId: string;
}

export interface HentKandidatlisteMedKandidatlisteIdSuccessAction {
    type: KandidatlisteActionType.HentKandidatlisteMedKandidatlisteIdSuccess;
    kandidatliste: Kandidatliste;
}

export interface HentKandidatlisteMedKandidatlisteIdFailureAction {
    type: KandidatlisteActionType.HentKandidatlisteMedKandidatlisteIdFailure;
    error: Error;
}

export interface NullstillKandidatlisteAction {
    type: KandidatlisteActionType.NullstillKandidatliste;
}

export interface PresenterKandidaterSuccessAction {
    type: KandidatlisteActionType.PresenterKandidaterSuccess;
    kandidatliste: Kandidatliste;
}

export interface OppdaterKandidatlisteMedKandidatAction {
    type: KandidatlisteActionType.OppdaterKandidatlisteMedKandidat;
    kandidatliste: Kandidatliste;
    kandidatnr: string;
}

export interface EndreStatusKandidatAction {
    type: KandidatlisteActionType.EndreStatusKandidat;
    status: Kandidatstatus;
    kandidatlisteId: string;
    kandidatnr: string;
}

export interface EndreStatusKandidatSuccessAction {
    type: KandidatlisteActionType.EndreStatusKandidatSuccess;
    kandidatliste: Kandidatliste;
}

export interface EndreStatusKandidatFailureAction {
    type: KandidatlisteActionType.EndreStatusKandidatFailure;
}

export interface EndreUtfallKandidatAction {
    type: KandidatlisteActionType.EndreUtfallKandidat;
    utfall: Kandidatutfall;
    navKontor: string;
    kandidatlisteId: string;
    kandidatnr: string;
}

export interface EndreUtfallKandidatSuccessAction {
    type: KandidatlisteActionType.EndreUtfallKandidatSuccess;
    kandidatliste: Kandidatliste;
}

export interface EndreUtfallKandidatFailureAction {
    type: KandidatlisteActionType.EndreUtfallKandidatFailure;
}

export interface EndreKandidatlistestatusAction {
    type: KandidatlisteActionType.EndreKandidatlistestatus;
    kandidatlisteId: string;
    status: Kandidatlistestatus;
}

export interface EndreKandidatlistestatusSuccessAction {
    type: KandidatlisteActionType.EndreKandidatlistestatusSuccess;
    kandidatliste: Kandidatliste;
}

export interface EndreKandidatlistestatusFailureAction {
    type: KandidatlisteActionType.EndreKandidatlistestatusFailure;
    error: SearchApiError;
}

export interface EndreFormidlingsutfallForUsynligKandidatAction {
    type: KandidatlisteActionType.EndreFormidlingsutfallForUsynligKandidat;
    formidlingId: string;
    utfall: Kandidatutfall;
    navKontor: string;
    kandidatlisteId: string;
}

export interface EndreFormidlingsutfallForUsynligKandidatSuccessAction {
    type: KandidatlisteActionType.EndreFormidlingsutfallForUsynligKandidatSuccess;
    formidlingId: string;
    kandidatliste: Kandidatliste;
}

export interface EndreFormidlingsutfallForUsynligKandidatFailureAction {
    type: KandidatlisteActionType.EndreFormidlingsutfallForUsynligKandidatFailure;
    formidlingId: string;
    error: SearchApiError;
}

export interface SetFodselsnummerAction {
    type: KandidatlisteActionType.SetFodselsnummer;
    fodselsnummer: string;
}

export interface FormidleUsynligKandidatSuccessAction {
    type: KandidatlisteActionType.FormidleUsynligKandidatSuccess;
    kandidatliste: Kandidatliste;
    formidlingAvUsynligKandidat: FormidlingAvUsynligKandidatOutboundDto;
}

export interface ToggleArkivertAction {
    type: KandidatlisteActionType.ToggleArkivert;
    kandidatlisteId: string;
    kandidatnr: string;
    arkivert: boolean;
    navKontor: string;
}

export interface ToggleArkivertSuccessAction {
    type: KandidatlisteActionType.ToggleArkivertSuccess;
    kandidat: KandidatIKandidatliste;
}

export interface ToggleArkivertFailureAction {
    type: KandidatlisteActionType.ToggleArkivertFailure;
}

export interface AngreArkiveringAction {
    type: KandidatlisteActionType.AngreArkivering;
    kandidatlisteId: string;
    kandidatnumre: string[];
    navKontor: string;
}

export interface AngreArkiveringSuccessAction {
    type: KandidatlisteActionType.AngreArkiveringSuccess;
    kandidatnumre: string[];
}

export interface AngreArkiveringFailureAction {
    type: KandidatlisteActionType.AngreArkiveringFailure;
}

export interface VelgKandidatAction {
    type: KandidatlisteActionType.VelgKandidat;
    kandidatlisteId?: string;
    kandidatnr?: string;
}

export interface NullstillForespørslerOmDelingAvCv {
    type: KandidatlisteActionType.NullstillForespørslerOmDelingAvCv;
}

export interface HentForespørslerOmDelingAvCvAction {
    type: KandidatlisteActionType.HentForespørslerOmDelingAvCv;
    stillingsId: string;
}

export interface HentForespørslerOmDelingAvCvSuccessAction {
    type: KandidatlisteActionType.HentForespørslerOmDelingAvCvSuccess;
    forespørslerOmDelingAvCv: ForespørslerForStillingInboundDto;
}

export interface HentForespørslerOmDelingAvCvFailureAction {
    type: KandidatlisteActionType.HentForespørslerOmDelingAvCvFailure;
    error: SearchApiError;
}

export interface SendForespørselOmDelingAvCv {
    type: KandidatlisteActionType.SendForespørselOmDelingAvCv;
    forespørselOutboundDto: ForespørselOutboundDto;
}

export interface SendForespørselOmDelingAvCvSuccess {
    type: KandidatlisteActionType.SendForespørselOmDelingAvCvSuccess;
    forespørslerOmDelingAvCv: ForespørslerForStillingInboundDto;
}

export interface SendForespørselOmDelingAvCvFailure {
    type: KandidatlisteActionType.SendForespørselOmDelingAvCvFailure;
    error: SearchApiError;
}

export interface ResetSendForespørselOmDelingAvCv {
    type: KandidatlisteActionType.ResetSendForespørselOmDelingAvCv;
}

export interface ResendForespørselOmDelingAvCvSuccess {
    type: KandidatlisteActionType.ResendForespørselOmDelingAvCvSuccess;
    forespørslerOmDelingAvCv: ForespørslerForStillingInboundDto;
}

export interface EndreKandidatlistefilterAction {
    type: KandidatlisteActionType.EndreKandidatlisteFilter;
    filter: Kandidatlistefilter;
}

export interface ToggleMarkeringAvKandidat {
    type: KandidatlisteActionType.ToggleMarkeringAvKandidat;
    kandidatnr: string;
}

export interface EndreMarkeringAvKandidaterAction {
    type: KandidatlisteActionType.EndreMarkeringAvKandidater;
    kandidatnumre: string[];
}

export interface EndreVisningsstatusKandidatAction {
    type: KandidatlisteActionType.EndreVisningsstatusKandidat;
    kandidatnr: string;
    visningsstatus: Visningsstatus;
}

export interface EndreSortering {
    type: KandidatlisteActionType.EndreSortering;
    sortering: Kandidatsortering;
}

export interface SlettCvFraArbeidsgiversKandidatliste {
    type: KandidatlisteActionType.SlettCvFraArbeidsgiversKandidatliste;
    kandidatlisteId: string;
    kandidatnr: string;
    navKontor: string | null;
}

export interface SlettCvFraArbeidsgiversKandidatlisteSuccess {
    type: KandidatlisteActionType.SlettCvFraArbeidsgiversKandidatlisteSuccess;
    kandidatliste: Kandidatliste;
}

export interface SlettCvFraArbeidsgiversKandidatlisteFailure {
    type: KandidatlisteActionType.SlettCvFraArbeidsgiversKandidatlisteFailure;
    error: SearchApiError;
}

type KandidatlisteAction =
    | HentKandidatlisteMedStillingsIdAction
    | HentKandidatlisteMedStillingsIdSuccessAction
    | HentKandidatlisteMedStillingsIdFailureAction
    | HentKandidatlisteMedKandidatlisteIdAction
    | HentKandidatlisteMedKandidatlisteIdSuccessAction
    | HentKandidatlisteMedKandidatlisteIdFailureAction
    | NullstillKandidatlisteAction
    | PresenterKandidaterSuccessAction
    | OppdaterKandidatlisteMedKandidatAction
    | EndreStatusKandidatAction
    | EndreStatusKandidatSuccessAction
    | EndreStatusKandidatFailureAction
    | EndreUtfallKandidatAction
    | EndreUtfallKandidatSuccessAction
    | EndreUtfallKandidatFailureAction
    | SetFodselsnummerAction
    | ToggleArkivertAction
    | ToggleArkivertSuccessAction
    | ToggleArkivertFailureAction
    | AngreArkiveringAction
    | AngreArkiveringSuccessAction
    | AngreArkiveringFailureAction
    | VelgKandidatAction
    | EndreKandidatlistefilterAction
    | ToggleMarkeringAvKandidat
    | EndreMarkeringAvKandidaterAction
    | EndreVisningsstatusKandidatAction
    | EndreFormidlingsutfallForUsynligKandidatAction
    | EndreFormidlingsutfallForUsynligKandidatSuccessAction
    | EndreFormidlingsutfallForUsynligKandidatFailureAction
    | FormidleUsynligKandidatSuccessAction
    | EndreKandidatlistestatusAction
    | EndreKandidatlistestatusSuccessAction
    | EndreKandidatlistestatusFailureAction
    | NullstillForespørslerOmDelingAvCv
    | HentForespørslerOmDelingAvCvAction
    | HentForespørslerOmDelingAvCvSuccessAction
    | HentForespørslerOmDelingAvCvFailureAction
    | SendForespørselOmDelingAvCv
    | SendForespørselOmDelingAvCvSuccess
    | SendForespørselOmDelingAvCvFailure
    | ResetSendForespørselOmDelingAvCv
    | ResendForespørselOmDelingAvCvSuccess
    | EndreSortering
    | SlettCvFraArbeidsgiversKandidatliste
    | SlettCvFraArbeidsgiversKandidatlisteSuccess
    | SlettCvFraArbeidsgiversKandidatlisteFailure;

export default KandidatlisteAction;
