import { RequestHandler } from 'express';
import { createRemoteJWKSet, decodeJwt, jwtVerify } from 'jose';
import { FlattenedJWSInput, GetKeyFunction, JWSHeaderParameters } from 'jose/dist/types/types';
import { Client, Issuer } from 'openid-client';
import { logger } from './logger';
import { retrieveToken } from './middlewares';

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

export const hentBrukerOgRoller: RequestHandler = async (req, res) => {
    const brukerensAccessToken = retrieveToken(req.headers);
    const navIdent = hentNavIdent(brukerensAccessToken);
    const roller = hentRoller(brukerensAccessToken);

    res.status(200).json({
        navIdent,
        roller,
    });
};
