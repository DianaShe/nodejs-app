const Joi = require("joi");
const subscriptionTypes = require("../../constants/subscriptionTypes");

const updateSubscriptionSchema= Joi.object({
  subscription: Joi.string().valid(...Object.values(subscriptionTypes)).required()
})

module.exports = updateSubscriptionSchema
