import { Request, RequestHandler } from 'express';
import { EsQuery } from '../../../src/felles/domene/elastic/ElasticSearch';
import Kandidat from '../../../src/felles/domene/kandidat/Kandidat';
import { hentGrupper, hentNavIdent } from '../azureAd';
import { auditLog, logger, opprettLoggmeldingForAuditlogg, secureLog } from '../logger';
import { retrieveToken } from '../middlewares';

export const { AD_GRUPPE_MODIA_GENERELL_TILGANG, AD_GRUPPE_MODIA_OPPFOLGING } = process.env;

export const adGrupperMedTilgangTilKandidatsøket = [
    AD_GRUPPE_MODIA_GENERELL_TILGANG,
    AD_GRUPPE_MODIA_OPPFOLGING,
];

const sjekkTilgang = (
    accessToken: string
): { harTilgang: boolean; brukerensAdGrupper: string[] } => {
    const brukerensAdGrupper = hentGrupper(accessToken);
    const harTilgang = brukerensAdGrupper.some((adGruppeBrukerErMedlemAv) =>
        adGrupperMedTilgangTilKandidatsøket.includes(adGruppeBrukerErMedlemAv)
    );

    return {
        harTilgang,
        brukerensAdGrupper,
    };
};

export const harTilgangTilKandidatsøk: RequestHandler = async (request, response, next) => {
    const brukerensAccessToken = retrieveToken(request.headers);
    const navIdent = hentNavIdent(brukerensAccessToken);
    const tilgang = sjekkTilgang(brukerensAccessToken);

    if (tilgang.harTilgang) {
        next();
    } else {
        const brukerensGrupper = tilgang.brukerensAdGrupper.join(', ');
        const grupperSomGirTilgang = adGrupperMedTilgangTilKandidatsøket.join(', ');

        secureLog.info(
            `Bruker ${navIdent} har ikke tilgang til kandidatsøket. \nBruker har følgende AD-grupper: ${brukerensGrupper}. \nKandidatsøket krever en av følgende AD-grupper: ${grupperSomGirTilgang}.`
        );

        response
            .status(403)
            .send(
                'Du har ikke tilgang til kandidatsøket fordi det krever én av følgende AD-grupper: ' +
                    grupperSomGirTilgang
            );
    }
};

export const leggTilAuthorizationForKandidatsøkEs =
    (brukernavn: string, passord: string): RequestHandler =>
    (request, _, next) => {
        const encodedAuth = Buffer.from(`${brukernavn}:${passord}`).toString('base64');
        request.headers.authorization = `Basic ${encodedAuth}`;

        next();
    };

export const loggSøkPåFnrEllerAktørId: RequestHandler = async (request, response, next) => {
    try {
        const requestOmSpesifikkPerson = requestBerOmSpesifikkPerson(request);

        if (requestBerOmSpesifikkPerson !== null) {
            const brukerensAccessToken = retrieveToken(request.headers);
            console.log('1...');
            const navIdent = hentNavIdent(brukerensAccessToken);
            console.log('2...');

            const melding = opprettLoggmeldingForAuditlogg(
                requestOmSpesifikkPerson.meldingTilAuditlogg, //'NAV-ansatt har gjort spesifikt kandidatsøk på brukeren',
                requestOmSpesifikkPerson.fnrEllerAktørId,
                navIdent
            );
            console.log('3...');

            auditLog.info(melding);
            console.log('4...');

            secureLog.info(`Auditlogget handling: ${melding}`);
            console.log('5...');
        }
    } catch (e) {
        const feilmelding =
            'Klarte ikke å verifisere eller logge henting av persondata via kandidatsøk-proxy:';
        logger.error(feilmelding, e);

        return response.status(500).send(feilmelding);
    }

    next();
};

const requestBerOmSpesifikkPerson = (
    request: Request<unknown, unknown, EsQuery<Kandidat>>
): null | {
    meldingTilAuditlogg: string;
    fnrEllerAktørId: string;
} => {
    const berOmData = request.body && request.body._source !== false;

    if (berOmData === false) {
        return null;
    }

    const idInniSpesifikkPersonQuery = erSpesifikkPersonQuery(request.body);
    const idInniHentKandidatQuery = erHentKandidatQuery(request.body);
    const idInniFinnStillingQuery = erFinnStillingQuery(request.body);

    console.log('idInniSpesifikkPersonQuery', idInniSpesifikkPersonQuery);
    console.log('idInniHentKandidatQuery', idInniHentKandidatQuery);
    console.log('idInniFinnStillingQuery', idInniFinnStillingQuery);

    if (idInniSpesifikkPersonQuery) {
        return {
            meldingTilAuditlogg: 'NAV-ansatt har gjort spesifikt kandidatsøk på brukeren',
            fnrEllerAktørId: idInniSpesifikkPersonQuery,
        };
    } else if (idInniHentKandidatQuery) {
        return {
            meldingTilAuditlogg: 'NAV-ansatt har åpnet CV-en til bruker',
            fnrEllerAktørId: idInniSpesifikkPersonQuery,
        };
    } else if (idInniFinnStillingQuery) {
        return null; // TODO: Bør audit-logges?
    }

    return null;
};

export const erSpesifikkPersonQuery = (request: EsQuery<Kandidat>): string | null => {
    let fnrEllerAktørId = null;

    request.query?.bool?.must?.forEach((mustQuery) =>
        mustQuery.bool?.should?.forEach((shouldQuery) => {
            if (shouldQuery.term?.fodselsnummer || shouldQuery.term?.aktorId) {
                fnrEllerAktørId = shouldQuery.term?.fodselsnummer || shouldQuery.term?.aktorId;
            }
        })
    );

    return fnrEllerAktørId;
};

export const erHentKandidatQuery = (request: EsQuery<Kandidat>): string | null => {
    if (
        request._source === undefined &&
        request.query?.term['kandidatnr'] !== undefined &&
        request.size === 1
    ) {
        return request.query?.term['kandidatnr'];
    }

    return null;
};

export const erFinnStillingQuery = (request: EsQuery<Kandidat>): string | null => {
    if (request._source && request.query?.term['kandidatnr'] !== undefined && request.size === 1) {
        return request.query?.term['kandidatnr'];
    }

    return null;
};
