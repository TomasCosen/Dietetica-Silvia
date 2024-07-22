import cartModel from "../models/cart.js";
import productModel from "../models/product.js";
import ticketModel from "../models/ticket.js";

export const getAllCarts = async (req, res) => {
  try {
    const carts = await cartModel.find();
    res.status(200).send(carts);
  } catch (error) {
    res
      .status(500)
      .send(`Error interno del servidor al consultar carritos: ${error}`);
  }
};
export const getCart = async (req, res) => {
  try {
    const cartId = req.user.cart;
    const cart = await cartModel.findById(cartId).populate("products.id_prod");
    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }
    console.log(cart);
    res.status(200).send(cart);
  } catch (error) {
    res
      .status(500)
      .send(`Error interno del servidor al consultar carrito: ${error}`);
  }
};

export const createCart = async (req, res) => {
  try {
    const mensaje = await cartModel.create({ products: [] });
    res.status(201).send(mensaje);
  } catch (e) {
    res
      .status(500)
      .send(`Error interno del servidor al crear carrito: ${error}`);
  }
};

export const insertProductCart = async (req, res) => {
  try {
    if (req.user.user.rol == "admin") {
      const cartId = req.params.cid;
      const productId = req.params.pid;
      const { quantity } = req.body;
      const cart = await cartModel.findById(cartId);

      const indice = cart.products.findIndex(
        (product) => product.id_prod == productId
      );

      if (indice != -1) {
        //Consultar stock para ver cantidades
        cart.products[indice].quantity = quantity; //5 + 5 = 10, asigno 10 a quantity
      } else {
        cart.products.push({ id_prod: productId, quantity: quantity });
      }
      const mensaje = await cartModel.findByIdAndUpdate(cartId, cart, {
        new: true,
      });
      res.status(200).send(mensaje);
    } else {
      res.status(403).send("Usuario no autorizado");
    }
  } catch (error) {
    res
      .status(500)
      .send(`Error interno del servidor al crear producto: ${error}`);
  }
};

export const updateCart = async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;
  try {
    const updatedCart = await cartModel.findByIdAndUpdate(
      cid,
      { $set: { products } },
      { new: true }
    );
    if (!updatedCart) {
      return res.status(404).send({ message: "Cart Not found" });
    }
    res.status(200).send({ message: "cart Updated successfully", updatedCart });
  } catch (e) {
    res.staus(500).send({ message: "Error updating cart", e });
  }
};

export const createTicket = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartModel.findById(cartId);
    const prodSinStock = [];
    if (cart) {
      cart.products.forEach(async (prod) => {
        let producto = await productModel.findById(prod.id_prod);
        if (producto.stock - prod.quantity < 0) {
          prodSinStock.push(producto.id);
        }
      });
      if (prodSinStock.length == 0) {
        const totalPrice = cart.products.reduce((total, prod) => {
          return total + prod.id_prod.price * prod.quantity;
        }, 0);
        const newTicket = await ticketModel.create({
          code: crypto.randomUUID(),
          amount: totalPrice,
          purchaser: req.user.user.email,
          products: cart.products,
        });
        cart.products.forEach(async (prod) => {
          await productModel.findByIdAndUpdate(prod.id_prod, {
            stock: stock - prod.quantity,
          });
        });
        await cartModel.findByIdAndUpdate(cartId, {
          products: [],
        });
        res.status(200).send(newTicket);
      } else {
        prodSinStock.forEach((prodId) => {
          cart.products = cart.products.filter((pro) => pro.id_prod !== prodId);
        });
        await cartModel.findByIdAndUpdate(cartId, {
          products: cart.products,
        });
        res.status(400).send(`Productos sin stock; ${prodSinStock}`);
      }
    } else {
      res.status(404).send("Carrito no existe");
    }
  } catch (e) {
    res.status(500).send(e);
  }
};
