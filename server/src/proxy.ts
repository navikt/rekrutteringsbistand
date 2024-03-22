import { RequestHandler } from 'express';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
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

export const proxyUtenToken = (path: string, apiUrl: string) => {
    app.use(path, setupProxy(path, apiUrl));
};
