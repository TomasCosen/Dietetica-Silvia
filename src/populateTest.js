import mongoose from "mongoose";
import cartModel from "./models/cart.js";
import productModel from "./models/products.js";

const runTest = async () => {
  await mongoose.connect(
    "mongodb+srv://tomascosentino123:vFB3E6yt554v8CUN@cluster0.we7yzrs.mongodb.net/?retryWrites=true&w=majority&ssl=true&appName=Cluster0"
  );
  try {
    const cart = await cartModel.findById("6690808fac69e665c61dbe28");
    console.log("Cart before populate:", cart);

    const populatedCart = await cartModel
      .findById(cart._id)
      .populate("products.id_prod");
    console.log("Cart after populate:", populatedCart);
  } catch (e) {
    console.error("Error fetching cart: ", e);
  } finally {
    mongoose.connection.close();
  }
};

runTest();
