const forespørselApi = '/foresporsel-om-deling-av-cv-api';

export const forespørselEndepunkter = {
    statistikk: (param?: URLSearchParams) =>
        `${forespørselApi}/statistikk${param ? `?${param}` : ''}`,
};
