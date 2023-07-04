import fetchMock, { MockRequest, MockResponse, MockResponseFunction } from 'fetch-mock';

import { KANDIDAT_API } from '../stilling/legg-til-kandidat-modal/kandidatApi';
import { kandidatProxyUrl } from '../stilling/kontekst-av-kandidat/useKandidat';
import { Rekrutteringsbistandstilling } from '../domene/Stilling';
import { stillingApi, stillingssøkProxy } from '../api/api';
import fnrsok from './data/fnrsok';
import kandidatliste from './data/kandidatliste';

import rekrutteringsbistandStilling from './data/post-ads.json';
import reportee from './data/reportee.json';
import eksternStilling from './data/ekstern-stilling.json';
import eksternStillingMedKandidatliste from './data/ekstern-stilling-med-kandidatliste.json';
import internStilling from './data/intern-stilling.json';
import annensInterneStilling from './data/annens-interne-stilling.json';
import counties from './data/counties.json';
import countries from './data/countries.json';
import municipals from './data/municipals.json';
import categoriesWithAltnames from './data/categories-with-altnames.json';
import postdata from './data/postdata.json';
import search from './data/search.json';
import mineStillingerFraOpenSearch from './data/mineStillingerOpenSearch';
import kandidatsøk from './data/kandidatsøk';

const reporteeUrl = `${stillingApi}/rekrutteringsbistand/api/v1/reportee`;
const mineStillingerOpenSearchUrl = `express:${stillingssøkProxy}/stilling/_search`;
const opprettStillingUrl = `express:${stillingApi}/rekrutteringsbistandstilling`;
const kopierStillingUrl = `express:${stillingApi}/rekrutteringsbistandstilling/kopier/:stillingsId`;
const slettStillingUrl = `express:${stillingApi}/rekrutteringsbistandstilling/:stillingsId`;

const getStillingUrl = `express:${stillingApi}/rekrutteringsbistandstilling/:stillingsId`;
const putStillingUrl = `express:${stillingApi}/rekrutteringsbistandstilling`;
const putStillingsinfoUrl = `express:${stillingApi}/stillingsinfo`;
const kandidatlisteUrl = `express:${KANDIDAT_API}/veileder/stilling/:stillingsId/kandidatliste`;

const countiesUrl = `${stillingApi}/rekrutteringsbistand/api/v1/geography/counties`;
const countriesUrl = `${stillingApi}/rekrutteringsbistand/api/v1/geography/countries`;
const municipalsUrl = `${stillingApi}/rekrutteringsbistand/api/v1/geography/municipals`;
const categoriesWithAltnamesUrl = `${stillingApi}/rekrutteringsbistand/api/v1/categories-with-altnames?taxonomy=STYRK08NAV`;
const postdataUrl = `${stillingApi}/rekrutteringsbistand/api/v1/postdata`;
const fnrsokUrl = `express:${KANDIDAT_API}/veileder/kandidatsok/fnrsok`;
const leggKandidatIKandidatlisteUrl = `express:${KANDIDAT_API}/veileder/kandidatlister/:kandidatlisteId/kandidater`;

const searchApiUrl = `express:${stillingApi}/search-api/underenhet/_search`;

fetchMock.config.fallbackToNetwork = true;
fetchMock.config.warnOnFallback = false;
fetchMock.config.overwriteRoutes = true;

const hentStillingPåUuid = (uuid: string): Rekrutteringsbistandstilling => {
    switch (uuid) {
        case eksternStilling.stilling.uuid:
            return eksternStilling as unknown as Rekrutteringsbistandstilling;
        case eksternStillingMedKandidatliste.stilling.uuid:
            return eksternStillingMedKandidatliste as unknown as Rekrutteringsbistandstilling;
        case annensInterneStilling.stilling.uuid:
            return annensInterneStilling as unknown as Rekrutteringsbistandstilling;
        default:
            return internStilling as unknown as Rekrutteringsbistandstilling;
    }
};

const getStilling = (url: string) => {
    const stillingsId = url.split('/').pop()!;

    return hentStillingPåUuid(stillingsId);
};

const putStillingsinfo = (url: string, options: MockRequest) => {
    const body = JSON.parse(options.body as string);

    return {
        stillingsinfoid: '19caad45-dbd5-4168-94e2-b432050a7aaa',
        ...body,
    };
};

const putStilling = (_: string, options: MockRequest): Rekrutteringsbistandstilling => {
    const body = JSON.parse(options.body as string);
    const stillingsId = body.stilling.uuid;
    const stilling = hentStillingPåUuid(stillingsId);

    return {
        ...stilling,
        stilling: {
            ...stilling.stilling,
            ...body.stilling,
        },
    };
};

fetchMock
    .post(mineStillingerOpenSearchUrl, log(mineStillingerFraOpenSearch))
    .post(opprettStillingUrl, log(rekrutteringsbistandStilling))
    .post(kopierStillingUrl, log(rekrutteringsbistandStilling))
    .get(reporteeUrl, log(reportee))

    .get(getStillingUrl, log(getStilling))
    .put(putStillingUrl, log(putStilling))
    .delete(slettStillingUrl, log(getStilling))
    .put(putStillingsinfoUrl, log(putStillingsinfo))

    .get(countiesUrl, log(counties))
    .get(countriesUrl, log(countries))
    .get(municipalsUrl, log(municipals))
    .get(categoriesWithAltnamesUrl, log(categoriesWithAltnames))
    .get(postdataUrl, log(postdata))
    .get(searchApiUrl, log(search))
    .post(searchApiUrl, log(search))
    .post(fnrsokUrl, log(fnrsok))
    .post(kandidatProxyUrl, log(kandidatsøk))
    .post(leggKandidatIKandidatlisteUrl, log(kandidatliste))
    .get(kandidatlisteUrl, log(kandidatliste), {
        delay: 500,
    });

function log(response: MockResponse | MockResponseFunction) {
    return (url: string, options: MockRequest) => {
        console.log('%cMOCK %s %s', 'color: lightgray;', options.method || 'GET', url, {
            ...(options.body
                ? {
                      body: JSON.parse(options.body as string),
                  }
                : {}),
            response: typeof response === 'function' ? response(url, options) : response,
        });

        return response;
    };
}
