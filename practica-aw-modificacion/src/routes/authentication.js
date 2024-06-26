/**
 * Módulo que define un enrutador con todos los endpoints de la API REST
 * de autenticación de usuarios.
 *
 * Este módulo define la API REST /api/auth con los siguientes endpoints:
 * POST /login          - Autenticación de un usuario en el sistema
 * GET  /logout         - Cierre de sesión de un usuario en el sistema
 *
 * @module routes/authentication
 */

// ------------------------------------------------------------------
// MÓDULOS A IMPORTAR (sintaxis Node)
// ------------------------------------------------------------------

// TODO: EJERCICIO 3
// cargar módulo express
const express = require('express')
// cargar controlador de autenticación de usuarios
const auth_api_controller = require('../controllers/authentication')

// ------------------------------------------------------------------
// ENRUTADOR Y ENDPOINTS
// ------------------------------------------------------------------

// TODO: EJERCICIO 3
/** Enrutador para la API REST de autenticación */
const router = express.Router()
// Mapear cada endpoint con los manejadores del controlador
/**
 * ENDPOINT:  POST /login
 * MANEJADOR: auth_controller.login
 * FINALIDAD: Autenticación de un usuario en el sistema
 */
router.post('/login', auth_api_controller.login)
/**
 * ENDPOINT:  GET /logout
 * MANEJADOR: auth_controller.logout
 * FINALIDAD: Cierre de sesión de un usuario en el sistema
 */
router.get('/logout', auth_api_controller.logout)
// ------------------------------------------------------------------
// EXPORTAR CARACTERÍSTICAS (sintaxis Node)
// ------------------------------------------------------------------

router.post('/register', auth_api_controller.register)

// TODO: EJERCICIO 3
// Exportar únicamente el enrutador
module.exports = router
