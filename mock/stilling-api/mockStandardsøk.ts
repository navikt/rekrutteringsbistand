import { RestRequest } from 'msw';
import StandardsøkDto from '../../src/stillingssok/filter/standardsøk/Standardsøk';

export const mockStandardsøk: StandardsøkDto = {
    søk: 'statuser=publisert%2Cutl%C3%B8pt&q=Rektor',
    navIdent: 'A123456',
    tidspunkt: '2021-03-26T10:19:50.601956',
};

export const mockPutStandardsøk = async (request: RestRequest): Promise<StandardsøkDto> => {
    const nyttSøk = await request.json();

    return {
        ...mockStandardsøk,
        søk: nyttSøk.søk,
    };
};
