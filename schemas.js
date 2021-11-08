const Joi = require('joi');

module.exports.stationSchema = Joi.object({
    station: Joi.object({
        location: Joi.string().required(),
        // image: Joi.string().required(),
        date: Joi.string().required(),
        train: Joi.string(),
        haveMap: Joi.boolean(),
        description: Joi.string(),
    }).required(),
    deleteImages: Joi.array()
});