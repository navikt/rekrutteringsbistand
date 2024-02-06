export const capitalizeFirstLetter = (inputString) => {
    const separators = [' ', '-'];

    if (inputString) {
        let capitalized = inputString.toLowerCase();

        for (let i = 0; i < separators.length; i += 1) {
            const fragments = capitalized.split(separators[i]);

            for (let j = 0; j < fragments.length; j += 1) {
                fragments[j] = fragments[j].charAt(0).toUpperCase() + fragments[j].substr(1);
            }
            capitalized = fragments.join(separators[i]);
        }
        return capitalized;
    }
    return inputString;
};

export const ordToCorrectCase = (ord, listeMedUpperCaseOrd, listeMedLowerCaseOrd) => {
    if (listeMedUpperCaseOrd.includes(ord)) {
        return ord.toUpperCase();
    } else if (!listeMedLowerCaseOrd.includes(ord)) {
        if (ord[0] !== undefined) {
            return ord[0].toUpperCase() + ord.substr(1);
        }
    }
    return ord;
};

export const capitalizeEmployerName = (employerName) => {
    const separators = [' ', '-', '(', '/'];

    const lowerCaseOrd = ['i', 'og', 'for', 'på', 'avd', 'av'];

    const upperCaseOrd = ['as', 'ab', 'asa', 'ba', 'sa'];

    if (employerName) {
        let text = employerName.toLowerCase();

        for (let i = 0; i < separators.length; i += 1) {
            const fragments = text.split(separators[i]);
            for (let j = 0; j < fragments.length; j += 1) {
                fragments[j] = ordToCorrectCase(fragments[j], upperCaseOrd, lowerCaseOrd);
            }
            text = fragments.join(separators[i]);
        }

        return text;
    }
    return employerName;
};
