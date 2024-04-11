import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { ChangeEvent, FunctionComponent, useContext, useEffect, useState } from 'react';
import { ApplikasjonContext } from '../../../../felles/ApplikasjonContext';
import { Rolle } from '../../../../felles/tilgangskontroll/TilgangskontrollForInnhold';
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
    const { harRolle } = useContext(ApplikasjonContext);

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

    const harTilgang = (status: Status): boolean => {
        if (status === Status.Publisert) {
            return true;
        }
        return harRolle([Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET]);
    };

    return (
        <CheckboxGroup legend="Status" value={Array.from(valgteStatuser)}>
            {Object.values(Status).map((statusValue) => (
                <Checkbox
                    key={statusValue}
                    value={statusValue}
                    onChange={onAnnonsestatusChange}
                    disabled={!harTilgang(statusValue)}
                >
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
