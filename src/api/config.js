const Joi = require('joi');

module.exports = {
  host: process.env.HOST || '',
  server: process.env.SERVER || '',
  password: {
    useEncrypt: process.env.USE_ENCRYPT === 'true' || false,
    defaults: {
      length: 16,
      numbers: true,
      symbols: true,
      lowercase: true,
      uppercase: true,
      excludeSimilarCharacters: true,
      exclude: '',
      strict: true
    },
    schema: Joi.object({
      length: Joi.number().required(),
      numbers: Joi.boolean(),
      symbols: Joi.boolean(),
      lowercase: Joi.boolean(),
      uppercase: Joi.boolean(),
      excludeSimilarCharacters: Joi.boolean(),
      exclude: Joi.string().allow(null, ''),
      strict: Joi.boolean()
    })
  },
  serviceInfo: {
    microservice: process.env.NAME || 'Password Generator Service',
    routes: [{
      path: '/api/v1/health',
      methods: ['GET'],
      description: 'Returns the health status of the service'
    }, {
      path: '/api/v1/info',
      methods: ['GET'],
      description: 'Returns useful information about the service'
    }, {
      path: '/api/v1/generate-password',
      methods: ['GET', 'POST'],
      description: '',
      schema: {
        POST: {
          length: 'Required, Integer, Length of password.',
          numbers: 'Boolean, Should the password contain numbers.',
          symbols: 'Boolean, Should the password contain symbols.',
          lowercase: 'Boolean, Should the password contain lowercase letters.',
          uppercase: 'Boolean, Should the password contain uppercase letters.',
          excludeSimilarCharacters: 'Boolean, Should the password exclude similar chars, like "i" and "l".',
          exclude: 'String, Characters that should be excluded from the password.',
          strict: 'Boolean, Should the password contain at least 1 character from each pool.'
        }
      }
    }, {
      path: '/api/v1/generate-password/schema',
      methods: ['GET'],
      description: 'Returns the schema for the generate-password POST endpoint.',
    }]
  }
};
