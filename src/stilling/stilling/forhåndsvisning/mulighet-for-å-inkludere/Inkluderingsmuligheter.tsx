import { FunctionComponent } from 'react';
import { BodyShort, Heading } from '@navikt/ds-react';

import {
    hentSubtagsForMulighetForDirektemeldtStilling,
    InkluderingsmulighetForDirektemeldtStilling,
    Tag,
} from '../../tags/hierarkiAvTags';
import { visningsnavnForRegistrering } from '../../tags/visningsnavnForTags';
import css from './MulighetForÅInkludere.module.css';

type Props = {
    registrerteTags: Tag[];
};

const Inkluderingsmuligheter: FunctionComponent<Props> = ({ registrerteTags }) => (
    <>
        <Tags
            tittel="Arbeidsgiver kan tilrettelegge for"
            alleTags={registrerteTags}
            inkluderingsmulighet={InkluderingsmulighetForDirektemeldtStilling.Tilrettelegging}
        />
        <Tags
            tittel="Arbeidsgiveren er åpen for kandidater som"
            alleTags={registrerteTags}
            inkluderingsmulighet={InkluderingsmulighetForDirektemeldtStilling.PrioriterteMålgrupper}
        />
        <Tags
            tittel="Arbeidsgiver er åpen for de som trenger"
            alleTags={registrerteTags}
            inkluderingsmulighet={
                InkluderingsmulighetForDirektemeldtStilling.TiltakEllerVirkemiddel
            }
        />
        <Tags
            tittel="Arbeidsgiver er del av"
            alleTags={registrerteTags}
            inkluderingsmulighet={
                InkluderingsmulighetForDirektemeldtStilling.StatligInkluderingsdugnad
            }
        />
    </>
);

const Tags = ({
    alleTags,
    tittel,
    inkluderingsmulighet,
}: {
    alleTags: Tag[];
    tittel: string;
    inkluderingsmulighet: InkluderingsmulighetForDirektemeldtStilling;
}) => {
    const tagsInnenMulighet = hentSubtagsForMulighetForDirektemeldtStilling(
        inkluderingsmulighet
    ).filter((tag) => alleTags.includes(tag));

    if (tagsInnenMulighet.length === 0) {
        return null;
    }

    return (
        <div className={css.inkluderingsmulighet}>
            <Heading level="4" size="small">
                {tittel}
            </Heading>
            <ul className={css.tagliste}>
                {tagsInnenMulighet.map((tag) => (
                    <BodyShort as="li" key={tag}>
                        {visningsnavnForRegistrering[tag]}
                    </BodyShort>
                ))}
            </ul>
        </div>
    );
};

export default Inkluderingsmuligheter;
