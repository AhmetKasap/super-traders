const joi = require('joi');
const APIError = require('../../utils/Error');

const tradeValidation = async (req, res, next) => {
  try {
    const schema = joi.object({
      shareId: joi.string().uuid().required()
        .messages({
          "string.uuid": "\"shareId\" must be a valid UUID"
        }),
      quantity: joi.number().integer().positive().required()
        .messages({
          "number.base": "\"quantity\" must be a number",
          "number.positive": "\"quantity\" must be a positive number",
          "number.integer": "\"quantity\" must be an integer"
        })
    });

    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    throw new APIError(error.details[0].message, 400);
  }
};

module.exports = {
  tradeValidation,
};
