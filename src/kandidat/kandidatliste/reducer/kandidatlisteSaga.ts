import { sendEvent } from 'felles/amplitude';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchKandidatlisteMedKandidatlisteId,
    fetchKandidatlisteMedStillingsId,
    putArkivert,
    putArkivertForFlereKandidater,
    putFormidlingsutfallForUsynligKandidat,
    putKandidatliste,
    putKandidatlistestatus,
    putStatusKandidat,
    putUtfallKandidat,
    slettCvFraArbeidsgiversKandidatliste,
} from '../../api/api';
import { SearchApiError } from '../../api/fetchUtils';
import {
    ForespørslerForStillingInboundDto,
    fetchForespørslerOmDelingAvCv,
    sendForespørselOmDelingAvCv,
} from '../../api/forespørselOmDelingAvCvApi';
import { ErrorActionType } from '../../state/errorReducer';
import KandidatlisteAction, {
    AngreArkiveringAction,
    AngreArkiveringSuccessAction,
    EndreFormidlingsutfallForUsynligKandidatAction,
    EndreFormidlingsutfallForUsynligKandidatSuccessAction,
    EndreKandidatlistestatusAction,
    EndreKandidatlistestatusSuccessAction,
    EndreStatusKandidatAction,
    EndreUtfallKandidatAction,
    EndreUtfallKandidatSuccessAction,
    HentForespørslerOmDelingAvCvAction,
    HentKandidatlisteMedKandidatlisteIdAction,
    HentKandidatlisteMedStillingsIdAction,
    HentSendteMeldingerAction,
    SendForespørselOmDelingAvCv,
    SendSmsAction,
    SlettCvFraArbeidsgiversKandidatliste,
    ToggleArkivertAction,
    ToggleArkivertSuccessAction,
} from './KandidatlisteAction';
import KandidatlisteActionType from './KandidatlisteActionType';
import { fetchSendteMeldinger, postSmsTilKandidater } from '../../../api/sms-api/sms';

const loggManglendeAktørId = (kandidatliste: Kandidatliste) => {
    const aktøridRegex = /[0-9]{13}/;
    const noenKandidaterManglerAktørId = kandidatliste.kandidater.some(
        (kandidat) => !kandidat.aktørid || !kandidat.aktørid.match(aktøridRegex)
    );

    if (noenKandidaterManglerAktørId) {
        sendEvent('kandidatliste', 'kandidat_mangler_aktørid', {
            kandidatlisteId: kandidatliste.kandidatlisteId,
        });
    }
};

function* opprettKandidatlisteForStilling(
    stillingsId: string,
    opprinneligError: unknown
): Generator<unknown, any, any> {
    try {
        yield putKandidatliste(stillingsId);
        const kandidatliste = yield fetchKandidatlisteMedStillingsId(stillingsId);
        yield put({
            type: KandidatlisteActionType.HentKandidatlisteMedStillingsIdSuccess,
            kandidatliste,
        });
    } catch (e) {
        if (e instanceof SearchApiError) {
            yield put({
                type: KandidatlisteActionType.HentKandidatlisteMedStillingsIdFailure,
                error: opprinneligError,
            });
        } else {
            throw e;
        }
    }
}

function* hentKandidatlisteMedStillingsId(
    action: HentKandidatlisteMedStillingsIdAction
): Generator<unknown, any, any> {
    const { stillingsId } = action;
    try {
        const kandidatliste = yield fetchKandidatlisteMedStillingsId(stillingsId);
        loggManglendeAktørId(kandidatliste);
        yield put({
            type: KandidatlisteActionType.HentKandidatlisteMedStillingsIdSuccess,
            kandidatliste,
        });
    } catch (e) {
        if (e instanceof SearchApiError) {
            if (e.status === 404) {
                yield opprettKandidatlisteForStilling(stillingsId, e);
            } else {
                yield put({
                    type: KandidatlisteActionType.HentKandidatlisteMedStillingsIdFailure,
                    error: e,
                });
            }
        } else {
            throw e;
        }
    }
}

function* hentKandidatlisteMedKandidatlisteId(
    action: HentKandidatlisteMedKandidatlisteIdAction
): Generator<unknown, any, any> {
    const { kandidatlisteId } = action;
    try {
        const kandidatliste = yield fetchKandidatlisteMedKandidatlisteId(kandidatlisteId);
        loggManglendeAktørId(kandidatliste);
        yield put({
            type: KandidatlisteActionType.HentKandidatlisteMedKandidatlisteIdSuccess,
            kandidatliste,
        });
    } catch (e) {
        if (e instanceof SearchApiError) {
            yield put({
                type: KandidatlisteActionType.HentKandidatlisteMedKandidatlisteIdFailure,
                error: e,
            });
        } else {
            throw e;
        }
    }
}

