import { HttpException } from '../utils/HttpException.js';

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    const message = err.errors.map((error) => error.message).join(', ');
    next(new HttpException(400, message));
  }
};

export default validate;
