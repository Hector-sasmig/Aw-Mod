/**
 * Script para gestionar los eventos de la página de la Pokédex.
 */

// Cargar módulos
import * as rest_api from "./modules/rest-api.mjs";
import * as html from "./modules/html-components.mjs";

// ------------------------------------------------------------------
// MANEJADORES DE EVENTOS
// ------------------------------------------------------------------

/**
 * Busca en la base de datos Pokémon según los datos del formulario de
 * búsqueda y actualiza el apartado de los resultados.
 *
 * @param {Event} event Información del evento que ha sucedido.
 */
const searchPokedexHandler = async (event) => {
  // Evitar la propagación de eventos para que no se envíe el formulario
  event.preventDefault();

  // Obtener los datos del formulario
  const searchForm = new FormData(document.forms["dex-search"]);

  try {
    // Realizar la petición a la API REST
    const response = await rest_api.searchPokemonByName(searchForm.get("name"));
    const result = await response.json();

    // Actualizar el apartado de los resultados
    html.updatePokedexArticle(result);

    // Si hubo resultados, actualizar también la columna del tipo de Pokémon
    // para aplicar el estilo de "badges"
    // También actualizar la columna de los botones para asignar el handler
    // que elimina un Pokémon
    if (result.length > 0) {
      html.updatePokemonTypeTableColumn();
      html.updatePokemonActionTableColumn(deletePokemonHandler);
    }
  } catch(error) {
    // Si ocurrió algún error, mostrar una alerta
    console.error(error);
    alert(error);
  }
};

/**
 * Crea un nuevo Pokémon según los datos del formulario de crear un Pokémon
 * y muestra una alerta al usuario.
 *
 * @param {Event} event Información del evento que ha sucedido.
 */
const createPokemonHandler = async (event) => {
  // Evitar la propagación de eventos para que no se envíe el formulario
  event.preventDefault();

  // Crear un nuevo FormData para enviar todos los datos del formulario
  const pokemonData = new FormData(document.forms["dex-create"]);
  // Agregar la propiedad name[english] para almacenar el nombre
  pokemonData.append("name[english]", pokemonData.get("name"));
  // Eliminar la propiedad name
  pokemonData.delete("name");
  // Agregar las propiedades image[sprite] e image[hires]
  pokemonData.append("image[sprite]", pokemonData.get("sprite"));
  pokemonData.append("image[hires]", pokemonData.get("hires"));
  // Eliminar las propiedades sprite y hires
  pokemonData.delete("sprite");
  pokemonData.delete("hires");
  // Obtener un Array con todos los tipos
  const types = pokemonData.get("type").split(" ");
  // Eliminar la propiedad type
  pokemonData.delete("type");
  // Agregar la propiedad type[] y rellenarla con todos los tipos que hubiera
  for(const type of types) {
    pokemonData.append("type[]", type);
  }

  try {
    // Realizar la petición a la API REST
    const response = await rest_api.createPokemon(pokemonData);
    await response.json();

    // Notificar al usuario de que todo ha ido correctamente
    alert(`Pokémon creado correctamente.`);

    // Reiniciar los campos del formulario
    document.forms["dex-create"].reset();

    // Reiniciar los resultados de búsqueda
    html.updatePokedexArticle([]);
  } catch(error) {
    // Si ocurrió algún error, mostrar una alerta
    console.error(error.message);
    alert(`Ha ocurrido un error: ${error.message}`);
  }
};

/**
 * Muestra un diálogo de confirmación al usuario para eliminar un Pokémon.
 *
 * @param {Event} event Información del evento que ha sucedido.
 */
const deletePokemonHandler = async (event) => {
  // Muestra un diálogo de confirmación al usuario y si el usuario acepta,
  // elimina el Pokémon correspondiente
  if (confirm("¿Desea realmente eliminar este Pokémon?")) {
    // Desde el elemento que ha originado el evento, utilizar la jerarquía
    // DOM para acceder a la fila de la tabla
    const tr = event.target.parentNode.parentNode;
    // Obtener el ID del Pokémon
    const id = tr.dataset.pokemon;

    try {
      // Realizar la petición a la API REST
      const response = await rest_api.deletePokemonById(id);

      // Notificar al usuario de que todo ha ido correctamente
      alert(`Pokémon eliminado correctamente.`);

      // Reiniciar los resultados de búsqueda
      html.updatePokedexArticle([]);
    } catch(error) {
      // Si ocurrió algún error, mostrar una alerta
      console.error(error.message);
      alert(`Ha ocurrido un error: ${error.message}`);
    }
  }
};

// ** LABORATORIO 10 **

/**
 * Muestra un diálogo de confirmación al usuario para cerrar sesión.
 *
 * @param {Event} event Información del evento que ha sucedido.
 */
const logoutHandler = async (event) => {
  // TODO: EJERCICIO 4
  // Muestra un diálogo de confirmación al usuario y si el usuario acepta,
  // cierra su sesión
  if (confirm("¿Desea realmente cerrar sesion?")) {
    try {
      // Realizar la petición a la API REST
      const response = await rest_api.logoutUser()
      // Si se ha recibido un código de estado distinto al 204
      if(response.status !== 204) {
        // Lanzar una excepción con el mensaje:
        // "No se ha podido cerrar sesión."
        throw new Error("No se ha podido cerrar sesión.")
      }

      // Si el usuario ha cerrado sesión correctamente, redireccionarlo
      // a la URL raíz a través del método window.location.replace
      window.location.replace('/')
    } catch(error) {
      // Si ocurrió algún error, mostrar una alerta
      alert(error.message)
    }
  }
};

// ------------------------------------------------------------------
// ASIGNACIÓN DE EVENTOS
// ------------------------------------------------------------------

/*
 * Agregar un manejador al formulario de búsqueda para poder realizar
 * las búsquedas en la base de datos al enviar los datos del mismo.
 */
document.forms["dex-search"].addEventListener("submit", searchPokedexHandler);

/*
 * Agregar un manejador al formulario de crear un Pokémon para poder
 * crear un nuevo Pokémon.
 */
document.forms["dex-create"].addEventListener("submit", createPokemonHandler);

// TODO: EJERCICIO 4
/**
 * Agregar un manejador al botón de "Cerrar sesión" para poder salir
 * de la aplicación.
 */
document.getElementById('user-logout').addEventListener('click', logoutHandler)
