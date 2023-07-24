import express from "express";
const router = express.Router();
import { getAll, getDetail, create, update, remove } from "../controllers/product.js";

router.get("/", getAll);
router.get("/:id", getDetail);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;