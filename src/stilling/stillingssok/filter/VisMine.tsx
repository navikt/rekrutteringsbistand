import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import * as React from 'react';
import useInnloggetBruker from '../../../felles/hooks/useBrukerensIdent';
import useNavigering from '../useNavigering';
import { QueryParam, hentSøkekriterier, oppdaterUrlMedParam } from '../utils/urlUtils';

export interface IVisMine {
    children?: React.ReactNode | undefined;
}

const VisMine: React.FC<IVisMine> = ({ children }) => {
    const { searchParams, navigate } = useNavigering();
    const innloggetBruker = useInnloggetBruker();
    const valgt = hentSøkekriterier(searchParams).visMine;
    const valgtVerdi = Array.from(valgt).join(', ');

    const onOppdater = (visMine: boolean) =>
        oppdaterUrlMedParam({
            searchParams,
            navigate,
            parameter: QueryParam.VisMine,
            verdi: visMine ? innloggetBruker : null,
        });

    return (
        <CheckboxGroup legend="Visning" value={[valgtVerdi]}>
            <Checkbox
                value={innloggetBruker}
                disabled={!innloggetBruker}
                onChange={(e) => onOppdater(e.target.checked)}
            >
                Vis kun mine
            </Checkbox>
        </CheckboxGroup>
    );
};

export default VisMine;
