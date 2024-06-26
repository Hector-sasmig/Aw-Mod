/**
 * Módulo para proteger el acceso a URLs.
 *
 * @module middleware/protector
 */

// ------------------------------------------------------------------
// MÓDULOS A IMPORTAR (sintaxis Node)
// ------------------------------------------------------------------

// TODO: EJERCICIO 2
// cargar módulo jsonwebtoken
const jwt = require('jsonwebtoken')

// ------------------------------------------------------------------
// MANEJADORES
// ------------------------------------------------------------------

/**
 * Verifica si la petición HTTP recibida contiene un token JWT válido
 * antes de poder acceder a la URL específica.
 *
 * @param {import("express").Request} req Objeto request de Express.
 * @param {import("express").Response} res Objeto response de Express.
 * @param {import("express").NextFunction} next Función middleware de Express
 */
const protectURL = (req, res, next) => {
  // TODO: EJERCICIO 2
  try {
    // Extraer las cookies de las cabeceras de la petición
    const cookies = req.cookies
    // Comprobar si no existe el jwt_token en las cookies
    if(!cookies.jwt_token) {
      // Si no existe lanzar una excepción con el mensaje
      // "Acceso denegado porque el token JWT no existe"
      throw new Error("Acceso denegado porque el token JWT no existe");
    }

    // Si existe, verificar si el token es válido o no
    const decoded = jwt.verify(cookies.jwt_token, process.env.JWT_TOKEN_SECRET)

    // Imprimir por consola un mensaje:
    // "El usuario <user> puede acceder a <baseUrl>."
    console.log(`El usuario ${decoded.user} puede acceder a ${req.baseUrl + req.url}.`)

    // Delegar a la siguiente función
    next()
  } catch(error) {
    // Imprimir por consola el error
    console.log('ERROR: ', error.message)
    // Devolver un código 401 junto al mensaje de error en formato JSON
    res.status(401).json({ message: error.message })
  }
};

// ------------------------------------------------------------------
// EXPORTAR CARACTERÍSTICAS (sintaxis Node)
// ------------------------------------------------------------------

// TODO: EJERCICIO 2
// Exportar únicamente el manejador para proteger el acceso a URLs
module.exports = protectURL;
