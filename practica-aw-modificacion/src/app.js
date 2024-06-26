/**
 * Punto de entrada del software que hace de servidor web.
 */

// ------------------------------------------------------------------
// MÓDULOS A IMPORTAR (sintaxis Node)
// ------------------------------------------------------------------

// cargar módulo express
const express = require("express");

// Logger de peticiones HTTP
const log_requests = require("./middlewares/logger");
// Enrutador de la API REST de Pokémon
const pkmn_api_router = require("./routes/pokemon");

// cargar módulo de la base de datos
const database = require("./models/db");

// TODO: EJERCICIO 1
// Enrutador del frontend
const front_api_router = require("./routes/frontend");

// TODO: EJERCICIO 2
// cargar módulo cookie-parser
const cookieParser = require('cookie-parser');
// Protector de URLs
const protectURL = require('./middlewares/protector');

// TODO: EJERCICIO 3
// Enrutador de la API REST de autenticación
const auth_api_router = require("./routes/authentication");

// ------------------------------------------------------------------
// CREACIÓN DEL SERVIDOR WEB
// ------------------------------------------------------------------

/**
 * Crea, configura e inicializa el servidor web.
 */
const startWebServer = async () => {
  try {
    // BASE DE DATOS
    // ================================================================

    // Crear una conexión con la base de datos
    await database.createConnection();

    // APLICACIÓN EXPRESS
    // ================================================================

    // Crear la aplicación Express
    const app = express();
    // Definir los parámetros del servidor (puerto) a partir de la variable de entorno
    const port = process.env.EXPRESS_PORT;

    // MIDDLEWARE
    // ================================================================

    // ** Cargar middleware global **
    // Cargar el middleware para analizar el body de peticiones en formato JSON
    app.use(express.json());
    // TODO: EJERCICIO 2
    // Cargar el middleware para analizar las cookies
    app.use(cookieParser());

    // TODO: EJERCICIO 5
    // Cargar el motor de plantillas ejs
    app.set('view engine', 'ejs')
    // Configurar el directorio de las vistas
    app.set('views', './src/views')

    // ** Servir la API REST de Pokémon **
    // Servir la API REST sobre el path /api/pokemon, cargando primero
    // el middleware de logging y luego el enrutador
    // TODO: EJERCICIO 2
    // Cargar también el middleware de proteger urls antes del enrutador
    // y después del middleware de logging
    app.use("/api/pokemon", log_requests, protectURL, pkmn_api_router);

    // TODO: EJERCICIO 3
    // ** Servir la API REST de autenticación **
    // Servir la API REST sobre el path /api/auth, cargando primero
    // el middleware de logging y luego el enrutador
    app.use("/api/auth", log_requests, auth_api_router)

    // ** Servir todo el frontend **
    // TODO: EJERCICIO 1
    // Servir el frontend sobre el path / cargando el enrutador del frontend
    app.use('/', log_requests, front_api_router);

    // ARRANCAR SERVIDOR
    // ================================================================

    // Inicializar la aplicación con los parámetros indicados. Si todo
    // va bien, mostrar el mensaje:
    // "Servidor web iniciado en el puerto <X>. Pulse Ctrl+C para deternelo."
    app.listen(port, () => {
      console.log(`Servidor web iniciado en el puerto ${port}. Pulse Ctrl+C para detenerlo.`);
    });

  } catch(error) {
    console.log(error);
  }
};

// Ejecutar la aplicación
console.log("Inicializando el servidor web...");
startWebServer();
