/**
 * Módulo para loggear por consola todas las peticiones HTTP recibidas.
 *
 * @module middleware/logger
 */

// ------------------------------------------------------------------
// MANEJADORES
// ------------------------------------------------------------------

/**
 * Muestra por consola los datos de cualquier petición HTTP recibida.
 *
 * @param {import("express").Request} req Objeto request de Express.
 * @param {import("express").Response} res Objeto response de Express.
 * @param {import("express").NextFunction} next Función middleware de Express
 */
const logRequests = (req, res, next) => {
  // Obtener la fecha actual del servidor
  const current_time = new Date();

  // Mostrar por consola un mensaje que indique:
  // [hora_actual_formato ISO] método_HTTP url_base/path_url
  // cabeceras
  console.log(`[${current_time.toISOString()}] ${req.method} ${req.baseUrl + req.url}`);
  console.log(req.headers);
  // Si el método es POST o PUT, mostrar también por consola el body
  // del mensaje únicamente si sigue el formato de datos JSON
  if (req.method === "POST" || req.method === "PUT") {
    if (req.headers["content-type"] === "application/json") {
      console.log(JSON.stringify(req.body));
    }
  }

  // Delegar a la siguiente función
  next();
};

// ------------------------------------------------------------------
// EXPORTAR CARACTERÍSTICAS (sintaxis Node)
// ------------------------------------------------------------------

// Exportar únicamente el manejador para loggear las peticiones
module.exports = logRequests;