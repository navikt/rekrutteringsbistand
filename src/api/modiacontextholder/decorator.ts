/**
 * Endepunkt /decorator
 */
import { HttpResponse, http } from 'msw';
import useSWR from 'swr';
import { z } from 'zod';
import { getAPIwithSchema } from '../fetcher';

const decoratorEndepunkt = '/modiacontextholder/api/decorator';

export const enheterSchema = z.object({
    enhetId: z.string(),
    navn: z.string(),
});

export const DecoratorSchema = z.object({
    ident: z.string(),
    navn: z.string(),
    fornavn: z.string(),
    etternavn: z.string(),
    enheter: z.array(enheterSchema),
});

export type DecoratorDTO = z.infer<typeof DecoratorSchema>;

export interface Enheter {
    enhetId: string;
    navn: string;
}

export const useDecorator = () => {
    return useSWR(decoratorEndepunkt, getAPIwithSchema(DecoratorSchema));
};

const decoratorMock: DecoratorDTO = {
    ident: 'Z994320',
    navn: 'F_Z994320 E_Z994320',
    fornavn: 'F_Z994320',
    etternavn: 'E_Z994320',
    enheter: [
        {
            enhetId: '1001',
            navn: 'NAV Kristiansand',
        },
        {
            enhetId: '1621',
            navn: 'NAV Ørland',
        },
    ],
};

export const decoratorMockMsw = http.get(decoratorEndepunkt, (_) =>
    HttpResponse.json(decoratorMock)
);
