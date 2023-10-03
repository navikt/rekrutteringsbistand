import { Search } from '@navikt/ds-react';
import { FormEventHandler, FunctionComponent, useEffect, useState } from 'react';
import { FilterParam } from '../hooks/useQuery';
import useSøkekriterier from '../hooks/useSøkekriterier';
import css from './Fritekstsøk.module.css';

const Fritekstsøk: FunctionComponent = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();
    const [query, setQuery] = useState<string>(søkekriterier.fritekst || '');

    useEffect(() => {
        if (søkekriterier.fritekst === null) {
            setQuery('');
        }
    }, [søkekriterier]);

    const onSearchChange = (query: string) => {
        setQuery(query);
    };

    const onSearchApply = () => {
        setSearchParam(FilterParam.Fritekst, query.trim());
    };

    const onClear = () => {
        setSearchParam(FilterParam.Fritekst, null);
    };

    const onFormSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        onSearchApply();
    };

    return (
        <form className={css.søk} role="search" onSubmit={onFormSubmit}>
            <Search
                label="Søk i kandidater"
                hideLabel={true}
                type="text"
                value={query}
                placeholder="Søk i kandidater"
                onChange={onSearchChange}
                onClear={onClear}
            />
        </form>
    );
};

export default Fritekstsøk;
