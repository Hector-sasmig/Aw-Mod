/**
 * Módulo que define un enrutador con todos los endpoints del frontend
 * de la aplicación web.
 *
 * Este módulo define los siguientes endpoints:
 * GET /          - Página de inicio del frontend (index.html)
 * GET /pokedex   - Página de gestión de Pokémon (pokedex.html)
 *
 * @module routes/frontend
 */

// ------------------------------------------------------------------
// MÓDULOS A IMPORTAR (sintaxis Node)
// ------------------------------------------------------------------

// TODO: EJERCICIO 1
// cargar módulo express
const express = require('express')

// TODO: EJERCICIO 2
// Protector de URLs
const protectURL = require('../middlewares/protector');

// ------------------------------------------------------------------
// ENRUTADOR Y ENDPOINTS
// ------------------------------------------------------------------

// TODO: EJERCICIO 1
// URL base del frontend
// Utilizar la variable global __dirname para obtener la ruta del directorio actual
// y navegar hasta la carpeta public (donde está el frontend)
const urlBase = __dirname + '/../../public/'

// TODO: EJERCICIO 1
/** Enrutador para el frontend */
const router = express.Router()
// Mapear cada endpoint con el manejador de express.static correspondiente
/**
 * ENDPOINT:  GET /
 * MANEJADOR: express.static
 * FINALIDAD: Servir todo el contenido del frontend que haya dentro del
 *            directorio public/
 */
router.use(express.static(urlBase));
/**
 * ENDPOINT:  GET /pokedex
 * MANEJADOR: express.static
 * FINALIDAD: Servir como contenido estático la página public/pokedex.html
 *            del frontend
 */
router.get('/register', (req, res) => res.sendFile('register.html', {root: urlBase}))
router.get('/pokedex', protectURL, (req, res) => res.sendFile('pokedex.html', {root: urlBase}))
// TODO: EJERCICIO 2
// Antes de cargar el middleware de express.static, cargar el middleware
// de proteger URLs para evitar acceso no autorizados

// TODO: EJERCICIO 5
/**
 * ENDPOINT: GET *
 * MANEJADOR: función anónima
 * FINALIDAD: Generar dinámicamente una página de error cuando la URL
 *            no esté soportada.
 */
  // Definir un object con los datos que se pasarán a la vista:
  //   title: Recurso no encontrado
  //   message: No se ha podido encontrar el recurso <baseUrl>
  // Devolver un código 404 y renderizar la vista "error" con los datos
  // definidos anteriormente
router.get('*', (req, res) => res.status(404).render('error', { title: "Recurso no encontrado", message: `No se ha podido encontrar el recurso ${req.url}` }))

// ------------------------------------------------------------------
// EXPORTAR CARACTERÍSTICAS (sintaxis Node)
// ------------------------------------------------------------------

// TODO: EJERCICIO 1
// Exportar únicamente el enrutador
module.exports = router
