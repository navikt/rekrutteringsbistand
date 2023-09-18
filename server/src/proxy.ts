import { RequestHandler } from 'express';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import {
    harTilgangTilKandidatsøk,
    leggTilAuthorizationForKandidatsøkEs,
    loggSøkPåFnrEllerAktørId,
} from './kandidatsøk/kandidatsøk';
import { logger } from './logger';
import { respondUnauthorizedIfNotLoggedIn, setOnBehalfOfToken, tomMiddleware } from './middlewares';
import { app } from './server';

// Krever ekstra miljøvariabler, se nais.yaml
export const setupProxy = (fraPath: string, tilTarget: string): RequestHandler =>
    createProxyMiddleware({
        target: tilTarget,
        changeOrigin: true,
        secure: true,
        pathRewrite: (path) => path.replace(fraPath, ''),
        logger,
        on: {
            // Fikser proxien ved bruk sammen med express.json()-middleware i server.ts
            proxyReq: fixRequestBody,
        },
    });

export const proxyMedOboToken = (
    path: string,
    apiUrl: string,
    apiScope: string,
    customMiddleware?: RequestHandler
) => {
    app.use(
        path,
        respondUnauthorizedIfNotLoggedIn,
        customMiddleware ? customMiddleware : tomMiddleware,
        setOnBehalfOfToken(apiScope),
        setupProxy(path, apiUrl)
    );
};

export const proxyEpostTemplate = (path: string, apiUrl: string) => {
    app.use(
        path,
        createProxyMiddleware({
            target: apiUrl,
            followRedirects: true,
            changeOrigin: true,
            pathRewrite: (newPath) => newPath.replace(path, ''),
            on: {
                error: (error) => {
                    logger.info('Klarte ikke å proxy:' + error);
                },
            },
            logger,
        })
    );
};

export const proxyTilKandidatsøkEs = (
    path: string,
    proxyUrl: string,
    brukernavn: string,
    passord: string
) => {
    app.use(
        path,
        respondUnauthorizedIfNotLoggedIn,
        harTilgangTilKandidatsøk,
        loggSøkPåFnrEllerAktørId,
        leggTilAuthorizationForKandidatsøkEs(brukernavn, passord),
        setupProxy(path, proxyUrl + '/veilederkandidat_current/_search')
    );
};
