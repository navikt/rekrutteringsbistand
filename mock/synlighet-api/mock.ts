import Synlighetsevaluering from 'felles/domene/synlighet/Synlighetsevaluering';
import { HttpResponse, http } from 'msw';
import { api } from '../../src/felles/api';

export const synlighetApiMock = [
    http.get(`${api.synlighet}/evaluering/:fnr`, () => HttpResponse.json(mockSynlighetsevaluering)),
];

const mockSynlighetsevaluering: Synlighetsevaluering = {
    harAktivCv: true,
    erIkkeDoed: true,
    erIkkeFritattKandidatsøk: true,
    erIkkeSperretAnsatt: true,
    erUnderOppfoelging: false,
    harJobbprofil: false,
    erArbeidssøker: true,
    harSettHjemmel: false,
    maaIkkeBehandleTidligereCv: true,
};
