const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateZahtevInput(data) {
    let errors = {};

    data.scheduledDate = !isEmpty(data.scheduledDate) ? data.scheduledDate : '';
    data.scheduledFrom = !isEmpty(data.scheduledFrom) ? data.scheduledFrom : '';
    data.scheduledTo = !isEmpty(data.scheduledTo) ? data.scheduledTo : '';
    data.userMessage = !isEmpty(data.userMessage) ? data.userMessage : '';

    //scheduledDate
    if (Validator.isEmpty(data.scheduledDate)) {
        errors.scheduledDate = "Zakažite datum polje ne sme biti prazno!";
    }

    //scheduledFrom
    if (Validator.isEmpty(data.scheduledFrom)) {
        errors.scheduledFrom = "Zakažite od polje ne sme biti prazno!";
    }

    //scheduledTo
    if (Validator.isEmpty(data.scheduledTo)) {
        errors.scheduledTo = "Zakažite do polje ne sme biti prazno!";
    }

    //adress
    if (Validator.isEmpty(data.userMessage)) {
        errors.userMessage = "Opis problema polje ne sme biti prazno!";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}