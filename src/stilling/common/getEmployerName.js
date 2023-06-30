import capitalizeEmployerName from '../stilling/edit/endre-arbeidsgiver/capitalizeEmployerName';

export default function getEmployerName(ad) {
    if (ad.employer && ad.employer.name) {
        return capitalizeEmployerName(ad.employer.name);
    }
    if (ad.businessName) {
        return capitalizeEmployerName(ad.businessName);
    }
    // TODO: can be removed when properties.employer is deprecated
    if (ad.properties && ad.properties.employer) {
        return capitalizeEmployerName(ad.properties.employer);
    }
    return '';
}
