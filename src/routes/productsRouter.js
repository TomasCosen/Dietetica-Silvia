import { Router } from "express";
import passport from "passport";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productsController.js";
import { authRequired } from "../config/validateToken.js";

const productsRouter = Router();

productsRouter.get("/", getProducts);

productsRouter.get("/:pid", getProduct);

productsRouter.post("/", authRequired, createProduct);

productsRouter.put("/:pid", authRequired, updateProduct);

productsRouter.delete("/:pid", authRequired, deleteProduct);

export default productsRouter;
