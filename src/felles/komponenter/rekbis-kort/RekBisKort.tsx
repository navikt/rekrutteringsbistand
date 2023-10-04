import { Panel } from '@navikt/ds-react';
import classNames from 'classnames';
import * as React from 'react';
import css from './RekBisKort.module.css';

type Props = {
    fremhevet?: boolean;
    header?: React.ReactNode | undefined;
    children?: React.ReactNode | undefined;
    footer?: React.ReactNode | undefined;
};

const RekBisKort = ({ header, children, footer, fremhevet }: Props) => {
    return (
        <Panel border className={classNames(css.info, fremhevet && css.fremhevet)}>
            {header}
            {children}
            {footer}
        </Panel>
    );
};

export default RekBisKort;
