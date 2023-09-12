import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import { BodyLong, BodyShort, Textarea, TextareaProps } from '@navikt/ds-react';
import classNames from 'classnames';
import css from './SensitivTextarea.module.css';

const SensitivTextarea = ({ className, ...textareaProps }: TextareaProps) => {
    const sensitiveOrdITekst = sensitiveOrd.filter((sensitivtOrd) => {
        const regex = new RegExp(`\\s${sensitivtOrd.ord}\\s`);

        return regex.test(textareaProps.value);
    });

    return (
        <div className={classNames(className, css.sensitivTextarea)}>
            <Textarea {...textareaProps} />
            {sensitiveOrdITekst.length > 0 && (
                <div className={css.sensitiveOrd}>
                    <div className={css.overskrift}>
                        <ExclamationmarkTriangleIcon aria-hidden />
                        <BodyLong>
                            Vi fant {sensitiveOrdITekst.length + 1} ord som kan være sensitive
                        </BodyLong>
                    </div>
                    <ul>
                        {sensitiveOrdITekst.map((ord) => (
                            <li key={ord.ord}>
                                {ord.ord}{' '}
                                <BodyShort className={css.svartTekst} as="span">
                                    ({ord.kategori})
                                </BodyShort>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

type Kategori = 'helseopplysning' | 'ytelse';

const sensitiveOrd: Array<{ ord: string; kategori: Kategori }> = [
    {
        ord: 'rus',
        kategori: 'helseopplysning',
    },
    {
        ord: 'kvp',
        kategori: 'ytelse',
    },
];

export default SensitivTextarea;
