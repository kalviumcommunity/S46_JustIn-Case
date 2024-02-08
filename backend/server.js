require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

let connectionStatus = "Disconnected";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connectionStatus = "Connected";
  } catch (err) {
    connectionStatus = "Failed";
    console.log(err);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    connectionStatus = "Closed";
  } catch (err) {
    console.log(err);
  }
};

connectDB();

app.get("/", (req, res) => {
  res.json({
    message: "MongoDB",
    dataBase: connectionStatus,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server running on PORT: ${process.env.PORT}`);
});

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

module.exports = app;
