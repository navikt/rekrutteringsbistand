import { Search } from '@navikt/ds-react';
import { FormEventHandler, FunctionComponent, useContext, useState } from 'react';
import { ØktContext } from '../Økt';
import css from './Fritekstsøk.module.css';

const Fritekstsøk: FunctionComponent = () => {
    const { kandidatFritekstSøk, setKandidatFritekstSøk } = useContext(ØktContext);
    const [fritekstSøk, setFritekstSøk] = useState(kandidatFritekstSøk ?? '');

    const onClear = () => {
        setKandidatFritekstSøk(null);
    };

    const onFormSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        setKandidatFritekstSøk(fritekstSøk);
    };

    return (
        <form className={css.søk} role="search" onSubmit={onFormSubmit}>
            <Search
                label="Søk i kandidater"
                hideLabel={true}
                type="text"
                value={fritekstSøk}
                placeholder="Søk i kandidater"
                onChange={setFritekstSøk}
                onClear={onClear}
            />
        </form>
    );
};

export default Fritekstsøk;
