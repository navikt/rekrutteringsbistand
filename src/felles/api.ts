export const api = {
    innloggetBruker: '/meg',
    statistikk: '/statistikk',
    stillingssøk: '/stillingssok-proxy',
    stilling: '/stilling-api',
    sms: '/sms-api',
    synlighet: '/synlighet-api',
    kandidat: '/kandidat-api',
    kandidatsøk: '/kandidatsok-proxy',
    forespørselOmDelingAvCv: '/foresporsel-om-deling-av-cv-api',
};

export const videresendTilInnlogging = () => {
    window.location.href = `/oauth2/login?redirect=${window.location.pathname}`;
};
