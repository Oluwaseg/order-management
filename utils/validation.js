// utils/validation.js

import Joi from 'joi';

const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'Username cannot be empty',
    'string.min': 'Username must be at least 3 characters long',
    'string.max': 'Username must be at most 30 characters long',
    'any.required': 'Username is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password must be at least 6 characters long',
    'any.required': 'Password is required',
  }),
});

// Validation function for registration
export const validateRegister = (data) => {
  return userSchema.validate(data);
};

// Validation function for login
export const validateLogin = (data) => {
  return userSchema.validate(data);
};
