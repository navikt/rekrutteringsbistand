import fetchMock, { MockResponse, MockResponseFunction } from 'fetch-mock';

import { FormidlingAvUsynligKandidatOutboundDto } from '../felles/legg-til-kandidat-modal/LeggTilKandidatModal';

import { mock } from './mock-data';
import { meg } from './data/kandidat/veileder.mock';
import { api } from 'felles/api';
import { ENHETSREGISTER_API } from '../api/api';
import { Kandidatutfall } from 'felles/domene/kandidatliste/KandidatIKandidatliste';

fetchMock.config.fallbackToNetwork = true;

const baseUrl = `express:${api.kandidat}`;
const smsBaseUrl = `express:${api.sms}`;
const forespørselOmDelingAvCvBaseUrl = `express:${api.forespørselOmDelingAvCv}`;
const synlighetBaseUrl = `express:${api.synlighet}`;

const url = {
    fnrsok: `${baseUrl}/veileder/kandidatsok/fnrsok`,
    synlighetsevaluering: `${synlighetBaseUrl}/evaluering/:fnr`,

    // Cv
    cv: `${baseUrl}/veileder/kandidatsok/hentcv`,
    listeoversikt: `${baseUrl}/veileder/kandidater/:kandidatnr/listeoversikt`,

    // Kandidatliste
    kandidatlister: `${baseUrl}/veileder/kandidatlister`,
    kandidatliste: `${baseUrl}/veileder/kandidatlister/:kandidatlisteId`,
    markerKandidatlisteSomMin: `${baseUrl}/veileder/kandidatlister/:kandidatlisteId/eierskap`,
    kandidatlisteMedStilling: `${baseUrl}/veileder/stilling/:stillingsId/kandidatliste`,
    kandidatlistePost: `${baseUrl}/veileder/me/kandidatlister`,
    notater: `${baseUrl}/veileder/kandidatlister/:kandidatlisteId/kandidater/:kandidatnr/notater`,
    notaterMedId: `${baseUrl}/veileder/kandidatlister/:kandidatlisteId/kandidater/:kandidatnr/notater/:notatId`,
    statusPut: `${baseUrl}/veileder/kandidatlister/:kandidatlisteId/kandidater/:kandidatnr/status`,
    utfallPut: `${baseUrl}/veileder/kandidatlister/:kandidatlisteId/kandidater/:kandidatnr/utfall`,
    arkivertPut: `${baseUrl}/veileder/kandidatlister/:kandidatlisteId/kandidater/:kandidatnr/arkivert`,
    delKandidater: `${baseUrl}/veileder/kandidatlister/:kandidatlisteId/deltekandidater`,
    postKandidater: `${baseUrl}/veileder/kandidatlister/:kandidatlisteId/kandidater`,
    søkUsynligKandidat: `${baseUrl}/veileder/kandidater/navn`,
    postFormidlingerAvUsynligKandidat: `${baseUrl}/veileder/kandidatlister/:kandidatlisteId/formidlingeravusynligkandidat`,
    putFormidlingerAvUsynligKandidat: `${baseUrl}/veileder/kandidatlister/:kandidatlisteId/formidlingeravusynligkandidat/:formidlingId/utfall`,
    putKandidatlistestatus: `${baseUrl}/veileder/kandidatlister/:kandidatlisteId/status`,
    putSlettCvFraArbeidsgiversKandidatliste: `${baseUrl}/veileder/kandidat/arbeidsgiverliste/:kandidatlisteId/:kandidatnummer`,

    forespørselOmDelingAvCv: `${forespørselOmDelingAvCvBaseUrl}/foresporsler/:stillingsId`,
    forespørselOmDelingAvCvForKandidat: `${forespørselOmDelingAvCvBaseUrl}/foresporsler/kandidat/:aktorId`,
    postForespørselOmDelingAvCv: `${forespørselOmDelingAvCvBaseUrl}/foresporsler`,
    postResendForespørselOmDelingAvCv: `${forespørselOmDelingAvCvBaseUrl}/foresporsler/kandidat/:aktorId`,

    // Alternative backends
    sms: `${smsBaseUrl}/:kandidatlisteId`,
    smsFnr: `${smsBaseUrl}/fnr/:fnr`,
    smsPost: `${smsBaseUrl}`,
    enhetsregister: `${ENHETSREGISTER_API}/underenhet/_search`,

    // Misc
    toggles: `${baseUrl}/veileder/kandidatsok/toggles`,
};

