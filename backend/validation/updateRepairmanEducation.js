const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateEducationUpdateInput(data) {
  let errors = {};

  // education
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.to = !isEmpty(data.to) ? data.to : "";

  // -----------------------------------------------education-----------------------------------------------
  //school
  if (Validator.isEmpty(data.school)) {
    errors.school = "Polje ustanova ne sme biti prazno!";
  }

  //degree
  //if (Validator.isEmpty(data.degree)) {
  //errors.degree = "Polje diploma ne sme biti prazno!";
  //}

  //from
  if (Validator.isEmpty(data.from)) {
    errors.from = "Polje od ne sme biti prazno!";
  }

  //to
  //if (Validator.isEmpty(data.to)) {
  //errors.to = "Polje to ne sme biti prazno!";
  //}

  //description
  //if (Validator.isEmpty(data.description)) {
  //errors.description = "Polje opis ne sme biti prazno!";
  //}

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
