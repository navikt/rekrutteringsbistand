import { Request, RequestHandler, Response } from 'express';
import { hentGrupper, hentNavIdent } from '../azureAd';
import { auditLog, logger, opprettLoggmeldingForAuditlogg, secureLog } from '../logger';
import { retrieveToken } from '../middlewares';
import { ElasticsearchResponse, SearchQuery } from './elasticSearchTyper';

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

export const loggSøkPåFnrEllerAktørId: RequestHandler = (
    request: Request<unknown, unknown, SearchQuery>,
    response: Response<ElasticsearchResponse, unknown>,
    next
) => {
    try {
        const requestOmSpesifikkPerson = requestBerOmSpesifikkPerson(request);

        if (requestOmSpesifikkPerson !== null) {
            const brukerensAccessToken = retrieveToken(request.headers);
            const navIdent = hentNavIdent(brukerensAccessToken);

            const personIdFraResponse = hentPersonIdFraResponse(response.);

            const melding = opprettLoggmeldingForAuditlogg(
                requestOmSpesifikkPerson.melding,
                requestOmSpesifikkPerson.fnrEllerAktørId,
                navIdent,
                personIdFraResponse
            );

            auditLog.info(melding);
            secureLog.info(`Auditlogget handling: ${melding}`);
        }
    } catch (e) {
        const feilmelding =
            'Klarte ikke å verifisere eller logge henting av persondata via kandidatsøk-proxy:';
        logger.error(feilmelding, e);

        return response.status(500).send(feilmelding);
    }

    next();
};

type MeldingTilAuditlog = {
    melding: string;
    fnrEllerAktørId: string;
};

const hentPersonIdFraResponse = (response: Response<ElasticsearchResponse, unknown>): string => {
    return response.hits?.hits[0]?._source?.fodselsnummer;
};

const requestBerOmSpesifikkPerson = (
    request: Request<unknown, unknown, SearchQuery>
): null | MeldingTilAuditlog => {
    const berOmData = request.body && request.body._source !== false;

    if (!berOmData) {
        return null;
    }

    const idInniSpesifikkPersonQuery = erSpesifikkPersonQuery(request.body);
    const idInniHentKandidatQuery = erHentKandidatQuery(request.body);
    const idInniFinnStillingQuery = erFinnStillingQuery(request.body);

    if (idInniSpesifikkPersonQuery) {
        return {
            melding: 'NAV-ansatt har gjort spesifikt kandidatsøk på brukeren',
            fnrEllerAktørId: idInniSpesifikkPersonQuery,
        };
    } else if (idInniHentKandidatQuery) {
        return {
            melding: "NAV-ansatt har åpnet CV'en til bruker",
            fnrEllerAktørId: idInniHentKandidatQuery,
        };
    } else if (idInniFinnStillingQuery) {
        return null; // TODO: Bør audit-logges?
    }

    return null;
};

export const erSpesifikkPersonQuery = (request: SearchQuery): string | null => {
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

export const erHentKandidatQuery = (request: SearchQuery): string | null => {
    if (
        request.size === 1 &&
        request._source === undefined &&
        request.query?.term?.['kandidatnr'] !== undefined
    ) {
        return request.query.term['kandidatnr'];
    }

    return null;
};

export const erFinnStillingQuery = (request: SearchQuery): string | null => {
    if (
        request.size === 1 &&
        request._source &&
        request.query?.term?.['kandidatnr'] !== undefined
    ) {
        return request.query.term['kandidatnr'];
    }

    return null;
};