const getCv = (url: string) => {
    const queryParams = url.split('?').pop();
    const kandidatnr = new URLSearchParams(queryParams).get('kandidatnr');

    if (!kandidatnr) {
        return 404;
    } else {
        return mock.kandidat.cver.find((cv) => cv.kandidatnummer === kandidatnr);
    }
};

const getUsynligKandidat = () => [mock.synlighet.usynligKandidat];

const getKandidatlister = (url: string) => {
    const queryParams = url.split('?').pop();
    const params = new URLSearchParams(queryParams);
    const stillingsfilter = params.get('type');
    const eierfilter = params.get('kunEgne') && Boolean(params.get('kunEgne'));

    let filtrerteKandidatlister = mock.kandidat.kandidatlistesammendrag;

    if (stillingsfilter) {
        filtrerteKandidatlister = mock.kandidat.kandidatlistesammendrag.filter((k) =>
            stillingsfilter === 'MED_STILLING' ? !!k.stillingId : !k.stillingId
        );
    }

    filtrerteKandidatlister = filtrerteKandidatlister.filter((k) =>
        eierfilter ? k.opprettetAv.ident === meg.ident : true
    );

    return {
        antall: filtrerteKandidatlister.length,
        liste: filtrerteKandidatlister,
    };
};

const getKandidatliste = (url: string) => {
    const kandidatlisteId = url.split('/').pop();

    return mock.kandidat.kandidatlister.find((liste) => liste.kandidatlisteId === kandidatlisteId);
};

const markerKandidatlisteSomMin = (url: string) => {
    const kandidatlisteId = url.split('/')[4];

    return mock.kandidat.kandidatlister.find((liste) => liste.kandidatlisteId === kandidatlisteId);
};

const getKandidatlisteMedStilling = (url: string) => {
    const stillingsId = url.split('/')[4];

    return mock.kandidat.kandidatlister.find((liste) => liste.stillingId === stillingsId);
};

const postKandidater = (url: string, options: fetchMock.MockOptionsMethodPut) => {
    const kandidatlisteId = url.split('/')[url.split('/').length - 2];
    const kandidatliste = mock.kandidat.kandidatlister.find(
        (liste) => liste.kandidatlisteId === kandidatlisteId
    );

    if (!kandidatliste) {
        return {
            status: 404,
        };
    }

    const kandidatnumre = JSON.parse(String(options.body));
    const cvIndekser: number[] = kandidatnumre.map((kandidat: any) =>
        mock.kandidat.cver.findIndex((cv) => cv.kandidatnummer === kandidat.kandidatnr)
    );

    const nyeKandidater = cvIndekser.map((cvIndeks) => mock.kandidat.kandidat(cvIndeks));

    return {
        ...kandidatliste,
        kandidater: [...kandidatliste.kandidater, ...nyeKandidater],
    };
};

const postFormidlingerAvUsynligKandidat = (
    url: string,
    options: fetchMock.MockOptionsMethodPost
) => {
    const kandidatlisteId = url.split('/')[url.split('/').length - 2];
    const kandidatliste = mock.kandidat.kandidatlister.find(
        (liste) => liste.kandidatlisteId === kandidatlisteId
    );
    const body: FormidlingAvUsynligKandidatOutboundDto = JSON.parse(String(options.body));

    if (!kandidatliste) {
        return null;
    }

    return {
        ...kandidatliste,
        formidlingerAvUsynligKandidat: [
            ...kandidatliste.formidlingerAvUsynligKandidat,
            {
                ...mock.synlighet.usynligKandidat,
                utfall: body.fåttJobb ? Kandidatutfall.FåttJobben : Kandidatutfall.Presentert,
            },
        ],
    };
};

