import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { Stillingskategori } from 'felles/domene/stilling/Stilling';
import { ChangeEvent, useEffect, useState } from 'react';
import useNavigering from '../../useNavigering';
import { QueryParam, hentSøkekriterier, oppdaterUrlMedParam } from '../../utils/urlUtils';

const kategorier = [
    Stillingskategori.Stilling,
    Stillingskategori.Jobbmesse,
    Stillingskategori.Formidling,
];

const VelgStillingskategori = () => {
    const { searchParams, navigate } = useNavigering();

    const [valgteKategorier, setValgteKategorier] = useState<Set<Stillingskategori>>(
        hentSøkekriterier(searchParams).stillingskategorier
    );

    useEffect(() => {
        setValgteKategorier(hentSøkekriterier(searchParams).stillingskategorier);
    }, [searchParams]);

    const onToggle = (event: ChangeEvent<HTMLInputElement>) => {
        const kategori = event.target.value as Stillingskategori;
        const kategorier = new Set<Stillingskategori>(valgteKategorier);

        if (event.target.checked) {
            kategorier.add(kategori);
        } else {
            kategorier.delete(kategori);
        }

        oppdaterUrlMedParam({
            searchParams,
            navigate,
            parameter: QueryParam.Stillingskategorier,
            verdi: Array.from(kategorier),
        });
    };

    return (
        <CheckboxGroup legend="Kategori" value={Array.from(valgteKategorier)}>
            {kategorier.map((kategori) => (
                <Checkbox key={kategori} value={kategori} onChange={onToggle}>
                    {stillingskategoriTilVisningsnavn(kategori)}
                </Checkbox>
            ))}
        </CheckboxGroup>
    );
};

export const stillingskategoriTilVisningsnavn = (kategori: Stillingskategori) => {
    switch (kategori) {
        case Stillingskategori.Stilling:
            return 'Standard';
        case Stillingskategori.Jobbmesse:
            return 'Jobbmesse';
        case Stillingskategori.Formidling:
            return 'Formidling';
    }
};

export default VelgStillingskategori;
