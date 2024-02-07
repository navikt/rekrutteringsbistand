export function isValidUrl(input: string) {
    const pattern = new RegExp(
        '^(https?:\\/\\/)' + // protocol (requires http://or https://)
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,})' + // domain name
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$',
        'i'
    ); // fragment locater
    if (pattern.test(input)) {
        return true;
    }
    return false;
}

export function adjustUrl(url: string) {
    if (!url.startsWith('http')) {
        return `https://${url}`;
    }
    return url;
}
