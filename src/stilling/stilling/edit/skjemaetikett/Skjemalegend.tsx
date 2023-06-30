import React, { FunctionComponent, ReactNode } from 'react';
import { BodyShort, HelpText, Label } from '@navikt/ds-react';
import classnames from 'classnames';
import css from './Skjemalegend.module.css';

type Props = {
    påkrevd?: boolean;
    beskrivelse?: string;
    className?: string;
    hjelpetekst?: ReactNode;
    children?: ReactNode;
};

const Skjemalegend: FunctionComponent<Props> = ({ påkrevd, className, hjelpetekst, children }) => {
    return (
        <div className={classnames(css.skjemalegend, className)}>
            <Label as="span" size="small">
                {children}
            </Label>
            {påkrevd && (
                <BodyShort as="span" size="small">
                    (må fylles ut)
                </BodyShort>
            )}
            {hjelpetekst && <HelpText>{hjelpetekst}</HelpText>}
        </div>
    );
};

export default Skjemalegend;
