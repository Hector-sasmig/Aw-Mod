/**
 * Módulo que define un controlador con una colección de manejadores
 * para responder a peticiones HTTP sobre la API REST de Pokémon.
 *
 * @module controllers/pokemon-controller
 */

// ------------------------------------------------------------------
// MÓDULOS A IMPORTAR (sintaxis Node)
// ------------------------------------------------------------------

// modelo de datos de Pokémon
const Pokemon = require("../models/pokemon");

// ------------------------------------------------------------------
// MANEJADORES
// ------------------------------------------------------------------

/**
 * Obtener una colección de Pokémon. Este manejador soporta el parámetro
 * de consulta "search" dentro del path de la URL para poder filtrar
 * por nombre los resultados de la colección. La respuesta siempre devolverá
 * un código 200 y en el body un objeto JSON con los propios resultados
 * de la búsqueda.
 *
 * @param {import("express").Request} req Objeto request de Express.
 * @param {import("express").Response} res Objeto response de Express.
 */
const get = async (req, res) => {
  // Extraer el parámetro de consulta "search"
  let name = req.query.search;
  // Si el parámetro es vacío asignarle el valor {}
  name = name ? { "name.english": {"$regex" : name, "$options" : "i"}} : {};
  // Realizar la consulta a la base de datos de Pokémon
  const results = await Pokemon.find(name).exec();
  // Imprimir por consola un mensaje: X Pokémon encontrados.
  console.log(`${results.length} Pokémon encontrados.`);
  // Devolver un código 200 junto a los resultados en formato JSON
  res.status(200).json(results);
};

/**
 * Crear un Pokémon. En función de como se procesa la petición,
 * la respuesta será:
 *
 * - Si la petición tiene éxito, devuelve el código 201 y un objeto JSON
 *   con los datos del Pokémon insertado en la base de datos.
 * - Si la petición falla, devuelve el código 400 y el JSON:
 *   ```
 *   {
 *      message: razón_por_la_que_no_se_pudo_crear
 *   }
 *   ```
 *
 * @param {import("express").Request} req Objeto request de Express.
 * @param {import("express").Response} res Objeto response de Express.
*/
const create = async (req, res) => {
  try {
    // Extraer los datos del Pokémon del cuerpo de la petición
    const data = req.body;
    // Si tuviera una propiedad "id", eliminarla
    delete data.id;
    // Insertar el Pokémon en la base de datos
    const result = await Pokemon.create(data);
    // Imprimir el resultado de la operación por consola
    console.log(`Pokémon ${result.name.english} creado correctamente.`);
    // Devolver un código 201 junto al objeto recién insertado
    res.status(201).json(result);
  } catch(error) {
      // Imprimir por consola el error
      console.error(error);
      // Devolver un código 400 junto al mensaje de error en formato JSON
      res.status(400).json({ message: error.message });
  }
};

/**
 * Eliminar un Pokémon. En función de como se procesa la petición,
 * la respuesta será:
 *
 * - Si la petición tiene éxito, devuelve el código 204.
 * - Si la petición falla, devuelve el código 404 y el JSON:
 *   ```
 *   {
 *      message: razón_por_la_que_no_se_pudo_eliminar
 *   }
 *   ```
 *
 * @param {import("express").Request} req Objeto request de Express.
 * @param {import("express").Response} res Objeto response de Express.
 */
const remove = async (req, res) => {
  try {
    // Extraer el identificador (id) de los parámetros de la URL
    const id = req.params.id;
    // Eliminar el Pokémon de la base de datos
    const result = await Pokemon.findByIdAndDelete(id);
    // Imprimir el resultado de la operación por consola
    console.log(result);
    // Devolver un código 204
    res.status(204).json();
  } catch(error) {
    // Imprimir por consola el error
    console.error(error);
    // Devolver un código 404 junto al mensaje de error en formato JSON
    res.status(404).json({ message: error });
  }
};

// ------------------------------------------------------------------
// API A EXPORTAR (sintaxis Node)
// ------------------------------------------------------------------

// Exportar todos los manejadores definidos en este controlador
module.exports = {
  get, create, remove
};