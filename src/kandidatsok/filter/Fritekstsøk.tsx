import { Search } from '@navikt/ds-react';
import { FormEventHandler, FunctionComponent, useContext, useState } from 'react';
import { ØktContext } from '../Økt';
import css from './Fritekstsøk.module.css';

const Fritekstsøk: FunctionComponent = () => {
    const { forrigeØkt, setØkt } = useContext(ØktContext);
    const [fritekstSøk, setFritekstSøk] = useState(forrigeØkt.fritekst ?? '');

    const onClear = () => {
        setØkt({ fritekst: '' });
    };

    const onFormSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        setØkt({ fritekst: fritekstSøk });
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
