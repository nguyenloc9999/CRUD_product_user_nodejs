import {signupSchema, signinSchema} from "../validation/auth";
import User from "../models/user";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const {SECRET_CODE} = process.env;
export const signup = async(req, res) => {
    try {
        const {error} = signupSchema.validate(req.body);
        if(error) {
            return res.status(400).json({
                message: error.details[0].message,
            })
        }
        const {name, email, password} = req.body;
        const findEmail = await User.findOne({email});
        if(findEmail) {
            return res.status(400).json({
                message: "Email nay da duoc dang ky",
            })
        }
        const passwordhash = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: passwordhash,
        })
        user.password = undefined;
        return res.status(200).json({
            message: "Dang ky tai khoan thanh cong",
            user,
        })
    } catch (error) {
        return res.status(500).json({
            message: error,
        })
    }
}


export const signin = async(req, res) => {
    try {
        const {error} = signinSchema.validate(req.body);
        if(error) {
            return res.status(400).json({
                message: error.details[0].message,
            })
        }
        const { email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                message: "Tai khoan khong ton tai",
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({
                message: "Mat khau khong dung",
            })
        }
        const token = jwt.sign({id: user._id}, SECRET_CODE, {
        expiresIn: "1d"
        })
        user.password = undefined;
        return res.status(200).json({
            message: "Dang nhap thanh cong",
            accessToken: token,
            user,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Loi server",
        })
    }
}