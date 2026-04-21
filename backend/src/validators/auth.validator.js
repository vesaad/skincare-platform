const Joi = require('joi');

const registerSchema = Joi.object({
  email:     Joi.string().email().required().messages({
    'string.email': 'Email nuk është i vlefshëm',
    'any.required': 'Email është i detyrueshëm'
  }),
  password:  Joi.string().min(6).required().messages({
    'string.min': 'Fjalëkalimi duhet të ketë minimum 6 karaktere',
    'any.required': 'Fjalëkalimi është i detyrueshëm'
  }),
  firstName: Joi.string().min(2).required().messages({
    'any.required': 'Emri është i detyrueshëm'
  }),
  lastName:  Joi.string().min(2).required().messages({
    'any.required': 'Mbiemri është i detyrueshëm'
  })
});

const loginSchema = Joi.object({
  email:    Joi.string().email().required().messages({
    'string.email': 'Email nuk është i vlefshëm',
    'any.required': 'Email është i detyrueshëm'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Fjalëkalimi është i detyrueshëm'
  })
});

module.exports = { registerSchema, loginSchema };