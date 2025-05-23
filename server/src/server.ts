import compression from 'compression';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';

import { hentBrukerOgRoller, initializeAzureAd } from './azureAd';
import { logger } from './logger';
import { redirectIfUnauthorized, respondUnauthorizedIfNotLoggedIn } from './middlewares';
import { proxyMedOboToken, proxyUtenToken } from './proxy';

// Last inn miljøvariabler for lokal utvikling
dotenv.config({ path: `.env.local` });

export const app = express();

const port = process.env.PORT || 8080;
const buildPath = path.join(__dirname, '../dist');
const cluster = process.env.NAIS_CLUSTER_NAME;
const clusterOnPrem = cluster === 'prod-gcp' ? 'prod-fss' : 'dev-fss';
export const miljøErProd = cluster === 'prod-gcp' || cluster === 'prod-fss';

const scopes = {
    modiaContextHolder: `api://${cluster}.personoversikt.modiacontextholder/.default`,
    statistikk: `api://${clusterOnPrem}.toi.rekrutteringsbistand-statistikk-api/.default`,
    stillingssøk: `api://${cluster}.toi.rekrutteringsbistand-stillingssok-proxy/.default`,
    stilling: `api://${cluster}.toi.rekrutteringsbistand-stilling-api/.default`,
    kandidat: `api://${clusterOnPrem}.toi.rekrutteringsbistand-kandidat-api/.default`,
    sms: `api://${clusterOnPrem}.toi.rekrutteringsbistand-sms/.default`,
    forespørselOmDelingAvCv: `api://${clusterOnPrem}.toi.foresporsel-om-deling-av-cv-api/.default`,
    synlighetsmotor: `api://${cluster}.toi.toi-synlighetsmotor/.default`,
    presenterteKandidater: `api://${cluster}.toi.presenterte-kandidater-api/.default`,
    kandidatsøk: `api://${cluster}.toi.rekrutteringsbistand-kandidatsok-api/.default`,
    kandidatvarsel: `api://${cluster}.toi.rekrutteringsbistand-kandidatvarsel-api/.default`,
    pamOntologi: `api://${cluster}.teampam.pam-ontologi/.default`,
};

const {
    STILLING_API_URL,
    STATISTIKK_API_URL,
    STILLINGSSOK_PROXY_URL,
    KANDIDAT_API_URL,
    KANDIDATSOK_API_URL,
    FORESPORSEL_OM_DELING_AV_CV_API,
    SYNLIGHETSMOTOR_API,
    ARBEIDSGIVER_NOTIFIKASJON_API,
    PRESENTERTE_KANDIDATER_API,
    MODIA_CONTEXT_HOLDER_API,
    KANDIDATVARSEL_API_URL,
    PAM_ONTOLOGI_URL,
} = process.env;

const startServer = () => {
    app.use(compression());
    app.use(express.json({ strict: false }));

    app.get([`/internal/isAlive`, `/internal/isReady`], (_, res) => res.sendStatus(200));

    app.get('/meg', respondUnauthorizedIfNotLoggedIn, hentBrukerOgRoller);

    proxyUtenToken('/arbeidsgiver-notifikasjon-api', ARBEIDSGIVER_NOTIFIKASJON_API);

    proxyMedOboToken('/modiacontextholder', MODIA_CONTEXT_HOLDER_API, scopes.modiaContextHolder);

    proxyMedOboToken('/statistikk-api', STATISTIKK_API_URL, scopes.statistikk);
    proxyMedOboToken('/stillingssok-proxy', STILLINGSSOK_PROXY_URL, scopes.stillingssøk);
    proxyMedOboToken('/stilling-api', STILLING_API_URL, scopes.stilling);
    proxyMedOboToken('/kandidat-api', KANDIDAT_API_URL, scopes.kandidat);
    proxyMedOboToken('/kandidatsok-api', KANDIDATSOK_API_URL, scopes.kandidatsøk);
    proxyUtenToken('/pam-ontologi', PAM_ONTOLOGI_URL);
    proxyMedOboToken('/kandidatvarsel-api', KANDIDATVARSEL_API_URL, scopes.kandidatvarsel);
    proxyMedOboToken(
        '/foresporsel-om-deling-av-cv-api',
        FORESPORSEL_OM_DELING_AV_CV_API,
        scopes.forespørselOmDelingAvCv
    );
    proxyMedOboToken('/synlighet-api', SYNLIGHETSMOTOR_API, scopes.synlighetsmotor);
    proxyMedOboToken(
        '/presenterte-kandidater-api',
        PRESENTERTE_KANDIDATER_API,
        scopes.presenterteKandidater
    );

    app.use(
        `/assets`,
        express.static(`${buildPath}/assets`, {
            maxAge: 31536000,
            immutable: true,
        })
    );

    app.get(['/', '/*'], redirectIfUnauthorized, (_, res) => {
        res.sendFile(`${buildPath}/index.html`);
    });

    app.listen(port, () => {
        logger.info('Server kjører på port ' + port);
    });
};

const initializeServer = async () => {
    try {
        if (!process.env.LOKALT) {
            await initializeAzureAd();
        }

        startServer();
    } catch (e) {
        logger.error(`Klarte ikke å starte server: ${e}`);
    }
};

initializeServer();
