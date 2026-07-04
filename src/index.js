const express = require("express");
const connectdb = require("./src/utils/db");

const app = express();

connectdb();

app.get("/", (req, res) => {
  res.send("Movies API");
});

app.listen(8080, () => {
  console.log("Servidor activo en http://localhost:8080/");
});
