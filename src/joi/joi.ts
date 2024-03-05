import Joi from "joi";
export const signupSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phoneNo: Joi.string().required(),
    username: Joi.string().required(),
    subscriptionDetail: Joi.object({
        subscriptionId: Joi.string(),
        subscriptionName: Joi.string(),
    })
})
export const medSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    date_of_packaging: Joi.string(),
});
export const profile=Joi.object({
    email: Joi.string().email().required(),
})