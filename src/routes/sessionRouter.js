import { Router } from "express";
import passport from "passport";
import {
  login,
  register,
  sessionGithub,
  logout,
  current,
  testJWT,
} from "../controllers/sessionController.js";
import { authRequired } from "../config/validateToken.js";

const sessionRouter = Router();

sessionRouter.post("/login", passport.authenticate("login"), login);

sessionRouter.post("/register", passport.authenticate("register"), register);

sessionRouter.get("/current", authRequired, current);

sessionRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);
sessionRouter.get(
  "/githubSession",
  passport.authenticate("github"),
  sessionGithub
);

sessionRouter.post("/logout", logout);

sessionRouter.get(
  "/testJWT",
  passport.authenticate("jwt", { session: false }),
  testJWT
);
export default sessionRouter;
