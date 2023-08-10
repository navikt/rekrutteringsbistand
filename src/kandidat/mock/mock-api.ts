import fetchMock, { MockResponse, MockResponseFunction } from 'fetch-mock';

import { FormidlingAvUsynligKandidatOutboundDto } from '../kandidatliste/modaler/legg-til-kandidat-modal/LeggTilKandidatModal';

import { api } from 'felles/api';
import { Kandidatutfall } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import { ENHETSREGISTER_API } from '../api/api';
import { meg } from './data/kandidat/veileder.mock';
import { mock } from './mock-data';

fetchMock.config.fallbackToNetwork = true;

const baseUrl = `express:${api.kandidat}`;
const synlighetBaseUrl = `express:${api.synlighet}`;

const url = {
    fnrsok: `${baseUrl}/veileder/kandidatsok/fnrsok`,
    synlighetsevaluering: `${synlighetBaseUrl}/evaluering/:fnr`,

    // Cv
    cv: `${baseUrl}/veileder/kandidatsok/hentcv`,
    listeoversikt: `${baseUrl}/veileder/kandidater/:kandidatnr/listeoversikt`,

    // Kandidatliste
    markerKandidatlisteSomMin: `${baseUrl}/veileder/kandidatlister/:kandidatlisteId/eierskap`,
    kandidatlisteMedStilling: `${baseUrl}/veileder/stilling/:stillingsId/kandidatliste`,
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

    // Alternative backends
    enhetsregister: `${ENHETSREGISTER_API}/underenhet/_search`,
};

const getUsynligKandidat = () => [mock.synlighet.usynligKandidat];

const markerKandidatlisteSomMin = (url: string) => {
    const kandidatlisteId = url.split('/')[4];

    return mock.kandidat.kandidatlister.find((liste) => liste.kandidatlisteId === kandidatlisteId);
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
    .get(url.listeoversikt, log(mock.kandidat.kandidatlisterForKandidat))

    // Kandidatliste
    .put(url.markerKandidatlisteSomMin, log(markerKandidatlisteSomMin), litenDelay)

    .get(url.notater, log(mock.kandidat.notater))
    .post(url.notater, log(mock.kandidat.notater))
    .mock(url.notaterMedId, log(mock.kandidat.notater))
    .put(url.utfallPut, log(putUtfall))
    .put(url.statusPut, log(putStatus))
    .put(url.arkivertPut, log(putArkivert))

    // Legg til kandidat fra kandidatliste-modal
    .get(url.synlighetsevaluering, log(getSynlighetsevaluering))

    .post(url.delKandidater, log(postDelKandidater))
    .post(url.søkUsynligKandidat, log(getUsynligKandidat))
    .post(url.postFormidlingerAvUsynligKandidat, log(postFormidlingerAvUsynligKandidat))
    .put(url.putFormidlingerAvUsynligKandidat, log(putUtfallForFormidlingAvUsynligKandidat))
    .put(url.putKandidatlistestatus, log(putKandidatlistestatus))
    .put(url.putSlettCvFraArbeidsgiversKandidatliste, log(putSlettCvFraArbeidsgiversKandidatliste))

    // Misc
    .post(url.enhetsregister, log(mock.kandidat.enhetsregister));
