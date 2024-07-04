import jwt from "jsonwebtoken";
import varenv from "../dotenv";

export const generateToken = (user) => {
  /*
        1°: Objeto de asociacion del token (Usuario)
        2°: Clave privada del cifrado
        3°: Tiempo de expiracion
    */
  const token = jwt.sign({ user }, varenv.jwt_secret, {
    expiresIn: "12h",
  });
  return token;
};
console.log(
  generateToken({
    _id: "6601cdf6788e10785afde9d5",
    first_name: "Tomás",
    last_name: "Cosentino",
    password: "$2b$12$wAiKD0MCTlnRACYtyaju1.wRILi7VrhcSsGORqOJskSfYN1dcf18m",
    age: 20,
    email: "admin@admin.com",
    rol: "user",
    cart_id: "65eaad7377b9e0652a86d7b7",
    __v: 0,
  })
);
