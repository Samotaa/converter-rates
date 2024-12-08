export function getFlagClass(code) {
    const flags = {
        USD: 'fi fi-us',
        EUR: 'fi fi-eu',
        BYN: 'fi fi-by',
        PLN: 'fi fi-pl',
        RUB: 'fi fi-ru',
    };
    return flags[code] || ''
};