function* endreKandidatstatus(action: EndreStatusKandidatAction): Generator<unknown, any, any> {
    const { status, kandidatlisteId, kandidatnr } = action;
    try {
        const response = yield putStatusKandidat(status, kandidatlisteId, kandidatnr);
        yield put({
            type: KandidatlisteActionType.EndreStatusKandidatSuccess,
            kandidatliste: response,
        });
    } catch (e) {
        if (e instanceof SearchApiError) {
            yield put({ type: KandidatlisteActionType.EndreStatusKandidatFailure, error: e });
        } else {
            throw e;
        }
    }
}

function* endreKandidatUtfall(action: EndreUtfallKandidatAction) {
    try {
        const response: Kandidatliste = yield putUtfallKandidat(
            action.utfall,
            action.navKontor,
            action.kandidatlisteId,
            action.kandidatnr
        );
        yield put<EndreUtfallKandidatSuccessAction>({
            type: KandidatlisteActionType.EndreUtfallKandidatSuccess,
            kandidatliste: response,
        });
    } catch (e) {
        if (e instanceof SearchApiError) {
            yield put({ type: KandidatlisteActionType.EndreUtfallKandidatFailure, error: e });
        } else {
            throw e;
        }
    }
}

function* endreUtfallForFormidlingAvUsynligKandidat(
    action: EndreFormidlingsutfallForUsynligKandidatAction
) {
    try {
        const response: Kandidatliste = yield putFormidlingsutfallForUsynligKandidat(
            action.kandidatlisteId,
            action.formidlingId,
            action.utfall,
            action.navKontor
        );

        yield put<EndreFormidlingsutfallForUsynligKandidatSuccessAction>({
            type: KandidatlisteActionType.EndreFormidlingsutfallForUsynligKandidatSuccess,
            formidlingId: action.formidlingId,
            kandidatliste: response,
        });
    } catch (e) {
        if (e instanceof SearchApiError) {
            yield put({
                type: KandidatlisteActionType.EndreFormidlingsutfallForUsynligKandidatFailure,
                formidlingId: action.formidlingId,
                error: e,
            });
        } else {
            throw e;
        }
    }
}

function* endreKandidatlistestatus(action: EndreKandidatlistestatusAction) {
    try {
        const kandidatliste: Kandidatliste = yield putKandidatlistestatus(
            action.kandidatlisteId,
            action.status
        );

        yield put<EndreKandidatlistestatusSuccessAction>({
            type: KandidatlisteActionType.EndreKandidatlistestatusSuccess,
            kandidatliste,
        });
    } catch (e) {
        if (e instanceof SearchApiError) {
            yield put({
                type: KandidatlisteActionType.EndreKandidatlistestatusFailure,
                error: e,
            });
        } else {
            throw e;
        }
    }
}

function* toggleArkivert(action: ToggleArkivertAction): Generator<unknown, any, any> {
    try {
        const arkivertKandidat = yield putArkivert(
            action.kandidatlisteId,
            action.kandidatnr,
            action.arkivert
        );

        yield put<ToggleArkivertSuccessAction>({
            type: KandidatlisteActionType.ToggleArkivertSuccess,
            kandidat: arkivertKandidat,
        });
    } catch (e) {
        if (e instanceof SearchApiError) {
            yield put({ type: KandidatlisteActionType.ToggleArkivertFailure, error: e });
        } else {
            throw e;
        }
    }
}

function* angreArkiveringForKandidater(action: AngreArkiveringAction) {
    try {
        const kandidatnumre: Array<string | null> = yield call(
            putArkivertForFlereKandidater,
            action.kandidatlisteId,
            action.kandidatnumre,
            false
        );

        const dearkiverteKandidater = kandidatnumre.filter(
            (kandidatNr) => kandidatNr !== null
        ) as string[];

        yield put<AngreArkiveringSuccessAction>({
            type: KandidatlisteActionType.AngreArkiveringSuccess,
            kandidatnumre: dearkiverteKandidater,
        });
    } catch (e) {
        yield put({ type: KandidatlisteActionType.AngreArkiveringFailure });
    }
}

function* sjekkError(action: any) {
    yield put({ type: ErrorActionType.VisError, error: action.error });
}

function* hentSendteMeldinger(action: HentSendteMeldingerAction): Generator<unknown, any, any> {
    try {
        const sendteMeldinger = yield call(fetchSendteMeldinger, action.kandidatlisteId);
        yield put({
            type: KandidatlisteActionType.HentSendteMeldingerSuccess,
            sendteMeldinger,
        });
    } catch (e) {
        if (e instanceof SearchApiError) {
            yield put({ type: KandidatlisteActionType.HentSendteMeldingerFailure, error: e });
        } else {
            yield put({
                type: KandidatlisteActionType.HentSendteMeldingerFailure,
                error: {
                    message: 'Det skjedde noe galt',
                    status: 0,
                },
            });
        }
    }
}

