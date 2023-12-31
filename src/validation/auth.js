import Joi from "joi";
export const signupSchema = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "Name khong duoc bo trong",
        "any.required": "Name la truong bat buoc",
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Truong email khong duoc de trong",
        "string.email": "Email khong dung dinh dang",
        "any.required": "Truong email la truong bat buoc",
    }),
    password: Joi.string().required().min(6).messages({
        "any.empty": "Truong mat khau khong duoc de trong",
        "string.min": "Truong mat khau can co it nhat 6 ky tu",
        "any.required": "Truong mat khau la truong bat buoc",
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
        "any.empty": "Truong mat khau khong duoc de trong",
        "string.min": "Truong mat khau can co it nhat 6 ky tu",
        "any.required": "Truong mat khau la truong bat buoc",
        "any.valid": "Mat khau khong khop",
    }),
})

export const signinSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.empty": "Truong email khong duoc de trong",
        "string.email": "Email khong dung dinh dang",
        "any.required": "Truong email la truong bat buoc",
    }),
    password: Joi.string().required().min(6).messages({
        "any.empty": "Truong mat khau khong duoc de trong",
        "string.min": "Truong mat khau can co it nhat 6  ky tu",
        "any.required": "Truong mat khau la truong bat buoc",
    }),
})