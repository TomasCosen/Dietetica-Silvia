import chai from "chai";
import mongoose from "mongoose";
import supertest from "supertest";
import { __dirname } from "../src/path.js";

const expect = chai.expect;

await mongoose.connect(
  `mongodb+srv://tomascosentino123:vFB3E6yt554v8CUN@cluster0.we7yzrs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
);

const requester = supertest("http://localhost:8080");

describe("Rutas de sesiones de usuarios (Register, Login, Current)", function () {
  let cookie = {};

  beforeEach(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  });
  it("Ruta: /api/session/register con el metodo POST", async () => {
    const newUser = {
      first_name: "Jhon",
      last_name: "Doe",
      email: "jhon@jhon.com",
      password: "jhon1234",
      age: 30,
    };
    const { _body, statusCode } = await requester
      .post("/api/session/register")
      .send(newUser);
    expect(statusCode).to.be.equal(200);
    expect(_body).to.have.property("status");
  });

  it("Ruta: /api/session/login con el metodo POST", async () => {
    const newUser = {
      email: "jhon@jhon.com",
      password: "jhon1234",
    };
    const result = await requester.post("/api/session/login").send(newUser);
    const cookieResult = result.headers["set-cookie"][0];
    cookie = {
      name: cookieResult.split("=")[0],
      value: cookieResult.split("=")[1].split(";")[0],
    };
    expect(cookie.name).to.be.ok.and.equal("coderhouse");
    expect(cookie.value).to.be.ok;
  });

  it("Ruta: /api/session/current con el metodo GET", async () => {
    const response = await requester
      .get("/api/session/current")
      .set("Cookie", [`${cookie.name}=${cookie.value}`]);
    expect(response.body).to.have.property("status");
    expect(response.body).to.have.property("payload");
  });
});
