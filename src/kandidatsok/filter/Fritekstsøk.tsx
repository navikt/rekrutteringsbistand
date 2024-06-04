import { Search } from '@navikt/ds-react';
import { FormEventHandler, FunctionComponent, useContext, useState } from 'react';
import { KandidatSøkContext } from '../KandidatSøkContext';
import css from './Fritekstsøk.module.css';

const Fritekstsøk: FunctionComponent = () => {
    const { kandidatSøkØkt } = useContext(KandidatSøkContext);

    const [fritekstSøk, setFritekstSøk] = useState(kandidatSøkØkt?.forrigeØkt.fritekst ?? '');

    const onClear = () => {
        kandidatSøkØkt?.setØkt && kandidatSøkØkt.setØkt({ fritekst: '' });
    };

    const onFormSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        kandidatSøkØkt?.setØkt && kandidatSøkØkt.setØkt({ fritekst: fritekstSøk });
    };

    return (
        <form className={css.søk} role="search" onSubmit={onFormSubmit}>
            <Search
                label="Søk i kandidater"
                hideLabel={true}
                value={fritekstSøk}
                placeholder="Søk i kandidater"
                onChange={setFritekstSøk}
                onClear={onClear}
            />
        </form>
    );
};

export default Fritekstsøk;
