import { Textarea, TextareaProps } from '@navikt/ds-react';
import classNames from 'classnames';
import css from './SensitivTextarea.module.css';
import SensitiveOrd from './SensitiveOrd';
import { hentSensitiveOrd } from './hentSensitiveOrd';

const SensitivTextarea = ({ className, ...textareaProps }: TextareaProps) => {
    const sensitiveOrdITekst = hentSensitiveOrd(textareaProps.value);

    return (
        <div className={classNames(className, css.sensitivTextarea)}>
            <Textarea {...textareaProps} />
            {sensitiveOrdITekst.length > 0 && <SensitiveOrd ord={sensitiveOrdITekst} />}
        </div>
    );
};

export default SensitivTextarea;
