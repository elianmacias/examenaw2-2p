const express = require("express");
const cors = require("cors");
const router = require("./routes/index.js");

const app = express();

app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use("/api/v1/examen", router);

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), (req, res) => {
  console.log("Servidor corriendo en puerto: " + app.get("port"));
});
