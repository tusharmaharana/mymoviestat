const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to DB");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => `Listening on PORT ${PORT}`);
