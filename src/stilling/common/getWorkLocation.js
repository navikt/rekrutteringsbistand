import capitalizeLocation from '../stilling/edit/arbeidssted/capitalizeLocation';

export function getTruncatedWorkLocation(locationList) {
    let workLocation = null;
    if (locationList && locationList.length > 0) {
        const location = locationList[0];
        if (location.city) {
            workLocation = capitalizeLocation(location.city);
        } else if (location.municipal) {
            workLocation = `${capitalizeLocation(location.municipal)}`;
        } else if (location.county) {
            workLocation = `${capitalizeLocation(location.county)}`;
        } else if (location.country) {
            workLocation = `${capitalizeLocation(location.country)}`;
        }

        if (locationList.length > 1) {
            workLocation += '...';
        }
    }
    return workLocation;
}

export function getWorkLocationsAsString(locationList) {
    const workLocations = [];
    if (!locationList) {
        return workLocations;
    }

    for (let i = 0; i < locationList.length; i += 1) {
        if (locationList[i].postalCode) {
            let tmp = locationList[i].address ? `${locationList[i].address}, ` : '';
            tmp += `${locationList[i].postalCode} ${capitalizeLocation(locationList[i].city)}`;
            workLocations.push(tmp);
        } else if (locationList[i].municipal) {
            workLocations.push(capitalizeLocation(locationList[i].municipal));
        } else if (locationList[i].county) {
            workLocations.push(capitalizeLocation(locationList[i].county));
        } else if (locationList[i].country) {
            workLocations.push(capitalizeLocation(locationList[i].country));
        }
    }

    const locationString = workLocations.join(', ');
    return locationString;
}
