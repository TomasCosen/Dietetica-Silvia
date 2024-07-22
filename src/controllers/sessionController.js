import passport from "passport";
import jwt from "jsonwebtoken";
import varenv from "../dotenv.js";
import { userModel } from "../models/user.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!req.user) {
      return res.status(401).send("Usuario o contraseña no validos");
    }
    const token = jwt.sign({ user: req.user }, varenv.jwt_secret, {
      expiresIn: "1d",
    });
    res.status(200).cookie("token", token).send({
      status: "success",
      message: "Usuario logueado correctamente",
    });
  } catch (e) {
    res.status(500).send("Error al loguear usuario", e);
  }
};

export const register = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send("Usuario ya existente en la aplicacion");
    }
    res.status(200).send({
      message: "Usuario creado correctamente",
      status: "success",
      payload: req.user,
    });
  } catch (e) {
    res.status(500).send("Error al registrar usuario");
  }
};
export const logout = (req, res) => {
  /* if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error al destruir la sesión:", err);
        res.status(500).send("Error al cerrar la sesión");
      } else {
        res
          .status(200)
          .cookie("token", "", {
            expires: new Date(0),
          })
          .redirect("/");
      }
    });
  } */
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};
export const current = async (req, res) => {
  try {
    const userFound = await userModel.findById(req.user.user._id);
    if (!userFound) return res.status(400).json({ message: "User not found" });
    return res.status(200).send({ status: "success", payload: userFound });
  } catch (e) {
    res.status(500).send("Error al obtener usuario actual");
  }
};
export const sessionGithub = async (req, res) => {
  req.session.user = {
    email: req.user.email,
    first_name: req.user.name,
  };
  res.redirect("/");
};
export const testJWT = async (req, res) => {
  if (req.user.rol == "user") {
    res.status(403).send("Usuario no autorizado");
  } else {
    res.status(200).send(req.user);
  }
};
