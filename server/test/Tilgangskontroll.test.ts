import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { NextFunction, Request, Response } from 'express';
import * as azureAd from '../src/azureAd';
import * as kandidatsøk from '../src/kandidatsøk/kandidatsøk';
import * as middlewares from '../src/middlewares';

describe('Tilgangskontroll for kandidatsøket', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction = jest.fn();

    beforeEach(() => {
        mockResponse = {
            status: jest.fn(() => mockResponse),
            send: jest.fn(),
        } as Partial<Response>;

        mockRequest = {
            headers: {
                authorization: '',
            },
            body: {},
        };

        nextFunction = jest.fn();
    });

    test('En bruker med ModiaGenerellTilgang skal få tilgang til kandidatsøket', async () => {
        jest.spyOn(azureAd, 'hentNavIdent').mockReturnValue('A123456');
        jest.spyOn(azureAd, 'hentRoller').mockReturnValue([
            kandidatsøk.AD_GRUPPE_MODIA_GENERELL_TILGANG!,
        ]);

        kandidatsøk.harTilgangTilKandidatsøk(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(nextFunction).toBeCalled();
    });

    test('En bruker med ModiaOppfølging skal få tilgang til kandidatsøket', async () => {
        jest.spyOn(azureAd, 'hentNavIdent').mockReturnValue('A123456');
        jest.spyOn(azureAd, 'hentRoller').mockReturnValue([
            kandidatsøk.AD_GRUPPE_MODIA_OPPFOLGING!,
        ]);

        kandidatsøk.harTilgangTilKandidatsøk(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(nextFunction).toBeCalled();
    });

    test('En bruker med andre tilganger skal ikke få tilgang til kandidatsøket', async () => {
        const andreTilganger = ['en-annen-tilgang'];

        jest.spyOn(azureAd, 'hentNavIdent').mockReturnValue('A123456');
        jest.spyOn(azureAd, 'hentRoller').mockReturnValue(andreTilganger);

        kandidatsøk.harTilgangTilKandidatsøk(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(nextFunction).toBeCalledTimes(0);
        expect(mockResponse.status).toBeCalledWith(403);
    });

    test('En bruker uten noen tilganger skal ikke få tilgang til kandidatsøket', async () => {
        jest.spyOn(middlewares, 'retrieveToken').mockReturnValue('');
        jest.spyOn(azureAd, 'hentNavIdent').mockReturnValue('A123456');
        jest.spyOn(azureAd, 'hentRoller').mockReturnValue([]);

        kandidatsøk.harTilgangTilKandidatsøk(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(nextFunction).toBeCalledTimes(0);
        expect(mockResponse.status).toBeCalledWith(403);
    });
});
