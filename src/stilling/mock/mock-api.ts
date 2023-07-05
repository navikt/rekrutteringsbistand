import fetchMock, { MockRequest, MockResponse, MockResponseFunction } from 'fetch-mock';

import { Rekrutteringsbistandstilling } from '../domene/Stilling';
import { api } from 'felles/api';
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

const reporteeUrl = `${api.stilling}/rekrutteringsbistand/api/v1/reportee`;
const opprettStillingUrl = `express:${api.stilling}/rekrutteringsbistandstilling`;
const kopierStillingUrl = `express:${api.stilling}/rekrutteringsbistandstilling/kopier/:stillingsId`;
const slettStillingUrl = `express:${api.stilling}/rekrutteringsbistandstilling/:stillingsId`;

const getStillingUrl = `express:${api.stilling}/rekrutteringsbistandstilling/:stillingsId`;
const putStillingUrl = `express:${api.stilling}/rekrutteringsbistandstilling`;
const putStillingsinfoUrl = `express:${api.stilling}/stillingsinfo`;
const kandidatlisteUrl = `express:${api.kandidat}/veileder/stilling/:stillingsId/kandidatliste`;

const countiesUrl = `${api.stilling}/rekrutteringsbistand/api/v1/geography/counties`;
const countriesUrl = `${api.stilling}/rekrutteringsbistand/api/v1/geography/countries`;
const municipalsUrl = `${api.stilling}/rekrutteringsbistand/api/v1/geography/municipals`;
const categoriesWithAltnamesUrl = `${api.stilling}/rekrutteringsbistand/api/v1/categories-with-altnames?taxonomy=STYRK08NAV`;
const postdataUrl = `${api.stilling}/rekrutteringsbistand/api/v1/postdata`;
const fnrsokUrl = `express:${api.kandidat}/veileder/kandidatsok/fnrsok`;
const leggKandidatIKandidatlisteUrl = `express:${api.kandidat}/veileder/kandidatlister/:kandidatlisteId/kandidater`;

const searchApiUrl = `express:${api.stilling}/search-api/underenhet/_search`;

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
