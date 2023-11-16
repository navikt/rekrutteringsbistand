import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { NextFunction, Request, Response } from 'express';
import { EsQuery } from '../../src/felles/domene/elastic/ElasticSearch';
import Kandidat from '../../src/felles/domene/kandidat/Kandidat';
import * as azureAd from '../src/azureAd';
import * as kandidatsøk from '../src/kandidatsøk/kandidatsøk';
import * as logger from '../src/logger';
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

        mockRequest = {
            headers: {
                authorization: '',
            },
        };

        nextFunction = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('Kall mot kandidatsøk med spesifikk person-query på fødselsnummer skal logges', async () => {
        const dateNow = 1;
        const navIdent = 'A123456';
        const personId = '12345678910';
        const melding = `CEF:0|Rekrutteringsbistand|undefined|1.0|audit:access|Sporingslogg|INFO|flexString1=Permit msg=NAV-ansatt har gjort spesifikt kandidatsøk på brukeren duid=${personId} flexString1Label=Decision end=${dateNow} suid=${navIdent}`;

        mockRequest.body = queries.queryTilKandidatsøkMedAktørIdOgFødselsnummer(personId);

        jest.spyOn(logger, 'currentTimeForAuditlogg').mockReturnValue(1);
        jest.spyOn(azureAd, 'hentNavIdent').mockReturnValue(navIdent);
        const auditLog = jest.spyOn(logger.auditLog, 'info');

        auditLog.mockImplementation(() => logger.auditLog);

        kandidatsøk.loggSøkPåFnrEllerAktørId(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(nextFunction).toBeCalled();
        expect(auditLog).toBeCalledTimes(1);
        expect(auditLog).toHaveBeenCalledWith(melding);
    });

    test('Kall mot kandidatsøk med hent person-query på fødselsnummer skal logges', async () => {
        const dateNow = 1;
        const navIdent = 'A123456';
        const personId = '12345678910';
        const melding = `CEF:0|Rekrutteringsbistand|undefined|1.0|audit:access|Sporingslogg|INFO|flexString1=Permit msg=NAV-ansatt har åpnet CV-en til bruker duid=${personId} flexString1Label=Decision end=${dateNow} suid=${navIdent}`;

        mockRequest.body = queries.queryTilHentKandidat(personId);

        jest.spyOn(logger, 'currentTimeForAuditlogg').mockReturnValue(1);
        jest.spyOn(azureAd, 'hentNavIdent').mockReturnValue(navIdent);
        const auditLog = jest.spyOn(logger.auditLog, 'info');

        auditLog.mockImplementation((_) => logger.auditLog);

        kandidatsøk.loggSøkPåFnrEllerAktørId(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(nextFunction).toBeCalled();
        expect(auditLog).toBeCalledTimes(1);
        expect(auditLog).toHaveBeenCalledWith(melding);
    });
});
