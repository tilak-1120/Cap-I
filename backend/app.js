const express = require("express");
const app = express();

// Middlewares
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));

// Routes Import
const userRoute = require("./routes/userRoutes");

// Routes
app.use("/api/v1", userRoute);

module.exports = app;
