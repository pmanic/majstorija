const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateUpdateInput(data) {
    let errors = {};

    //informations
    data.password = !isEmpty(data.password) ? data.password : '';
    data.city = !isEmpty(data.city) ? data.city : '';
    data.adress = !isEmpty(data.adress) ? data.adress : '';
    data.number = !isEmpty(data.number) ? data.number : '';
    data.hourbill = !isEmpty(data.hourbill) ? data.hourbill : '';
    data.website = !isEmpty(data.website) ? data.website : '';
    data.bio = !isEmpty(data.bio) ? data.bio : '';

    // -----------------------------------------------information-----------------------------------------------

    //password
    if (Validator.isEmpty(data.password)) {
        errors.password = "Lozinka polje ne sme biti prazno!";
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

    //hourbill
    if (Validator.isEmpty(data.hourbill)) {
        errors.hourbill = "Satnica polje ne sme biti prazno!";
    }

    //number
    if (Validator.isEmpty(data.website)) {
        errors.website = "Website polje ne sme biti prazno!";
    }

    //number
    if (Validator.isEmpty(data.bio)) {
        errors.bio = "Biografija polje ne sme biti prazno!";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}