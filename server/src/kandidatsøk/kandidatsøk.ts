import { RequestHandler } from 'express';
import { hentGrupper, hentNavIdent } from '../azureAd';
import { auditLog, logger, opprettLoggmeldingForAuditlogg, secureLog } from '../logger';
import { retrieveToken } from '../middlewares';
import { SearchQuery } from './elasticSearchTyper';

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

export const loggSøkPåFnrEllerAktørId: RequestHandler = async (request, _, next) => {
    const erSøkPåKandidater = request.body && request.body._source !== false;

    if (erSøkPåKandidater) {
        try {
            const fnrEllerAktørId = hentFnrEllerAktørIdFraESBody(request.body);

            if (fnrEllerAktørId) {
                const brukerensAccessToken = retrieveToken(request.headers);
                const navIdent = hentNavIdent(brukerensAccessToken);

                const melding = opprettLoggmeldingForAuditlogg(
                    'NAV-ansatt har gjort spesifikt kandidatsøk på brukeren',
                    fnrEllerAktørId,
                    navIdent
                );

                auditLog.info(melding);
            }
        } catch (e) {
            logger.error('Klarte ikke å logge søk på fnr eller aktørId:', e);
        }
    }

    next();
};

export const hentFnrEllerAktørIdFraESBody = (request: SearchQuery): string | null => {
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
