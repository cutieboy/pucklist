const Joi = require('@hapi/joi')
const validate = require('joi-validate-patch')

const playerPatchValidation = (reqBody) => {
    const schema = Joi.object({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().min(6).required().email(),
        phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        status: Joi.string(),
        number: Joi.string().min(1).max(2).required()
    })

    return schema.validate(reqBody)
}

module.exports.playerPatchValidation = playerPatchValidation