const Validator = require("validator");
const validText = require("../utils/valid-text");

module.exports = function ValidateRegisterInput(data) {
  let errors = {};

  data.email = validText(data.email) ? data.email : ""; // Validate Email
  data.password = validText(data.password) ? data.password : ""; // Validate Password
  data.passwordConfirmation = validText(data.passwordConfirmation)
    ? data.passwordConfirmation
    : "";
  data.firstName = validText(data.firstName) ? data.firstName : "";
  data.lastName = validText(data.lastName) ? data.lastName : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is Required";
  }

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "You must provide a Name";
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "You must provide a Last Name";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "you must provide a password";
  }

  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = "you must provide a password confirmation";
  }

  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = "passwords must match";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isLength(data.age, { min: 18, max: 65 })) {
    errors.age = "age must be at least 18";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
