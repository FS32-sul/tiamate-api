const { buscar, criar, editar, deletar } = require("../controllers/usuarioController");

const router = require("express").Router();

router.get("/", buscar);
router.post("/", criar);
router.put("/:id", editar);
router.delete("/:id", deletar);

module.exports = router;
