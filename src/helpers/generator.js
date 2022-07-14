const generator = require('generate-password');

function generatePassword(options) { return generator.generate(options); }

module.exports = generatePassword;
