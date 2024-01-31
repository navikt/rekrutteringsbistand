const kandidatSokApi = '/kandidatsok-api';

export const kandidatSøkEndepunkter = {
    lookupCv: `${kandidatSokApi}/api/lookup-cv`,
    kandidatsammendrag: `${kandidatSokApi}/api/kandidatsammendrag`,
    kandidatstillingssøk: `${kandidatSokApi}/api/kandidatsammendrag`, // TODO: Skal få eget stripped ned endepunkt
};
