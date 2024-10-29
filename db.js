const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = String(process.env.HOTELURL);

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB Server");
});

db.on("error", (err) => {
  console.log("MongoDB COnnection Error", err);
});

db.on("disconnected", () => {
  console.log("MongoDB Server Disconnected");
});

module.exports = db;
