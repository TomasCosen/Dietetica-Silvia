import chai from "chai";
import mongoose from "mongoose";
import supertest from "supertest";
import { __dirname } from "../src/path.js";

const expect = chai.expect;

await mongoose.connect(
  `mongodb+srv://tomascosentino123:vFB3E6yt554v8CUN@cluster0.we7yzrs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
);

const requester = supertest("http://localhost:8080");

describe("Test CRUD de Productos en la runa api/products", function () {
  let cookie = {};
  let productId;
  before(async () => {
    //loguear al usuario:

    const loginUser = {
      email: "jhon@jhon.com",
      password: "jhon1234",
    };
    const result = await requester.post("/api/session/login").send(loginUser);
    const cookieResult = result.headers["set-cookie"][0];
    cookie = {
      name: cookieResult.split("=")[0],
      value: cookieResult.split("=")[1].split(";")[0],
    };
  });

  it("Ruta: api/products metodo GET", async () => {
    const { ok } = await requester.get("/api/products");
    expect(ok).to.be.ok;
  });

  it("Ruta: api/products metodo POST", async () => {
    const newProduct = {
      title: "Queso muzzarella",
      stock: 25,
      code: "Q1",
      price: "9500",
      category: "comida",
      description: "Rico pero no tan saludable",
    };
    const { statusCode, body } = await requester
      .post("/api/products")
      .set("Cookie", [`${cookie.name}=${cookie.value}`])
      .send(newProduct);
    productId = body._id;
    expect(statusCode).to.be.equal(201);
    expect(body).to.have.property("_id");
    expect(body.title).to.equal("Queso muzzarella");
  });

  it("Ruta: api/products metodo PUT", async () => {
    const updateProduct = {
      price: 10000,
    };
    const putResponse = await requester
      .put(`/api/products/${productId}`)
      .set("Cookie", [`${cookie.name}=${cookie.value}`])
      .send(updateProduct);
    expect(putResponse.statusCode).to.be.equal(200);

    const getResponse = await requester
      .get(`/api/products/${productId}`)
      .set("Cookie", [`${cookie.name}=${cookie.value}`]);
    expect(getResponse.statusCode).to.be.equal(200);
    expect(getResponse.body.price).to.equal(10000);
  });

  it("Ruta: api/products metodo DELETE", async () => {
    const deleteResponse = await requester
      .delete(`/api/products/${productId}`)
      .set("Cookie", [`${cookie.name}=${cookie.value}`]);
    expect(deleteResponse.statusCode).to.be.equal(200);

    const getResponse = await requester
      .get(`/api/products/${productId}`)
      .set("Cookie", [`${cookie.name}=${cookie.value}`]);
    expect(getResponse.statusCode).to.be.equal(404);
  });
});