const putStatus = (url: string, options: fetchMock.MockOptionsMethodPut) => {
    const kandidatnr = url.split('/').reverse()[1];
    const status = JSON.parse(String(options.body)).status;

    return {
        ...mock.kandidat.kandidatliste,
        kandidater: mock.kandidat.kandidatliste.kandidater.map((kandidat) =>
            kandidat.kandidatnr !== kandidatnr
                ? kandidat
                : {
                      ...kandidat,
                      status,
                  }
        ),
    };
};

const putUtfall = (url: string, options: fetchMock.MockOptionsMethodPut) => {
    const kandidatnr = url.split('/').reverse()[1];
    const utfall = JSON.parse(String(options.body)).utfall;

    return {
        ...mock.kandidat.kandidatliste,
        kandidater: mock.kandidat.kandidatliste.kandidater.map((kandidat) =>
            kandidat.kandidatnr !== kandidatnr
                ? kandidat
                : {
                      ...kandidat,
                      utfall,
                  }
        ),
    };
};

const putUtfallForFormidlingAvUsynligKandidat = (
    url: string,
    options: fetchMock.MockOptionsMethodPut
) => {
    const formidlingId = url.split('/').reverse()[1];
    const utfall = JSON.parse(String(options.body)).utfall;

    return {
        ...mock.kandidat.kandidatliste,
        formidlingerAvUsynligKandidat:
            mock.kandidat.kandidatliste.formidlingerAvUsynligKandidat.map((formidling) =>
                formidling.id !== formidlingId
                    ? formidling
                    : {
                          ...formidling,
                          utfall,
                      }
            ),
    };
};

const putArkivert = (url: string, options: fetchMock.MockOptionsMethodPut) => {
    const kandidatnr = url.split('/').reverse()[1];
    const arkivert = JSON.parse(String(options.body));
    const kandidat = mock.kandidat.kandidatliste.kandidater.find(
        (kandidat) => kandidat.kandidatnr === kandidatnr
    );

    return {
        ...kandidat,
        arkivert,
    };
};

const putKandidatlistestatus = (url: string, options: fetchMock.MockOptionsMethodPut) => {
    const kandidatlisteId = url.split('/').reverse()[1];
    const status = JSON.parse(String(options.body)).status;
    const kandidatliste = mock.kandidat.kandidatlister.find(
        (liste) => liste.kandidatlisteId === kandidatlisteId
    );

    return {
        body: {
            ...kandidatliste,
            status,
        },
        status: 200,
    };
};

const postDelKandidater = (url: string, options: fetchMock.MockOptionsMethodPost) => {
    const kandidatlisteId = url.split('/').reverse()[1];
    const kandidatliste = mock.kandidat.kandidatlister.find(
        (liste) => liste.kandidatlisteId === kandidatlisteId
    );
    const delteKandidater = JSON.parse(String(options.body)).kandidater;

    return {
        body: {
            ...kandidatliste,
            kandidater: kandidatliste?.kandidater.map((kandidat) => {
                return delteKandidater.includes(kandidat.kandidatnr)
                    ? {
                          ...kandidat,
                          utfall: Kandidatutfall.Presentert,
                      }
                    : kandidat;
            }),
        },
        status: 201,
    };
};

const postFnrsok = (url: string, options: fetchMock.MockOptionsMethodPost): MockResponse => {
    const fnr = JSON.parse(String(options.body)).fnr;
    const cv = mock.kandidat.cver.find((k) => k.fodselsnummer === fnr);

    if (cv) {
        return {
            arenaKandidatnr: cv.kandidatnummer,
            fornavn: cv.fornavn,
            etternavn: cv.etternavn,
        };
    } else {
        return {
            status: 404,
        };
    }
};

const getSynlighetsevaluering = (): MockResponse => {
    return {
        status: 200,
        body: {
            harAktivCv: false,
            harJobbprofil: true,
            harSettHjemmel: true,
            maaIkkeBehandleTidligereCv: true,
            erIkkeFritattKandidatsøk: true,
            erUnderOppfoelging: true,
            harRiktigFormidlingsgruppe: true,
            erIkkeSperretAnsatt: true,
            erIkkeDoed: true,
            erFerdigBeregnet: true,
        },
    };
};

