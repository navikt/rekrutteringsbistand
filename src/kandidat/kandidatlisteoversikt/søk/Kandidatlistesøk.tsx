import { Search } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import css from './Kandidatlistesøk.module.css';

type Props = {
    søkeOrd?: string;
    onSøkeOrdChange: (event: string) => void;
    onSubmitSøkKandidatlister?: any;
    nullstillSøk: () => void;
};

const Kandidatlistesøk: FunctionComponent<Props> = ({
    søkeOrd,
    onSøkeOrdChange,
    onSubmitSøkKandidatlister,
    nullstillSøk,
}) => (
    <form className={css.søkeskjema} onSubmit={onSubmitSøkKandidatlister}>
        <Search
            hideLabel={true}
            label="Søk i kandidatlister"
            placeholder="Søk i kandidatlister"
            onChange={onSøkeOrdChange}
            value={søkeOrd}
            onClear={nullstillSøk}
        />
    </form>
);

export default Kandidatlistesøk;
