const mongoose = require("mongoose");
require("dotenv").config();

// define the mongoDB connection URL
const mongoURL = process.env.DB_URL_LOCAL; // in the place of hotel i can use any name
// const mongoURL = process.env.DB_URL_ONLINE;

// connect to mongoDB
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mongoose maintains a default connection object representing the MangoDB connections
const db = mongoose.connection;

// Event Listner for show the diferent message *connected/error/disconnected is already define in mongoDB*
db.on("connected", () => {
  console.log("Connected MongoDB server");
});

db.on("error", () => {
  console.log("MangoDB connection error");
});

db.on("disconnected", () => {
  console.log("MongoDB connection is disconnected");
});

module.exports = db;
