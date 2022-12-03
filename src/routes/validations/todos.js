const Joi = require('joi')

module.exports.create = Joi.object({
    todo: Joi.string().required(),
    description: Joi.string(),
    completed:Joi.boolean()
})

module.exports.getSingleRecord = Joi.object({
  id:Joi.string().required(),
})
