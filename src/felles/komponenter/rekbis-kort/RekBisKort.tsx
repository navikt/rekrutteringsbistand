import { Panel } from '@navikt/ds-react';
import * as React from 'react';
import css from './RekBisKort.module.css';
export interface IRekBisKort {
    header?: React.ReactNode | undefined;
    children?: React.ReactNode | undefined;
    footer?: React.ReactNode | undefined;
}

const RekBisKort: React.FC<IRekBisKort> = ({ header, children, footer }) => {
    return (
        <Panel border className={css.info}>
            {header}
            {children}
            {footer}
        </Panel>
    );
};

export default RekBisKort;