const putSlettCvFraArbeidsgiversKandidatliste = (
    url: string,
    options: fetchMock.MockOptionsMethodPost
): MockResponse => {
    const splittetUrl = url.split('/');

    const kandidatnummer = splittetUrl.pop();
    const kandidatlisteId = splittetUrl.pop();

    const kandidatliste = mock.kandidat.kandidatlister.find(
        (liste) => liste.kandidatlisteId === kandidatlisteId
    )!!;

    return {
        ...kandidatliste,
        kandidater: kandidatliste.kandidater.map((kandidat) =>
            kandidat.kandidatnr !== kandidatnummer
                ? kandidat
                : {
                      ...kandidat,
                      utfall: Kandidatutfall.IkkePresentert,
                      utfallsendringer: [
                          ...kandidat.utfallsendringer,
                          {
                              utfall: Kandidatutfall.IkkePresentert,
                              tidspunkt: new Date().toISOString(),
                              registrertAvIdent: meg.ident,
                              sendtTilArbeidsgiversKandidatliste: false,
                          },
                      ],
                  }
        ),
    };
};

const log = (response: MockResponse | MockResponseFunction) => {
    return (url: string, options) => {
        console.log(
            '%cMOCK %s %s',
            'color: lightgray;',
            options.method || 'GET',
            url.includes('rekrutteringsbistand-kandidat-api') ? url.substring(46) : url,
            typeof response === 'function' ? response(url, options) : response
        );
        return response;
    };
};

const litenDelay = { delay: 500 };

fetchMock
    // CV
    .get(url.cv, log(getCv))
    .get(url.listeoversikt, log(mock.kandidat.kandidatlisterForKandidat))

    // Kandidatliste
    .get(url.kandidatlister, log(getKandidatlister))
    .get(url.kandidatliste, log(getKandidatliste), litenDelay)
    .put(url.kandidatliste, log(getKandidatliste), litenDelay)
    .delete(url.kandidatliste, log(204), litenDelay)
    .put(url.markerKandidatlisteSomMin, log(markerKandidatlisteSomMin), litenDelay)

    .get(url.kandidatlisteMedStilling, log(getKandidatlisteMedStilling))
    .post(url.kandidatlistePost, log(201))

    .get(url.notater, log(mock.kandidat.notater))
    .post(url.notater, log(mock.kandidat.notater))
    .mock(url.notaterMedId, log(mock.kandidat.notater))
    .get(url.sms, log(mock.sms.sms))
    .get(url.smsFnr, log(mock.sms.sms))
    .post(url.smsPost, log(201))
    .put(url.utfallPut, log(putUtfall))
    .put(url.statusPut, log(putStatus))
    .put(url.arkivertPut, log(putArkivert))

    // Legg til kandidat fra kandidatliste-modal
    .post(url.fnrsok, log(postFnrsok))
    .get(url.synlighetsevaluering, log(getSynlighetsevaluering))

    .post(url.postKandidater, log(postKandidater), { delay: 1000 })
    .post(url.delKandidater, log(postDelKandidater))
    .post(url.søkUsynligKandidat, log(getUsynligKandidat))
    .post(url.postFormidlingerAvUsynligKandidat, log(postFormidlingerAvUsynligKandidat))
    .put(url.putFormidlingerAvUsynligKandidat, log(putUtfallForFormidlingAvUsynligKandidat))
    .put(url.putKandidatlistestatus, log(putKandidatlistestatus))
    .get(url.forespørselOmDelingAvCv, log(mock.forespørselOmDelingAvCv.forespørslerOmDelingAvCv))
    .get(
        url.forespørselOmDelingAvCvForKandidat,
        log(mock.forespørselOmDelingAvCv.forespørslerOmDelingAvCvForKandidat)
    )
    .post(
        url.postForespørselOmDelingAvCv,
        log({ body: mock.forespørselOmDelingAvCv.forespørslerOmDelingAvCv, status: 201 })
    )
    .post(
        url.postResendForespørselOmDelingAvCv,
        log({ body: mock.forespørselOmDelingAvCv.forespørslerOmDelingAvCv, status: 201 })
    )
    .put(url.putSlettCvFraArbeidsgiversKandidatliste, log(putSlettCvFraArbeidsgiversKandidatliste))

    // Misc
    .post(url.enhetsregister, log(mock.kandidat.enhetsregister));
