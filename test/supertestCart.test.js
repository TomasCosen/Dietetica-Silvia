import chai from "chai";
import mongoose from "mongoose";
import supertest from "supertest";
import { __dirname } from "../src/path.js";

const expect = chai.expect;

await mongoose.connect(
  `mongodb+srv://tomascosentino123:vFB3E6yt554v8CUN@cluster0.we7yzrs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
);

const requester = supertest("http://localhost:8080");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("Test CRUD de Carrito en la ruta api/cart", function () {
  let cookie = {};
  let cartId;

  before(async () => {
    const userAdmin = {
      email: "jhon@jhon.com",
      password: "jhon1234",
    };
    const userUser = {
      email: "tomas@tomas.com",
      password: "tomas1234",
    };
    const result = await requester.post("/api/session/login").send(userUser);
    const cookieResult = result.headers["set-cookie"][0];
    cookie = {
      name: cookieResult.split("=")[0],
      value: cookieResult.split("=")[1].split(";")[0],
    };
  });

  it("Ruta: api/cart con el método POST para crear un carrito", async () => {
    const response = await requester
      .post("/api/cart")
      .set("Cookie", [`${cookie.name}=${cookie.value}`]);
    cartId = response._body._id;
    expect(response.status).to.be.equal(201);
    expect(response.body).to.have.property("_id");
  });

  it("Ruta: api/cart/:cid con el método GET para obtener el carrito", async () => {
    const response = await requester
      .get(`/api/cart/${cartId}`)
      .set("Cookie", [`${cookie.name}=${cookie.value}`]);
    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property("_id");
  });

  it("Ruta: api/cart/:cid/:pid con el método POST para insertar un producto en el carrito", async () => {
    const productResponse = await requester.get("/api/products");
    const products = productResponse._body.docs;
    const product = products.find((p) => p.title === "Arroz");

    const productId = product._id;
    const response = await requester
      .post(`/api/cart/${cartId}/${productId}`)
      .send({ quantity: 5 })
      .set("Cookie", [`${cookie.name}=${cookie.value}`]);
    expect(response.status).to.be.equal(200);

    await delay(500);

    const cartResponse = await requester
      .get(`/api/cart/${cartId}`)
      .set("Cookie", [`${cookie.name}=${cookie.value}`]);
    expect(cartResponse._body.products).to.be.an("array").that.is.not.empty;
  });
});
