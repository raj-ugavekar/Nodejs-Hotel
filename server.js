const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

const parser = require("body-parser");

app.use(parser.json());

app.get("/", (req, res) => {
  res.send("Welcome to our hotel");
});

const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");

app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Started on 3000");
});
