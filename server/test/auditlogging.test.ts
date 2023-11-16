import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { NextFunction, Request, Response } from 'express';
import { EsQuery } from '../../src/felles/domene/elastic/ElasticSearch';
import Kandidat from '../../src/felles/domene/kandidat/Kandidat';
import * as azureAd from '../src/azureAd';
import * as kandidatsøk from '../src/kandidatsøk/kandidatsøk';
import * as queries from './queriesMotSpesifikkPerson';

describe('Auditlogging av personspesifikt kandidatsøk', () => {
    let mockRequest: Partial<Request<unknown, unknown, EsQuery<Kandidat>>>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction = jest.fn();

    beforeEach(() => {
        mockResponse = {
            status: jest.fn(() => mockResponse),
            send: jest.fn(),
        } as Partial<Response>;

        nextFunction = jest.fn();
    });

    test('Kall mot kandidatsøk med spesifikk person-query på fødselsnummer skal logges til AuditLog', async () => {
        mockRequest = {
            headers: {
                authorization: '',
            },
            body: queries.queryTilKandidatsøkMedAktørIdOgFødselsnummer,
        };

        jest.spyOn(azureAd, 'hentNavIdent').mockReturnValue('A123456');

        const resultat = await kandidatsøk.loggSøkPåFnrEllerAktørId(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(nextFunction).toBeCalled();
    });
});
