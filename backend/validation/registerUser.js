const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    //prvo ovde prolazi pa onda dole u if upada data
    data.username = !isEmpty(data.username) ? data.username : ''; //preko one nase funkcije proveravamo prvo pa ako je stvarno empty postane prazan objekat
    data.password = !isEmpty(data.password) ? data.password : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.name = !isEmpty(data.name) ? data.name : '';
    data.surname = !isEmpty(data.surname) ? data.surname : '';
    data.city = !isEmpty(data.city) ? data.city : '';
    data.adress = !isEmpty(data.adress) ? data.adress : '';
    data.number = !isEmpty(data.number) ? data.number : '';
    data.gender = !isEmpty(data.gender) ? data.gender : '';
    data.role = !isEmpty(data.role) ? data.role : '';

    //username
    if (!Validator.isLength(data.username, { min: 3, max: 20 })) {
        errors.username = "Korisnicko ime mora biti izmedju 3 i 20 karaktera!";
    }

    if (Validator.isEmpty(data.username)) {
        errors.username = "Korisnicko ime polje ne sme biti prazno!";
    }

    //password
    if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
        errors.password = "Lozinka mora biti izmedju 6 i 20 karaktera!";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Lozinka polje ne sme biti prazno!";
    }

    //gender
    if (Validator.isEmpty(data.gender)) {
        errors.gender = "Pol polje ne sme biti prazno!";
    }

    //email
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Unesite ispravno email adresu!';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email polje ne sme biti prazno!";
    }

    //name
    if (Validator.isEmpty(data.name)) {
        errors.name = "Ime polje ne sme biti prazno!";
    }

    //surname
    if (Validator.isEmpty(data.surname)) {
        errors.surname = "Prezime polje ne sme biti prazno!";
    }

    //city
    if (Validator.isEmpty(data.city)) {
        errors.city = "Grad polje ne sme biti prazno!";
    }

    //adress
    if (Validator.isEmpty(data.adress)) {
        errors.adress = "Adresa polje ne sme biti prazno!";
    }

    //number
    if (Validator.isEmpty(data.number)) {
        errors.number = "Broj polje ne sme biti prazno!";
    }

    //role
    if (Validator.isEmpty(data.role)) {
        errors.role = "Morate izabrati tip korisnika!";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}