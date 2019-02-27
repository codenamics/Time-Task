const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateMonthInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.year = !isEmpty(data.year) ? data.year : '';

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if (Validator.isEmpty(data.year)) {
        errors.year = 'Year field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};