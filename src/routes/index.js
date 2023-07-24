import express from "express";
import routerProduct from "./product";
import routerAuth from "./auth";

const router = express.Router();

router.use("/products", routerProduct);
router.use("/auth", routerAuth);

export default router;
