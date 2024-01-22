export const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const postFetcher = (url: string, body: any) =>
    fetch(url, { method: 'POST', body: JSON.stringify(body) }).then((r) => r.json());
