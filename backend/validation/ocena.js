const isEmpty = require('./is_empty');
const Validator = require('validator');

module.exports = function validateOcenaInput(data) {
    let errors = {};
    data.rate = !isEmpty(data.rate) ? data.rate : '';

    if (Validator.isEmpty(data.rate)) {
        errors.rate = "Morate izabrati ocenu!";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}