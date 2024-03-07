const basePath = import.meta.env.VITEST ? 'http://localhost:3000' : '';

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
