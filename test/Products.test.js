import mongoose from "mongoose";
import userModel from "../src/models/product.js";
import Assert from "assert";

const assert = Assert.strict;

await mongoose.connect(
  `mongodb+srv://tomascosentino123:vFB3E6yt554v8CUN@cluster0.we7yzrs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
);

describe("Test CRUD de los productos en la ruta /api/products", function () {
  before(() => {
    console.log("Comienza el test de CRUD");
  });

  beforeEach(() => {
    console.log("arranca test individual");
  });

  it("Obtener todos los productos mediante el metodo GET", async () => {
    const products = await userModel.find();

    assert.strictEqual(Array.isArray(products), true);
  });
  it("Obtener un producto dado su id mediante el metodo GET", async () => {
    const product = await userModel.findById("65ea8714a7f0b8549e4514ea");
    assert.ok(product._id);
  });

  /* it("Crear un producto mediante el metodo POST", async () => {
    const newProduct = {
      title: "Queso muzzarella",
      stock: 25,
      code: "Q1",
      price: "9500",
      category: "comida",
      description: "Rico pero no tan saludable",
    };

    const productCreated = await userModel.create(newProduct);

    assert.ok(productCreated._id);
  }); */

  /* it("Actualizar un producto dado un id mediante el metodo PUT", async () => {
    const updateProduct = {
      title: "Arroz",
      stock: 30,
    };

    const productUpdated = await userModel.findByIdAndUpdate(
      "65ea8714a7f0b8549e4514ea",
      updateProduct
    );
    assert.ok(productUpdated._id);
  }); */

  /* it("Eliminar un producto dado un id mediante el metodo DELETE", async () => {
    const rta = await userModel.findByIdAndDelete("6670d90fd9118a2d85534e3f");
    assert.strictEqual(typeof rta, "object");
  }); */
});
