const basePath = import.meta.env.VITEST ? 'http://localhost:3000' : '';

export const getAPI = async (url: string) => {
    try {
        const response = await fetch(basePath + url, {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Feil respons fra server');
        }
    } catch (e) {
        throw e;
    }
};

export const postApi = async (url: string, body: any) => {
    const response = await fetch(basePath + url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Feil respons fra server');
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
