const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const emailRoutes = require("./routes/email.router");
const productsRoutes = require("./routes/products.router");
const userRoutes = require("./routes/user.router");
const authRoutes = require("./routes/auth.router");
const credentials = require("./middleware/credentials");

//Initialization
const app = express();
require("./database");

app.use(credentials);

//Settings
app.set("port", process.env.PORT || 4000);

//Miiddlewares
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/email", emailRoutes);
app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/users", userRoutes);

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
