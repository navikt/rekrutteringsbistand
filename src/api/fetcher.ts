import { z, ZodSchema } from 'zod';

const basePath = import.meta.env.VITEST ? 'http://localhost:3000' : '';

export const getAPIwithSchema = <T>(schema: ZodSchema<T>): ((url: string) => Promise<T>) => {
    return async (url: string) => {
        const data = getAPI(url);
        return schema.parse(data);
    };
};

export const getAPI = async (url: string) => {
    const response = await fetch(basePath + url, {
        method: 'GET',
        credentials: 'include',
    });

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error(`Feil respons fra server (http-status: ${response.status})`);
    }
};

export const postApi = async (url: string, body: any, queryParams?: URLSearchParams) => {
    if (queryParams) {
        const queryString = new URLSearchParams(queryParams).toString();
        url += `?${queryString}`;
    }

    const response = await fetch(basePath + url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body, (_key, value) => (value instanceof Set ? [...value] : value)),
    });

    if (response.ok) {
        return await response.json();
    } else if (response.status === 404) {
        throw new Error('404');
    } else if (response.status === 403) {
        throw new Error('403');
    } else {
        throw new Error(`Feil respons fra server (http-status: ${response.status})`);
    }
};

export const postApiResponse = (url: string, body: any) =>
    fetch(basePath + url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

export type postApiProps = {
    url: string;
    body: any;
};

const esResponseDto = z.object({
    hits: z.object({
        hits: z.array(
            z.object({
                _source: z.any(),
            })
        ),
    }),
});
export const postApiWithSchemaEs = <T>(
    schema: ZodSchema<T>
): ((props: postApiProps) => Promise<T>) => {
    return async (props) => {
        const data: any = await postApi(props.url, props.body);
        const parsedData = esResponseDto.parse(data);
        return schema.parse(parsedData.hits.hits[0]._source);
    };
};

export const postApiWithSchema = <T>(
    schema: ZodSchema<T>
): ((props: postApiProps) => Promise<T>) => {
    return async (props) => {
        const data = await postApi(props.url, props.body);
        return schema.parse(data);
    };
};
