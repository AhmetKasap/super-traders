const joi = require('joi')
const APIError = require('../../utils/Error')

const shareValidation = async (req, res, next) => {
  try {
    const schema = joi.object({
      name: joi.string().min(3).max(50).required().trim(), 
      symbol: joi.string().length(3).uppercase().required()
        .messages({
          "string.length": "\"symbol\" must be exactly 3 characters long",
          "string.uppercase": "\"symbol\" must contain only uppercase letters"
        }),
      price: joi.number().precision(2).positive().required()
        .messages({
          "number.precision": "\"price\" must have up to 2 decimal places",
          "number.positive": "\"price\" must be a positive number"
        }),
      quantity: joi.number().integer().min(1).required()
        .messages({
          "number.min": "\"quantity\" must be at least 1",
          "number.integer": "\"quantity\" must be an integer"
        })
    })

    await schema.validateAsync(req.body)
    next()

  } catch (error) {
    throw new APIError(error.details[0].message, 400);

  }
};

module.exports = {
  shareValidation,
}
