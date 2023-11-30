const { Router } = require("express");
const mercadopago = require("mercadopago");
require("dotenv").config();
const Mercado_Pago = Router();


mercadopago.configure({
  access_token: "TEST-1409685999665071-102012-a5522ca90c6c59c680b2346d606d6364-1505905292",
});

Mercado_Pago.post("/", async (req, res) => {
  try {
    const cart = req.body;
    //console.log(cart);
    const arrayProductos = cart.map((product) => ({
      id: product.id,
      title: product.name,
      picture_url: product.image,
      unit_price: product.price,
      currency_id: "ARS", // La moneda en la que se cotiza el producto
      description: product.description,
      quantity: product.quantity, // Agregar la cantidad deseada aquí
    }));
    // console.log(cart);
    // console.log(process.env.ACCESS_TOKEN);
    const preference = {
      items: arrayProductos,

      back_urls: {
        success: "http://localhost:5173/",
        failure: "http://localhost:5173",
      },

      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);
    res.status(200).json(response.response.init_point);

    // console.log(response);
    // console.log(response.response.init_point);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = Mercado_Pago;
