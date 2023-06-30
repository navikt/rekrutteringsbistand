import { useSelector } from 'react-redux';

import isJson from '../../../edit/praktiske-opplysninger/IsJson';
import {
    hentSubtagsForMulighetForEksternStilling,
    InkluderingsmulighetForEksternStilling,
} from '../../../tags/hierarkiAvTags';
import Inkluderingstags from './Inkluderingstags';

const VisInkuderingsmuligheterForEksternStilling = () => {
    const tagsString = useSelector((state: any) => state.adData?.properties.tags);

    const tags = tagsString !== undefined && isJson(tagsString) ? JSON.parse(tagsString) : [];

    const tagsForTilretteleggingsmuligheter = hentSubtagsForMulighetForEksternStilling(
        InkluderingsmulighetForEksternStilling.Tilrettelegging
    ).filter((subtag) => tags.includes(subtag));

    const tagsForStatligInkluderingsdugnad = hentSubtagsForMulighetForEksternStilling(
        InkluderingsmulighetForEksternStilling.StatligInkluderingsdugnad
    ).filter((subtag) => tags.includes(subtag));

    return (
        <>
            {tagsForTilretteleggingsmuligheter.length > 0 && (
                <Inkluderingstags
                    tittel="Arbeidsgiver ønsker å tilrettelegge"
                    tags={tagsForTilretteleggingsmuligheter}
                />
            )}
            {tagsForStatligInkluderingsdugnad.length > 0 && (
                <Inkluderingstags
                    tittel="Arbeidsgiver er del av:"
                    tags={tagsForStatligInkluderingsdugnad}
                />
            )}
        </>
    );
};

export default VisInkuderingsmuligheterForEksternStilling;
