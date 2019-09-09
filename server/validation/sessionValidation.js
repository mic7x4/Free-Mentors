import joi from 'joi';
import generalValidator from './index';

const sessionValition = {
  createSession: (req, res, next) => {
    const schema = joi.object().keys({
      mentorId: joi.number().required(),
      menteeId: joi.number().required(),
      questions: joi.string().required().min(8),
      menteeEmail: joi.string().email().required(),
    });
    generalValidator(req.body, schema, res, next);
  },
  sessionId: (req, res, next) => {
    const schema = joi.object().keys({
      sessionId: joi.number().required(),
    });
    generalValidator(req.params, schema, res, next);
  },
};

export default sessionValition;
