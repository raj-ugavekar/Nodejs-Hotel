const mongoose = require("mongoose");

const mongoURL =
  "mongodb+srv://rajugavekar:MongodbCluster0@cluster0.0aryf.mongodb.net/hotels";

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
