export const firstCharacterOfEachString = (name = '') =>
    name
        .split(' ')
        .map((element) => element[0])
        .join('')
