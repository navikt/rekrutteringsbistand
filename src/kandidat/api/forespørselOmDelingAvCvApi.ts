import {
    ForespørselOmDelingAvCv,
    ForespørselOutboundDto,
    ResendForespørselOutboundDto,
} from '../kandidatliste/knappe-rad/forespørsel-om-deling-av-cv/Forespørsel';
import { fetchJson, postJson } from './fetchUtils';
import { AktørId } from '../kandidatliste/domene/Kandidat';
import { api } from '../../felles/api';

export type ForespørslerForStillingInboundDto = Partial<Record<AktørId, ForespørselOmDelingAvCv[]>>;

export const sendForespørselOmDelingAvCv = (
    outboundDto: ForespørselOutboundDto
): Promise<ForespørslerForStillingInboundDto> => {
    return postJson(`${api.forespørselOmDelingAvCv}/foresporsler`, JSON.stringify(outboundDto));
};

export const resendForespørselOmDelingAvCv = (
    aktørId: string,
    outboundDto: ResendForespørselOutboundDto
): Promise<ForespørslerForStillingInboundDto> => {
    return postJson(
        `${api.forespørselOmDelingAvCv}/foresporsler/kandidat/${aktørId}`,
        JSON.stringify(outboundDto)
    );
};

export const fetchForespørslerOmDelingAvCv = (
    stillingsId: string
): Promise<ForespørslerForStillingInboundDto> => {
    return fetchJson(`${api.forespørselOmDelingAvCv}/foresporsler/${stillingsId}`, true);
};

export const fetchForespørslerOmDelingAvCvForKandidat = (
    aktørId: string
): Promise<ForespørselOmDelingAvCv[]> => {
    return fetchJson(`${api.forespørselOmDelingAvCv}/foresporsler/kandidat/${aktørId}`, true);
};
