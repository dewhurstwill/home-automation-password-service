const express = require('express');
const { generatePassword, encrypt, decrypt } = require('../helpers');
const config = require('./config');

const router = express.Router();

router.get('/', (req, res) => {
  const { defaults: defaultOptions } = config.password;
  try {
    const password = generatePassword(defaultOptions);
    if (config.password.useEncrypt) {
      const encrypted = encrypt(password);
      return res.json({ encryptedPassword: encrypted });
    }

    return res.json({ generatedPassword: password });
  } catch (err) {
    return res.status(422).json({ message: err });
  }
});

router.get('/schema', (req, res) => res.json({ schema: config.serviceInfo.routes[2].schema.POST }));

router.post('/', async (req, res) => {
  const { defaults: defaultOptions, schema } = config.password;
  try {
    const options = await schema.validateAsync(req.body);
    const password = generatePassword({ ...defaultOptions, ...options });
    if (config.password.useEncrypt) {
      const encrypted = encrypt(password);
      return res.json({ encryptedPassword: encrypted });
    }
    return res.json({ generatedPassword: password });
  } catch (err) {
    if (err && err.details && err.details[0].message) {
      return res.status(422).json({
        schema: config.serviceInfo.routes[2].schema.POST,
        message: err.details[0].message
      });
    }
    return res.status(422).json({ message: err });
  }
});

router.post('/', async (req, res) => {
  const { defaults: defaultOptions, schema } = config.password;
  try {
    const options = await schema.validateAsync(req.body);
    const password = generatePassword({ ...defaultOptions, ...options });
    if (config.password.useEncrypt) {
      const encrypted = encrypt(password);
      return res.json({ encryptedPassword: encrypted });
    }
    return res.json({ generatedPassword: password });
  } catch (err) {
    if (err && err.details && err.details[0].message) {
      return res.status(422).json({
        schema: config.serviceInfo.routes[2].schema.POST,
        message: err.details[0].message
      });
    }
    return res.status(422).json({ message: err });
  }
});

router.post('/decrypt', async (req, res) => {
  try {
    const decrypted = decrypt(req.body.encryptedPassword);
    return res.json({ decryptedPassword: decrypted });
  } catch (err) {
    return res.status(422).json({ message: err });
  }
})

module.exports = router;
