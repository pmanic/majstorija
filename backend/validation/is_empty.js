//pravimo globalnu funkciju za proveravanje da li je nesto prazno,
//jer uz validator mozemo da proveravamo samo stringove, a nama treba
//provera da li je objekat prazan, pa zato moramo da napravimo sami funkciju

const isEmpty = (value) =>
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0);


module.exports = isEmpty;