import dotenv from "dotenv";
import Product from "../models/product.js";
import {productSchema} from "../validation/product"
dotenv.config();
export const getAll = async(req, res) => {
    try {
        const products = await Product.find()
        if(products.length === 0) {
            return res.status(400).json({
                message: "Danh sach san pham trong",
                datas: [],
            })
        }
        return res.status(200).json({
            message: "Lay danh sach san pham thanh cong",
            datas: [...products],
        })
    } catch (error) {
        res.status(500).send({
            message: error,
        })
    }
}

export const getDetail = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if(!product) {
            return res.status(400).json({
                message: "San pham khong ton tai",
                datas: [],
            })
        }

        return res.status(200).json(product)
    } catch (error) {
        res.status(500).json({
            message: "Loi server",
            datas: [],
        })
    }
}


export const create = async(req, res) => {
    try {
        const {error} = await productSchema.validate(req.body)
        if(error) {
            return res.status(400).json({
                message: error.details[0].message,
                datas: [],
            })
        }
        const product = await Product.create(req.body)
        if(!product) {
            return res.status(400).json({
                message: "Them san pham that bai",
                datas: [],
            })
        }
        return res.status(200).json({
            message: "Them san pham thanh cong",
            datas: [product],
        })
    } catch (error) {
        res.status(500).send({
            message: "Loi server",
            datas: [],
        })
    }
}


export const update = async(req, res) => {
    try {
        const {error} = await productSchema.validate(req.body)
        if(error) {
            return res.status(400).json({
                message: error.details[0].message,
                datas: [],
            })
        }
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        if(!product) {
            return res.status(400).json({
                message: "Cap nhat san pham that bai",
                datas: [],
            })
        }
        return res.status(200).json({
            message: "Cap nhat san pham thanh cong",
            datas: [product],
        })
    } catch (error) {
        res.status(500).send({
            message: "Loi server",
            data: [],
        })
    }
}


export const remove = async(req, res) => {
    try {
        const {error} = await productSchema.validate(req.body)
        if(error) {
            return res.status(400).json({
                message: error.details[0].message,
                datas: [],
            })
        }
        const product = await Product.findByIdAndDelete(req.params.id)
        if(!product) {
            return res.status(400).json({
                message: "Xoa san pham that bai",
                datas: [],
            })
        }
        return res.status(200).json({
            message: "Xoa san pham thanh cong",
            datas: [product],
        })
    } catch (error) {
        res.status(500).send({
            message: "Loi server",
            datas: [],
        })
    }
}
