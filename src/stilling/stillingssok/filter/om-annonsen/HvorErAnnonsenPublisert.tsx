import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { hentSøkekriterier, oppdaterUrlMedParam, QueryParam } from '../../utils/urlUtils';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import useNavigering from '../../useNavigering';

export enum Publisert {
    Intern = 'intern',
    Arbeidsplassen = 'arbeidsplassen',
}

const HvorErAnnonsenPublisert: FunctionComponent = () => {
    const { searchParams, navigate } = useNavigering();

    const [publiseringssteder, setPubliseringssteder] = useState<Set<Publisert>>(
        hentSøkekriterier(searchParams).publisert
    );

    useEffect(() => {
        setPubliseringssteder(hentSøkekriterier(searchParams).publisert);
    }, [searchParams]);

    const onPubliseringsstederChange = (event: ChangeEvent<HTMLInputElement>) => {
        const publiseringssted = event.target.value as Publisert;
        const nyePubliseringssteder = new Set<Publisert>(publiseringssteder);

        if (event.target.checked) {
            nyePubliseringssteder.add(publiseringssted);
        } else {
            nyePubliseringssteder.delete(publiseringssted);
        }

        oppdaterUrlMedParam({
            searchParams,
            navigate,
            parameter: QueryParam.Publisert,
            verdi: Array.from(nyePubliseringssteder),
        });
    };

    return (
        <CheckboxGroup legend="Synlighet" value={Array.from(publiseringssteder)}>
            {Object.values(Publisert).map((publisertValue) => (
                <Checkbox
                    key={publisertValue}
                    value={publisertValue}
                    onChange={onPubliseringsstederChange}
                >
                    {publisertTilVisningsnavn(publisertValue)}
                </Checkbox>
            ))}
        </CheckboxGroup>
    );
};

export const publisertTilVisningsnavn = (publisert: Publisert) => {
    switch (publisert) {
        case Publisert.Intern:
            return 'Internt i Nav';
        case Publisert.Arbeidsplassen:
            return 'På Arbeidsplassen';
    }
};

export default HvorErAnnonsenPublisert;
