const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
// const path = require("path");

const emailRoutes = require("./routes/email.router");
const productsRoutes = require("./routes/products.router");

//Initialization
const app = express();
require("./database")

//Settings
app.set("port", process.env.PORT || 4000);

//Miiddlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/v1/email", emailRoutes);
app.use("/api/v1/products", productsRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something was wrong";
  return res.status(errorStatus).json({
    seccess: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

module.exports = app;
