const generatePassword = require('./generator');
const { encrypt, decrypt } = require('./crypto');

module.exports = {
  encrypt,
  decrypt,
  generatePassword,
};
