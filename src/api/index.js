const express = require('express');
const info = require('./info');
const password = require('./password');
const health = require('./health');

const router = express.Router();

router.use('/', info);
router.use('/generate-password', password);
router.use('/health', health);

module.exports = router;
