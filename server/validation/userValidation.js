import joi from 'joi';
import generalValidation from './index';

const userValidation = {
  signup: (req, res, next) => {
    const schema = joi.object().keys({
      firstname: joi.string().required().min(3),
      lastname: joi.string().required().min(3),
      email: joi.string().email().required(),
      password: joi.string().required(),
      address: joi.string().required(),
      bio: joi.string().required(),
      occupation: joi.string().required(),
      expertise: joi.string().required(),
    });
    generalValidation(req.body, schema, res, next);
  },
  login: (req, res, next) => {
    const schema = joi.object().keys({
      email: joi.string().email().required(),
      password: joi.string().required(),
    });
    generalValidation(req.body, schema, res, next);
  },
  userId: (req, res, next) => {
    const schema = joi.object().keys({
      id: joi.number().required(),
    });
    generalValidation(req.params, schema, res, next);
  },
};

export default userValidation;
