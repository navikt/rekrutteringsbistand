import isJson from '../edit/praktiske-opplysninger/IsJson';
import { Tag } from './hierarkiAvTags';

export const TAG_HIERARCHY_SPACER = '__';

export const alleInkluderingstags = Object.values(Tag);

export const leggTilTagUnderRegistrering = (tags: Tag[], nyTag: Tag): Tag[] => {
    const nyTagErSubtag = nyTag.includes(TAG_HIERARCHY_SPACER);

    if (nyTagErSubtag) {
        const inkluderingsmulighet = nyTag.split(TAG_HIERARCHY_SPACER)[0] as Tag;

        if (!tags.includes(inkluderingsmulighet)) {
            tags.push(inkluderingsmulighet);
        }
    }

    return [...tags, nyTag];
};

export const fjernTagUnderRegistrering = (tags: Tag[], tagSomSkalFjernes: Tag): Tag[] => {
    const inkluderingsmulighet = tagSomSkalFjernes.split(TAG_HIERARCHY_SPACER)[0] as Tag;
    const erEnesteSubtagForInkluderingsmulighet =
        tags.filter((tag) => tag.startsWith(`${inkluderingsmulighet}${TAG_HIERARCHY_SPACER}`))
            .length === 1;

    if (erEnesteSubtagForInkluderingsmulighet) {
        const tagsUtenomInkluderingsmulighet = tags.filter((tag) => tag !== inkluderingsmulighet);
        const tagsUtenomTagSomSkalFjernes = tagsUtenomInkluderingsmulighet.filter(
            (tag) => tag !== tagSomSkalFjernes
        );

        return tagsUtenomTagSomSkalFjernes;
    }

    const tagsUtenomTagSomSkalFjernes = tags.filter((tag) => tag !== tagSomSkalFjernes);
    return tagsUtenomTagSomSkalFjernes;
};

export const leggTilTagIFilteret = (tags: Tag[], nyTag: Tag): Tag[] => [...tags, nyTag];

export const fjernTagFraFilteret = (tags: Tag[], tagSomSkalFjernes: Tag): Tag[] => {
    const erHovedtag = !tagSomSkalFjernes.includes(TAG_HIERARCHY_SPACER);

    if (erHovedtag) {
        const fjernSubtags = (tag: Tag) =>
            !tag.startsWith(`${tagSomSkalFjernes}${TAG_HIERARCHY_SPACER}`);
        tags = tags.filter(fjernSubtags);
    }

    return tags.filter((tag) => tag !== tagSomSkalFjernes);
};

export const fjernAlleInkluderingstags = (tags: Tag[]): Tag[] => {
    return tags.filter((tag) => !alleInkluderingstags.includes(tag));
};

export const tagsInneholderInkluderingsmuligheter = (tags?: string) => {
    if (tags == null) {
        return null;
    } else if (!isJson(tags)) {
        return false;
    }

    const parsedeTags: Tag[] = JSON.parse(tags!);
    return alleInkluderingstags.some((tag) => parsedeTags.includes(tag));
};
