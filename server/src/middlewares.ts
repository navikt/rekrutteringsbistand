import { Response as ExpressResponse, NextFunction, Request, RequestHandler } from 'express';
import { IncomingHttpHeaders } from 'http';
import { tokenIsValid } from './azureAd';
import { logger } from './logger';
import { hentOnBehalfOfToken } from './onBehalfOfToken';

export const cluster = process.env.NAIS_CLUSTER_NAME;

export const redirectIfUnauthorized: RequestHandler = async (req, res, next) => {
    if (await userIsLoggedIn(req)) {
        next();
    } else {
        res.redirect(`/oauth2/login?redirect=${req.originalUrl}`);
    }
};

export const respondUnauthorizedIfNotLoggedIn: RequestHandler = async (req, res, next) => {
    if (await userIsLoggedIn(req)) {
        next();
    } else {
        res.status(401).send('Brukeren har ingen gyldig sesjon');
    }
};

export const setOnBehalfOfToken =
    (scope: string) => async (req: Request, res: ExpressResponse, next: NextFunction) => {
        const accessToken = retrieveToken(req.headers);

        if (!accessToken) {
            res.status(500).send('Kan ikke be om OBO-token siden access-token ikke finnes');
        } else {
            try {
                const token = await hentOnBehalfOfToken(accessToken, scope);
                req.headers.authorization = `Bearer ${token.access_token}`;
                next();
            } catch (e) {
                // 400 Bad request under OBO-veksling betyr at bruker
                // ikke tilhører gruppene som kreves for å kalle appen.

                if (e instanceof Response) {
                    const respons = e as Response;

                    if (respons.status === 400) {
                        res.status(403).send(
                            `Bruker har ikke tilgang til scope ${scope} Body: ${respons.text}`
                        );
                    } else {
                        res.status(respons.status).send(respons.statusText);
                    }
                } else {
                    logger.error('Klarte ikke å sette OBO-token, og fikk følgende feil: ' + e);

                    res.status(500).send('Klarte ikke å sette OBO-token');
                }
            }
        }
    };

export function retrieveToken(headers: IncomingHttpHeaders) {
    return headers.authorization?.replace('Bearer ', '');
}

async function userIsLoggedIn(req: Request): Promise<boolean> {
    const token = retrieveToken(req.headers);
    return token && (await tokenIsValid(token));
}

export const tomMiddleware: RequestHandler = (_, __, next) => {
    next();
};
