import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { NextFunction, Request, Response } from 'express';
import { EsQuery } from '../../src/felles/domene/elastic/ElasticSearch';
import Kandidat from '../../src/felles/domene/kandidat/Kandidat';
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
        jest.spyOn(azureAd, 'hentGrupper').mockReturnValue([
            kandidatsøk.AD_GRUPPE_MODIA_GENERELL_TILGANG!,
        ]);

        await kandidatsøk.harTilgangTilKandidatsøk(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(nextFunction).toBeCalled();
    });

    test('En bruker med ModiaOppfølging skal få tilgang til kandidatsøket', async () => {
        jest.spyOn(azureAd, 'hentNavIdent').mockReturnValue('A123456');
        jest.spyOn(azureAd, 'hentGrupper').mockReturnValue([
            kandidatsøk.AD_GRUPPE_MODIA_OPPFOLGING!,
        ]);

        await kandidatsøk.harTilgangTilKandidatsøk(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(nextFunction).toBeCalled();
    });

    test('En bruker med andre tilganger skal ikke få tilgang til kandidatsøket', async () => {
        const andreTilganger = ['en-annen-tilgang'];

        jest.spyOn(azureAd, 'hentNavIdent').mockReturnValue('A123456');
        jest.spyOn(azureAd, 'hentGrupper').mockReturnValue(andreTilganger);

        await kandidatsøk.harTilgangTilKandidatsøk(
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
        jest.spyOn(azureAd, 'hentGrupper').mockReturnValue([]);

        await kandidatsøk.harTilgangTilKandidatsøk(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(nextFunction).toBeCalledTimes(0);
        expect(mockResponse.status).toBeCalledWith(403);
    });
});

describe('ES body for søk', () => {
    let queryMock = (bool?: object): EsQuery<Kandidat> => {
        return {
            query: {
                bool: {
                    must: [
                        {
                            bool: bool,
                        },
                    ],
                },
            },
            _source: [
                'fodselsnummer',
                'fornavn',
                'etternavn',
                'arenaKandidatnr',
                'kvalifiseringsgruppekode',
                'yrkeJobbonskerObj',
                'geografiJobbonsker',
            ],
        };
    };

    test('Er ES body med søk på fødselsnummer og aktørId', async () => {
        const resultat = kandidatsøk.erSpesifikkPersonQuery(
            queryMock({
                should: [
                    {
                        term: {
                            aktorId: '21909899211',
                        },
                    },
                    {
                        term: {
                            fodselsnummer: '21909899211',
                        },
                    },
                ],
            })
        );

        expect(resultat).toBeTruthy();
    });

    test('Er ES body med søk på fødselsnummer', async () => {
        const resultat = kandidatsøk.erSpesifikkPersonQuery(
            queryMock({
                should: [
                    {
                        term: {
                            fodselsnummer: '21909899211',
                        },
                    },
                ],
            })
        );
        expect(resultat).toBeTruthy();
    });

    test('Er ES body med søk på aktørId', async () => {
        const resultat = kandidatsøk.erSpesifikkPersonQuery(
            queryMock({
                should: [
                    {
                        term: {
                            aktorId: '21909899211',
                        },
                    },
                ],
            })
        );
        expect(resultat).toBeTruthy();
    });

    test('Er ES body uten søk på fødselsnummer eller aktørId', async () => {
        const resultat = kandidatsøk.erSpesifikkPersonQuery(queryMock());
        expect(resultat).toBeFalsy();
    });

    test('Henter fnr fra ES body når det finnes', async () => {
        const resultat = kandidatsøk.erSpesifikkPersonQuery(
            queryMock({
                should: [
                    {
                        term: {
                            aktorId: '21909899211',
                        },
                    },
                    {
                        term: {
                            fodselsnummer: '10108000398',
                        },
                    },
                ],
            })
        );
        expect(resultat).toBe('10108000398');
    });

    test('Henter aktørid fra ES body når fnr ikke finnes', async () => {
        const resultat = kandidatsøk.erSpesifikkPersonQuery(
            queryMock({
                should: [
                    {
                        term: {
                            aktorId: '21909899211',
                        },
                    },
                ],
            })
        );
        expect(resultat).toBe('21909899211');
    });
});

describe('Auditlogging av personspesifikt kandidatsøk', () => {
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

    test('Kall mot spesifikk person skal logges', async () => {
        mockRequest = {
            headers: {
                authorization: '',
            },
            body: {},
        };

        const resultat = await kandidatsøk.loggSøkPåFnrEllerAktørId(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(nextFunction).toBeCalled();
    });
});
