const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateExperienceUpdateInput(data) {
  let errors = {};

  // experience
  data.position = !isEmpty(data.position) ? data.position : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.years = !isEmpty(data.years) ? data.years : "";
  data.descriptionJob = !isEmpty(data.descriptionJob)
    ? data.descriptionJob
    : "";

  // -----------------------------------------------experience-----------------------------------------------
  //title
  if (Validator.isEmpty(data.position)) {
    errors.title = "Polje pozicija ne sme biti prazno!";
  }

  //company
  if (Validator.isEmpty(data.company)) {
    errors.company = "Polje kompanija ne sme biti prazno!";
  }

  //years
  if (Validator.isEmpty(data.years)) {
    errors.years = "Polje za broj godina ne sme biti prazno!!";
  }

  //description
  //if (Validator.isEmpty(data.descriptionJob)) {
  //errors.descriptionJob = "Polje opis ne sme biti prazno!";
  //}

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
