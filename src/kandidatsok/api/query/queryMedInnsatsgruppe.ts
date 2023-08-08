import {
    Innsatsgruppe,
    Kvalifiseringsgruppe,
    Servicegruppe,
} from 'felles/domene/kandidat/Oppfølgingsinformasjon';
import { FiltrerbarInnsatsgruppe } from '../../filter/Jobbmuligheter';

export const queryMedInnsatsgruppe = (innsatsgrupper: Set<FiltrerbarInnsatsgruppe>) => {
    const kvalifiseringsgrupper = new Set(innsatsgrupper) as Set<
        Kvalifiseringsgruppe | FiltrerbarInnsatsgruppe
    >;

    if (kvalifiseringsgrupper.size === 0) {
        return [
            {
                terms: {
                    kvalifiseringsgruppekode: Object.values(Innsatsgruppe),
                },
            },
        ];
    }

    if (kvalifiseringsgrupper.has(FiltrerbarInnsatsgruppe.AndreInnsatsgrupper)) {
        Object.values(Servicegruppe).forEach((gruppe) => {
            kvalifiseringsgrupper.add(gruppe);
        });
    }

    return [
        {
            terms: {
                kvalifiseringsgruppekode: Array.from(kvalifiseringsgrupper),
            },
        },
    ];
};
