import { InnloggetBruker } from '../../../api/frackend/hooks/useInnloggetBruker';
import { Portefølje } from '../../filter/porteføljetabs/PorteføljeTabs';

export const queryMedPortefølje = (portefølje: Portefølje, innloggetBruker: InnloggetBruker) => {
    if (portefølje === Portefølje.MineBrukere) {
        return [
            {
                term: {
                    veileder: (innloggetBruker.navIdent || '').toLowerCase(),
                },
            },
        ];
    } else if (portefølje === Portefølje.MittKontor) {
        return [
            {
                term: {
                    orgenhet: innloggetBruker.navKontor || '',
                },
            },
        ];
    } else {
        return [];
    }
};
