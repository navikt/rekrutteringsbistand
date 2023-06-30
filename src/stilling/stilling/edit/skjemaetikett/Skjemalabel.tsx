import { FunctionComponent, ReactNode } from 'react';
import { BodyShort, Label } from '@navikt/ds-react';
import css from './Skjemalabel.module.css';

type Props = {
    påkrevd?: boolean;
    inputId?: string;
    beskrivelse?: string;
    etterLabel?: ReactNode;
    children?: ReactNode;
};

const Skjemalabel: FunctionComponent<Props> = ({
    inputId,
    påkrevd,
    beskrivelse,
    children,
    etterLabel,
}) => {
    return (
        <div className={css.wrapper}>
            <label htmlFor={inputId}>
                <Label as="span">{children}</Label>
                {påkrevd && <BodyShort as="span"> (må fylles ut)</BodyShort>}
            </label>
            {etterLabel}
            {beskrivelse && (
                <BodyShort size="small" id={`${inputId}-beskrivelse`}>
                    {beskrivelse}
                </BodyShort>
            )}
        </div>
    );
};

export default Skjemalabel;
