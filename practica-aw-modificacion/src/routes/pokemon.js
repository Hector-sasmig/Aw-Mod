/**
 * Módulo que define un enrutador con todos los endpoints de la API REST
 * de Pokémon.
 *
 * Este módulo define la API REST /api/pokemon con los siguientes endpoints:
 * GET /          - Obtener una colección de Pokémon.
 * DELETE /:id    - Eliminar un Pokémon específico.
 * POST /         - Crear un Pokémon
 *
 * @module routes/pokemon
 */

// ------------------------------------------------------------------
// MÓDULOS A IMPORTAR (sintaxis Node)
// ------------------------------------------------------------------

// express
const express = require("express");
// controlador de la API REST de Pokémon
const pkmn_api_controller = require("../controllers/pokemon");

// ------------------------------------------------------------------
// ENRUTADOR Y ENDPOINTS
// ------------------------------------------------------------------

/** Enrutador para la API REST de Pokémon */
const router = express.Router();
// Mapear cada endpoint con los manejadores del controlador
/**
 * ENDPOINT:  GET /
 * MANEJADOR: pkmn_api_controller.get
 * FINALIDAD: Obtener una colección de Pokémon.
 */
router.get("/", pkmn_api_controller.get);
/**
 * ENDPOINT:  DELETE /:id
 * MANEJADOR: pkmn_api_controller.remove
 * FINALIDAD: Eliminar un Pokémon específico.
 */
router.delete("/:id", pkmn_api_controller.remove);
/**
 * ENDPOINT:  POST /
 * MANEJADOR: pkmn_api_controller.create
 * FINALIDAD: Crear un Pokémon.
 */
router.post("/", pkmn_api_controller.create);

// ------------------------------------------------------------------
// EXPORTAR CARACTERÍSTICAS (sintaxis Node)
// ------------------------------------------------------------------

// Exportar únicamente el enrutador
module.exports = router;