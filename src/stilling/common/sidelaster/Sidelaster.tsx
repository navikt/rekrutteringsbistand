import { Loader, LoaderProps } from '@navikt/ds-react';
import classNames from 'classnames';
import css from './Sidelaster.module.css';

const Sidelaster = ({ size, className }: LoaderProps) => (
    <div className={classNames(css.wrapper, className)}>
        <Loader size={size ?? '2xlarge'} />
    </div>
);

export default Sidelaster;
