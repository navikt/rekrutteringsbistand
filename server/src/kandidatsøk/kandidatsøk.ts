import { RequestHandler } from 'express';
import { hentRoller, hentNavIdent } from '../azureAd';
import { secureLog } from '../logger';
import { retrieveToken } from '../middlewares';

export const { AD_GRUPPE_MODIA_GENERELL_TILGANG, AD_GRUPPE_MODIA_OPPFOLGING } = process.env;

export const adGrupperMedTilgangTilKandidatsøket = [
    AD_GRUPPE_MODIA_GENERELL_TILGANG,
    AD_GRUPPE_MODIA_OPPFOLGING,
];

const sjekkTilgang = (
    accessToken: string
): { harTilgang: boolean; brukerensAdGrupper: string[] } => {
    const brukerensAdGrupper = hentRoller(accessToken);
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
