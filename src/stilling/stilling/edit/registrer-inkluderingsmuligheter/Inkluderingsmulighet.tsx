import { ChangeEvent, FunctionComponent, ReactNode } from 'react';

import {
    Tag,
    hentSubtagsForMulighetForDirektemeldtStilling,
    hentSubtagsForMulighetForEksternStilling,
} from '../../tags/hierarkiAvTags';
import Skjemalegend from '../skjemaetikett/Skjemalegend';
import { visningsnavnForRegistrering } from '../../tags/visningsnavnForTags';
import { CheckboxGroup, Checkbox } from '@navikt/ds-react';
import css from './Inkluderingsmulighet.module.css';

type Props = {
    tittel: string;
    eksternStilling?: boolean;
    inkluderingsmulighet: any;
    onTagChange: (event: ChangeEvent<HTMLInputElement>) => void;
    tagIsChecked: (tag: Tag) => boolean;
    hjelpetekst?: ReactNode;
    className?: string;
};

const Inkluderingsmulighet: FunctionComponent<Props> = ({
    tittel,
    eksternStilling,
    inkluderingsmulighet,
    tagIsChecked,
    onTagChange,
    hjelpetekst,
}) => {
    const subtags = eksternStilling
        ? hentSubtagsForMulighetForEksternStilling(inkluderingsmulighet)
        : hentSubtagsForMulighetForDirektemeldtStilling(inkluderingsmulighet);

    const formatterTittel = (tekst?: string) => {
        if (!tekst) return;
        const start = tekst.indexOf('(');
        if (start !== -1) {
            return (
                <>
                    {tekst.substring(0, start)} <br></br>
                    {tekst.substring(start)}
                </>
            );
        } else {
            return tekst;
        }
    };

    return (
        <CheckboxGroup
            legend={<Skjemalegend hjelpetekst={hjelpetekst}>{tittel}</Skjemalegend>}
            size="small"
            className={css.sjekkboksgruppe}
            value={subtags.filter((subtag) => tagIsChecked(subtag))}
        >
            {subtags.map((subtag) => (
                <Checkbox
                    key={subtag}
                    id={`tag.${subtag}-checkbox`}
                    value={subtag}
                    onChange={onTagChange}
                >
                    {formatterTittel(visningsnavnForRegistrering[subtag])}
                </Checkbox>
            ))}
        </CheckboxGroup>
    );
};

export default Inkluderingsmulighet;