function* hentForespørslerOmDelingAvCv(
    action: HentForespørslerOmDelingAvCvAction
): Generator<unknown, any, any> {
    try {
        const forespørsler: ForespørslerForStillingInboundDto = yield call(
            fetchForespørslerOmDelingAvCv,
            action.stillingsId
        );

        yield put<KandidatlisteAction>({
            type: KandidatlisteActionType.HentForespørslerOmDelingAvCvSuccess,
            forespørslerOmDelingAvCv: forespørsler,
        });
    } catch (e: any) {
        yield put<KandidatlisteAction>({
            type: KandidatlisteActionType.HentForespørslerOmDelingAvCvFailure,
            error: e,
        });
    }
}

function* sendSmsTilKandidater(action: SendSmsAction): Generator<unknown, any, any> {
    try {
        yield call(postSmsTilKandidater, action.melding, action.fnr, action.kandidatlisteId);
        yield put({
            type: KandidatlisteActionType.SendSmsSuccess,
            kandidatlisteId: action.kandidatlisteId,
        });
    } catch (e) {
        if (e instanceof SearchApiError) {
            yield put({ type: KandidatlisteActionType.SendSmsFailure, error: e });
        } else {
            yield put({
                type: KandidatlisteActionType.HentSendteMeldingerFailure,
                error: {
                    message: 'Det skjedde noe galt',
                    status: 0,
                },
            });
        }
    }
}

function* slettCv(action: SlettCvFraArbeidsgiversKandidatliste): Generator<unknown, any, any> {
    try {
        const kandidatliste = yield call(
            slettCvFraArbeidsgiversKandidatliste,
            action.kandidatlisteId,
            action.kandidatnr,
            action.navKontor
        );
        yield put({
            type: KandidatlisteActionType.SlettCvFraArbeidsgiversKandidatlisteSuccess,
            kandidatliste,
        });
    } catch (e) {
        yield put({
            type: KandidatlisteActionType.SlettCvFraArbeidsgiversKandidatlisteFailure,
            error: e,
        });
    }
}

function* sendForespørselOmDeling(action: SendForespørselOmDelingAvCv) {
    try {
        const response: ForespørslerForStillingInboundDto = yield call(
            sendForespørselOmDelingAvCv,
            action.forespørselOutboundDto
        );

        yield put<KandidatlisteAction>({
            type: KandidatlisteActionType.SendForespørselOmDelingAvCvSuccess,
            forespørslerOmDelingAvCv: response,
        });
        sendEvent('forespørsel_deling_av_cv', 'sending', {
            stillingsId: action.forespørselOutboundDto.stillingsId,
            antallKandidater: action.forespørselOutboundDto.aktorIder.length,
        });
    } catch (e) {
        yield put({ type: KandidatlisteActionType.SendForespørselOmDelingAvCvFailure, error: e });
    }
}

function* kandidatlisteSaga() {
    yield takeLatest(
        KandidatlisteActionType.HentKandidatlisteMedStillingsId,
        hentKandidatlisteMedStillingsId
    );
    yield takeLatest(
        KandidatlisteActionType.HentKandidatlisteMedKandidatlisteId,
        hentKandidatlisteMedKandidatlisteId
    );
    yield takeLatest(KandidatlisteActionType.EndreStatusKandidat, endreKandidatstatus);
    yield takeLatest(KandidatlisteActionType.EndreUtfallKandidat, endreKandidatUtfall);
    yield takeLatest(KandidatlisteActionType.ToggleArkivert, toggleArkivert);
    yield takeLatest(KandidatlisteActionType.AngreArkivering, angreArkiveringForKandidater);
    yield takeLatest(
        [
            KandidatlisteActionType.HentKandidatlisteMedStillingsIdFailure,
            KandidatlisteActionType.HentKandidatlisteMedKandidatlisteIdFailure,
            KandidatlisteActionType.EndreStatusKandidatFailure,
            KandidatlisteActionType.ToggleArkivertFailure,
            KandidatlisteActionType.LagreKandidatIKandidatlisteFailure,
        ],
        sjekkError
    );
    yield takeLatest(KandidatlisteActionType.SendSms, sendSmsTilKandidater);
    yield takeLatest(
        [KandidatlisteActionType.HentSendteMeldinger, KandidatlisteActionType.SendSmsSuccess],
        hentSendteMeldinger
    );
    yield takeLatest(KandidatlisteActionType.SendForespørselOmDelingAvCv, sendForespørselOmDeling);
    yield takeLatest(
        [KandidatlisteActionType.HentForespørslerOmDelingAvCv],
        hentForespørslerOmDelingAvCv
    );
    yield takeLatest(
        KandidatlisteActionType.EndreFormidlingsutfallForUsynligKandidat,
        endreUtfallForFormidlingAvUsynligKandidat
    );
    yield takeLatest(KandidatlisteActionType.EndreKandidatlistestatus, endreKandidatlistestatus);
    yield takeLatest(KandidatlisteActionType.SlettCvFraArbeidsgiversKandidatliste, slettCv);
}

export default kandidatlisteSaga;
