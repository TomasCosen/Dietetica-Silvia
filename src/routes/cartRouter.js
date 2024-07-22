import { Router } from "express";
import passport from "passport";
import {
  createCart,
  getCart,
  insertProductCart,
  createTicket,
  getAllCarts,
  updateCart,
} from "../controllers/cartController.js";
import { authRequired } from "../config/validateToken.js";

const cartRouter = Router();

cartRouter.get("/", getAllCarts);
cartRouter.post("/", createCart);
cartRouter.get("/:cid", getCart);

cartRouter.post("/:cid/:pid", authRequired, insertProductCart);

cartRouter.put("/:cid", authRequired, updateCart);

cartRouter.get("/purchase/:cid", authRequired, createTicket);

export default cartRouter;
