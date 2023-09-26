import { Panel } from '@navikt/ds-react';
import classNames from 'classnames';
import * as React from 'react';
import css from './RekBisKort.module.css';

export interface IRekBisKort {
    fremhevet?: boolean;
    header?: React.ReactNode | undefined;
    children?: React.ReactNode | undefined;
    footer?: React.ReactNode | undefined;
}

const RekBisKort: React.FC<IRekBisKort> = ({ header, children, footer, fremhevet }) => {
    return (
        <Panel border className={classNames(css.info, fremhevet && css.fremhevet)}>
            {header}
            {children}
            {footer}
        </Panel>
    );
};

export default RekBisKort;
