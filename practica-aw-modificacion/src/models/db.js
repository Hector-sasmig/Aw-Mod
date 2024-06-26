/**
 * Módulo para controlar gestionar conexiones con una base de datos MongoDB
 * utilizando el ODM Mongoose.
 *
 * @module db
 */

// ------------------------------------------------------------------
// MÓDULOS A IMPORTAR (sintaxis Node)
// ------------------------------------------------------------------

// cargar módulo mongoose
const mongoose = require("mongoose");

// ------------------------------------------------------------------
// CONEXIÓN CON LA BASE DE DATOS
// ------------------------------------------------------------------

/**
 * Establece una conexión por defecto con una base de datos MongoDB.
 * 
 * @returns {Promise} Posible resultado de la conexión por defecto con
 *                    la base de datos.
 */
const createConnection = async () => {
  // Definir la URI de la base de datos a partir de la variable de entorno
  const conn_uri = process.env.MONGODB_URI;

  // EVENTOS Y MANEJADORES
  // ================================================================
  /*
    Asignar los siguientes manejadores anónimos al objeto de mongoose
    que gestiona la conexión:
      - Frente a eventos de tipo "error", el código del manejador debe
        imprimir el mensaje de error:
        [Mongoose] <razón del error>.
      - Frente a eventos de tipo "connected", el código del manejador
        debe imprimir el mensaje:
        [Mongoose] Conexión establecida con la base de datos <nombre>.
      - Frente a eventos de tipo "disconnected", el código del manejador
        debe imprimir el mensaje:
        [Mongoose] Desconexión con la base de datos.
   */
  mongoose.connection.on("error", (error) => {
    console.error(`[Mongoose] ${error}.`);
  });
  mongoose.connection.on("connected", () => {
    console.log(`[Mongoose] Conexión establecida con la base de datos ${mongoose.connection.name}.`);
  });
  mongoose.connection.on("disconnected", () => {
    console.log(`[Mongoose] Desconexión con la base de datos.`);
  });

  // Devolver el resultado de abrir una conexión por defecto con mongoose
  return mongoose.connect(conn_uri);
};

// ------------------------------------------------------------------
// EXPORTAR CARACTERÍSTICAS (sintaxis Node)
// ------------------------------------------------------------------

// Exportar únicamente el método para crear una conexión a la base de datos
module.exports = { createConnection };