/**
 * Módulo para realizar consultas a la API REST utilizando la API Fetch.
 *
 * @module rest-api
 */

/**
 * URL base de la API REST.
 */
const baseURL = "/api/";

// ------------------------------------------------------------------
// OPERACIONES SOBRE LA API REST
// ------------------------------------------------------------------

/**
 * Busca todos aquellos Pokémon cuyo nombre contenga un valor dado.
 *
 * @param {string} query Nombre del Pokémon a buscar.
 * @returns {Promise<Response>} Posible resultado de la operación asíncrona.
 */
const searchPokemonByName = (query) => {
  // Petición: GET /api/pokemon?search={query}
  return fetch(`${baseURL}pokemon?search=${query}`, {
    method: "GET",
    // TODO: EJERCICIO 4
    // Agregar credenciales
    headers: {
      credentials: 'include'
    }
  });
};

/**
 * Crea un nuevo Pokémon con los datos especificados.
 *
 * @param {FormData} data Datos del Pokémon a enviar.
 * @returns {Promise<Response>} Posible resultado de la operación asíncrona.
 */
const createPokemon = (data) => {
  // Transformar el FormData en un object normal (siguiendo la estructura
  // del modelo de datos del backend) para poder serializarlo después
  // a JSON. Para ello, utilizar el método get() para obtener tipos normales
  // y getAll() para obtener Arrays
  const pkmn = {
    name: {
      english: data.get("name[english]")
    },
    type: data.getAll("type[]"),
    species: data.get("species"),
    image: {
      sprite: data.get("image[sprite]"),
      hires: data.get("image[hires]")
    }
  }

  // Petición: POST /api/pokemon/
  return fetch(`${baseURL}pokemon`, {
    method: "POST",
    // Enviar los datos como un JSON
    headers: { 
      "Content-Type": "application/json",
      credentials: 'include'
    },
    body: JSON.stringify(pkmn),
    // TODO: EJERCICIO 4
    // Agregar credenciales
  });
};

/**
 * Elimina un Pokémon específico a partir de su identificador.
 *
 * @param {string} query Identificador del Pokémon.
 * @returns {Promise<Response>} Posible resultado de la operación asíncrona.
 */
const deletePokemonById = (query) => {
  // Petición: DELETE /api/pokemon/{id}
  return fetch(`${baseURL}pokemon/${query}`, {
    method: "DELETE",
    // TODO: EJERCICIO 4
    // Agregar credenciales
    headers: {
      credentials: 'include'
    }
  });
};

// ** LABORATORIO 10 **
/**
 * Inicia la sesión dentro de la aplicación web.
 *
 * @param {FormData} data Datos del usuario a enviar.
 * @returns {Promise<Response>} Posible resultado de la operación asíncrona.
 */
const loginUser = (data) => {
  // TODO: EJERCICIO 4
  // Transformar el FormData en un object normal
  const loginData = {
    login: data.get('login'),
    password: data.get('password')
  }

  // Petición: POST /api/auth/login
  // Enviar los datos como un JSON
  return fetch(`${baseURL}auth/login`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      credentials: 'include'
    },
    body: JSON.stringify(loginData)
  });
};

const registerUser = (data) => {
  const registerData = {
    user: data.get('user'),
    password: data.get('password')
  }
  return fetch(`${baseURL}auth/register`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      credentials: 'include'
    },
    body: JSON.stringify(registerData)
  });}

/**
 * Cierra la sesión del usuario actual.
 *
 * @returns {Promise<Response>} Posible resultado de la operación asíncrona.
 */
const logoutUser = () => {
  // TODO: EJERCICIO 4
  // Petición: GET /api/auth/logout
  return fetch(`${baseURL}auth/logout`, {
    method: "GET",
    headers: {
      credentials: 'include'
    }
  });
};

// Exportar características
export {
  searchPokemonByName, createPokemon, deletePokemonById,
  // TODO: EJERCICIO 4
  // exportar los nuevos manejadores
  loginUser, logoutUser, registerUser 
};

// Mostrar por consola que el módulo ha sido cargado con éxito
console.log("Módulo rest-api cargado con éxito.");
