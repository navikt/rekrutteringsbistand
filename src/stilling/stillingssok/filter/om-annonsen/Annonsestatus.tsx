import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import useNavigering from '../../useNavigering';
import { QueryParam, hentSøkekriterier, oppdaterUrlMedParam } from '../../utils/urlUtils';

export enum Status {
    Publisert = 'publisert',
    Utløpt = 'utløpt',
    Stoppet = 'stoppet',
    // Utkast = 'utkast',
    // IkkePublisert = 'ikkePublisert',
}

const Annonsestatus: FunctionComponent = () => {
    const { searchParams, navigate } = useNavigering();

    const [valgteStatuser, setValgteStatuser] = useState<Set<Status>>(
        hentSøkekriterier(searchParams).statuser
    );

    useEffect(() => {
        setValgteStatuser(hentSøkekriterier(searchParams).statuser);
    }, [searchParams]);

    const onAnnonsestatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        const status = event.target.value as Status;
        const statuser = new Set<Status>(valgteStatuser);

        if (event.target.checked) {
            statuser.add(status);
        } else {
            statuser.delete(status);
        }

        oppdaterUrlMedParam({
            searchParams,
            navigate,
            parameter: QueryParam.Statuser,
            verdi: Array.from(statuser),
        });
    };

    return (
        <CheckboxGroup legend="Status" value={Array.from(valgteStatuser)}>
            {Object.values(Status).map((statusValue) => (
                <Checkbox key={statusValue} value={statusValue} onChange={onAnnonsestatusChange}>
                    {statusTilVisningsnavn(statusValue)}
                </Checkbox>
            ))}
        </CheckboxGroup>
    );
};

export const statusTilVisningsnavn = (status: Status) => {
    switch (status) {
        case Status.Publisert:
            return 'Publisert';
        case Status.Stoppet:
            return 'Stoppet';
        case Status.Utløpt:
            return 'Utløpt';
        // case Status.IkkePublisert:
        //     return 'Venter på publisering';
        // case Status.Utkast:
        //     return 'Utkast';
    }
};

export default Annonsestatus;
