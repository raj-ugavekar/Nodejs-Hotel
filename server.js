const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require("./auth");

const parser = require("body-parser");

app.use(parser.json());

app.use(passport.initialize());

const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`
  );
  next();
};

app.use(logRequest);

const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", (req, res) => {
  res.send("Welcome to our hotel");
});

const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");
const Person = require("./Models/Person");

app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Started on 3000");
});
