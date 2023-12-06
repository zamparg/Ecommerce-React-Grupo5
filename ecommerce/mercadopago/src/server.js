const express = require('express');
const cors = require('cors');
//Rutas Mercado Pago
const Mercado_Pago = require("./routes/Mercadopago")
const server = express();

server.use(express.json());
server.use(cors());

/* RUTas */

server.use("/Mercado_Pago", Mercado_Pago)


module.exports = server;