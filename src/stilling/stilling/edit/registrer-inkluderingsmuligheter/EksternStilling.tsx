import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import isJson from '../praktiske-opplysninger/IsJson';
import { CHECK_TAG, UNCHECK_TAG } from '../../adDataReducer';
import { InkluderingsmulighetForEksternStilling } from '../../tags/hierarkiAvTags';
import Inkluderingsmulighet from './Inkluderingsmulighet';
import { Inkluderingsmulighet as AlleInkluderingsmuligheter } from '../../tags/hierarkiAvTags';
import { HjelpetekstForInkluderingsmulighet } from './HjelpetekstForInkluderingsmulighet';
import { Heading } from '@navikt/ds-react';

const EksternStilling = () => {
    const dispatch = useDispatch();

    const tags = useSelector((state: any) => state.adData?.properties.tags || '[]');

    const onTagChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const checked = e.target.checked;
        checked ? dispatch({ type: CHECK_TAG, value }) : dispatch({ type: UNCHECK_TAG, value });
    };

    const tagIsChecked = (tag: string) => tags && isJson(tags) && JSON.parse(tags).includes(tag);

    return (
        <div>
            <Heading level="2" size="small" spacing>
                Muligheter for inkludering
            </Heading>
            <Inkluderingsmulighet
                eksternStilling
                tittel="Arbeidsgiver ønsker å tilrettelegge"
                onTagChange={onTagChange}
                inkluderingsmulighet={InkluderingsmulighetForEksternStilling.Tilrettelegging}
                hjelpetekst={
                    <HjelpetekstForInkluderingsmulighet
                        inkluderingsmulighet={AlleInkluderingsmuligheter.Tilrettelegging}
                    />
                }
                tagIsChecked={tagIsChecked}
                className="blokk-s"
            />
            <Inkluderingsmulighet
                eksternStilling
                tittel="Arbeidsgiver er del av:"
                onTagChange={onTagChange}
                inkluderingsmulighet={
                    InkluderingsmulighetForEksternStilling.StatligInkluderingsdugnad
                }
                tagIsChecked={tagIsChecked}
                className="blokk-s"
            />
        </div>
    );
};

export default EksternStilling;
