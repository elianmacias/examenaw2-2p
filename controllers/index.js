const db = require("../db/index.js");

const obtenerTodoApostando = async (req, res) => {
  let newDB = [];

  db.forEach((element) => {
    if (element.estado === 1) {
      newDB.push(element);
    }
  });

  return res.render("lista", {
    total: newDB.length,
    apuestas: newDB,
  });
};

const obtenerTodo = async (req, res) => {
  return res.status(201).json(db);
};

const obtenerTodoApostador = async (req, res) => {
  const { id } = req.params;

  let newDB = [];

  db.forEach((element) => {
    if (element.apostador === id && element.estado === 2) {
      newDB.push(element);
    }
  });

  return res.status(201).json(newDB);
};

const obtenerPorId = async (req, res) => {
  const { id } = req.params;

  let apuesta = "Registro inexistente";

  db.forEach((element) => {
    if (element.codigo === id) {
      apuesta = element;
    }
  });

  return res.status(201).json(apuesta);
};

const agregar = async (req, res) => {
  const { body } = req;

  body.estado = 1;
  db.push(body);

  return res.status(201).json("Apuesta creada exitosamente");
};

const pagado = async (req, res) => {
  const { id } = req.params;

  let mensaje = "Apuesta Inexistente";
  db.forEach((element) => {
    if (element.codigo === id) {
      element.estado = 4;

      mensaje = "Apuesta Pagada";
    }
  });

  return res.status(201).json(mensaje);
};

const ganador = async (req, res) => {
  const { id } = req.params;

  db.forEach((element) => {
    if (element.codigo === id) {
      element.estado = 2;
    }
  });

  return res.redirect("/api/v1/examen/registro/apostando");
};

const perdedor = async (req, res) => {
  const { id } = req.params;

  db.forEach((element) => {
    if (element.codigo === id) {
      element.estado = 3;
    }
  });

  return res.redirect("/api/v1/examen/registro/apostando");
};

module.exports = {
  obtenerTodo,
  obtenerTodoApostando,
  obtenerTodoApostador,
  obtenerPorId,
  ganador,
  perdedor,
  agregar,
  pagado,
};
