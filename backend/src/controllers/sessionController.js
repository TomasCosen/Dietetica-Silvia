import passport from "passport";
import jwt from "jsonwebtoken";
import varenv from "../dotenv.js";

export const login = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("Usuario o contraseña no validos");
    }
    const token = jwt.sign({ user: req.user }, varenv.jwt_secret, {
      expiresIn: "1h",
    });
    res.status(200).cookie(varenv.jwt_secret, token).send({
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
export const logout = async (req, res) => {
  req.session.destroy(function (e) {
    if (e) {
      console.log(e);
    } else {
      res.status(200).redirect("/");
    }
  });
};
export const current = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("No autorizado");
    }
    res.status(200).send({ status: "success", payload: req.user });
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
