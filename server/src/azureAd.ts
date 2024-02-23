import { RequestHandler } from 'express';
import { createRemoteJWKSet, decodeJwt, jwtVerify } from 'jose';
import { FlattenedJWSInput, GetKeyFunction, JWSHeaderParameters } from 'jose/dist/types/types';
import { Client, Issuer } from 'openid-client';
import { logger } from './logger';
import { retrieveToken } from './middlewares';
import { Roller } from './roller';

const discoveryUrl = process.env.AZURE_APP_WELL_KNOWN_URL;
const clientId = process.env.AZURE_APP_CLIENT_ID;

let azureAdIssuer: Issuer<Client>;
let remoteJWKSet: GetKeyFunction<JWSHeaderParameters, FlattenedJWSInput>;

export const navIdentClaim = 'NAVident';

export const initializeAzureAd = async () => {
    try {
        await discoverAzureAdIssuer();
        opprettRemoteJWKSet();
    } catch (e) {
        throw Error('Klarte ikke å initialisere AzureAD:' + e);
    }
};

export const discoverAzureAdIssuer = async () => {
    if (discoveryUrl) {
        azureAdIssuer = await Issuer.discover(discoveryUrl);
    } else {
        throw Error(`Miljøvariabelen "AZURE_APP_WELL_KNOWN_URL" må være definert`);
    }
};

export const opprettRemoteJWKSet = () => {
    const jwksUrl = new URL(process.env.AZURE_OPENID_CONFIG_JWKS_URI);
    remoteJWKSet = createRemoteJWKSet(jwksUrl);
};

export const tokenIsValid = async (token: string) => {
    try {
        const verification = await jwtVerify(token, remoteJWKSet, {
            audience: clientId,
            issuer: azureAdIssuer.metadata.issuer,
        });

        return !!verification.payload;
    } catch (e) {
        logger.error('Noe galt skjedde under validering av token:', e);
        return false;
    }
};

export const hentNavIdent = (token: string) => {
    const claims = decodeJwt(token);
    return String(claims[navIdentClaim]) || '';
};

export const hentRoller = (token: string): string[] => {
    const claims = decodeJwt(token);
    return (claims.groups as string[]) || [];
};

const {
    AD_GRUPPE_MODIA_GENERELL_TILGANG,
    AD_GRUPPE_MODIA_OPPFOLGING,
    AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
    AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
    AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
} = process.env;

const navnForRolleId = (rolleId: string): string | null => {
    switch (rolleId) {
        case AD_GRUPPE_MODIA_GENERELL_TILGANG:
            return Roller.AD_GRUPPE_MODIA_GENERELL_TILGANG;
        case AD_GRUPPE_MODIA_OPPFOLGING:
            return Roller.AD_GRUPPE_MODIA_OPPFOLGING;
        case AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET:
            return Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET;
        case AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET:
            return Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET;
        case AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER:
            return Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER;
        default:
            return null;
    }
};

export const hentBrukerOgRoller: RequestHandler = async (req, res) => {
    const brukerensAccessToken = retrieveToken(req.headers);
    const navIdent = hentNavIdent(brukerensAccessToken);
    const roller = hentRoller(brukerensAccessToken)
        .map(navnForRolleId)
        .filter((navn): navn is string => navn !== null);

    res.status(200).json({
        navIdent,
        roller,
    });
};
