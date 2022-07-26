const { Router } = require("express");

const {
  obtenerTodo,
  obtenerTodoApostando,
  obtenerTodoApostador,
  obtenerPorId,
  agregar,
  pagado,
  ganador,
  perdedor,
} = require("../controllers/index");

const router = Router();

router.get("/", obtenerTodo);
router.get("/:id", obtenerPorId);
router.get("/registro/apostando", obtenerTodoApostando);
router.get("/apostador/:id", obtenerTodoApostador);
router.get("/ganador/:id", ganador);
router.get("/perdedor/:id", perdedor);
router.get("/pagado/:id", pagado);
router.post("/", agregar);

module.exports = router;
