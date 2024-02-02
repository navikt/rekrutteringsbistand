const statistikkApi = '/statistikk-api';

export const statistikkEndepunkter = {
    statistikk: (param?: URLSearchParams) =>
        `${statistikkApi}/statistikk${param ? `?${param}` : ''}`,
};
