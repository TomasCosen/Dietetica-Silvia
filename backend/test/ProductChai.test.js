import mongoose from "mongoose";
import userModel from "../src/models/product.js";
import chai from "chai";
const expect = chai.expect;

await mongoose.connect(
  `mongodb+srv://tomascosentino123:vFB3E6yt554v8CUN@cluster0.we7yzrs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
);

describe("Test CRUD de productos en la ruta /api/products", function () {
  before(() => {
    console.log("Arrancando el test");
  });
  beforeEach(() => {
    console.log("Comienza el test!");
  });

  it("Obtener todos los productos mediante el metodo GET", async () => {
    const products = await userModel.find();

    //expect(products).equal([])
    //expect(Array.isArray(products)).to.be.ok //si es verdadero
    expect(products).not.to.be.deep.equal([]); //que el array solicitado no sea igual a un array vacio
    //expect(products).to.have.lengthOf(0);
  });

  it("Obtener un producto dado su id mediante el metodo GET", async () => {
    const product = await userModel.findById("65ea8714a7f0b8549e4514ea");
    expect(product).to.have.property("_id");
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

    expect(productCreated).to.have.property("_id");
  }); */

  /* it("Actualizar un producto dado un id mediante el metodo PUT", async () => {
    const updateProduct = {
      title: "Queso Muzzarella",
      description: "Excelente queso muzzarella traido directamente desde Italia"
    };

    const productUpdated = await userModel.findByIdAndUpdate(
      "6672424579ab9f1a1a96be3c",
      updateProduct
    );
    expect(productUpdated).to.have.property("_id");
  }); */

  /* it("Eliminar un producto dado un id mediante el metodo DELETE", async () => {
    const rta = await userModel.findByIdAndDelete("6672424579ab9f1a1a96be3c");
    expect(rta).to.be.ok;
  }); */
});
