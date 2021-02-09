const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateUpdateInput(data) {
    let errors = {};

    data.password = !isEmpty(data.password) ? data.password : '';
    data.city = !isEmpty(data.city) ? data.city : '';
    data.adress = !isEmpty(data.adress) ? data.adress : '';
    data.number = !isEmpty(data.number) ? data.number : '';

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

    return {
        errors,
        isValid: isEmpty(errors)
    }
}