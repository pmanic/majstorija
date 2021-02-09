const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    //prvo ovde prolazi pa onda dole u if upada data
    data.username = !isEmpty(data.username) ? data.username : ''; //preko one nase funkcije proveravamo prvo pa ako je stvarno empty postane prazan objekat
    data.password = !isEmpty(data.password) ? data.password : '';

    //username
    if (Validator.isEmpty(data.username)) {
        errors.username = "Korisnicko ime polje ne sme biti prazno!";
    }

    //password
    if (Validator.isEmpty(data.password)) {
        errors.password = "Lozinka polje ne sme biti prazno!";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}