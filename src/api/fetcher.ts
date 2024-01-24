export const hentApi = (url: string) => fetch(url).then((r) => r.json());

export const postApi = (url: string, body: any) =>
    fetch(url, { method: 'POST', body: JSON.stringify(body) }).then((r) => r.json());

export const postApiResponse = (url: string, body: any) =>
    fetch(url, { method: 'POST', body: JSON.stringify(body) });
