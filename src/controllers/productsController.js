import productModel from "../models/product.js";

export const getProducts = async (req, res) => {
  try {
    const { limit, page, filter, ord } = req.query;
    let metFilter;
    const pag = page !== undefined ? page : 1;
    const limi = limit !== undefined ? limit : 10;
    if (filter == "true" || filter == "false") {
      metFilter = "status";
    } else {
      if (filter !== undefined) metFilter = "category";
    }
    const query = metFilter != undefined ? { [metFilter]: filter } : {};
    const ordQuery = ord !== undefined ? { price: ord } : {};
    const prods = await productModel.paginate(query, {
      limit: limi,
      page: pag,
      sort: ordQuery,
    });
    res.status(200).send(prods);
  } catch (e) {
    res.status(500).render("templates/error", {
      error: e,
    });
  }
};
export const getProduct = async (req, res) => {
  try {
    const idProducto = req.params.pid;
    const prod = await productModel.findById(idProducto);
    if (prod) {
      res.status(200).send(prod);
    } else {
      res.status(404).send("Producto no existe");
    }
  } catch (e) {
    res
      .status(500)
      .send(`Error interno del servidor al consultar producto: ${e}`);
  }
};
export const createProduct = async (req, res) => {
  try {
    if (req.user.rol == "admin") {
      const product = req.body;
      const mensaje = await productModel.create(product);
      res.status(201).send(mensaje);
    } else {
      res.status(403).send("Usuario no autorizado");
    }
  } catch (e) {
    res.status(500).send(`Error interno del servidor al crear producto: ${e}`);
  }
};
export const updateProduct = async (req, res) => {
  try {
    if (req.user.rol == "admin") {
      const idProducto = req.params.pid;
      const updateProduct = req.body;
      const prod = await productModel.findByIdAndUpdate(
        idProducto,
        updateProduct
      );
      res.status(200).send(prod);
    } else {
      res.status(403).send("Usuario no autorizado");
    }
  } catch (e) {
    res
      .status(500)
      .send(`Error interno del servidor al actualizar producto: ${e}`);
  }
};
export const deleteProduct = async (req, res) => {
  try {
    if (req.user.rol == "admin") {
      const idProducto = req.params.pid;
      const mensaje = await productModel.findByIdAndDelete(idProducto);
      res.status(200).send(mensaje);
    } else {
      res.status(403).send("Usuario no autorizado");
    }
  } catch (error) {
    res
      .status(500)
      .send(`Error interno del servidor al eliminar producto: ${error}`);
  }
};
