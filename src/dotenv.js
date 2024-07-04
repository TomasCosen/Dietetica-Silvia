import dotenv from "dotenv";

dotenv.config();

const varenv = {
  mongo_url: process.env.MONGO_BD_URL,
  cookies_secret: process.env.SESSION_SECRET,
  session_secret: process.env.COOKIE_SECRET,
  jwt_secret: process.env.JWT_SECRET,
  salt: parseInt(process.env.SALT),
  port: process.env.PORT,
  clientid: process.env.CLIENTID,
  clientsecret: process.env.CLIENTSECRET,
};

export default varenv;
