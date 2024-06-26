/**
 * Script para gestionar los eventos de la página de inicio.
 */

// Cargar módulos
import * as rest_api from "./modules/rest-api.mjs";

// ------------------------------------------------------------------
// MANEJADORES DE EVENTOS
// ------------------------------------------------------------------

/**
 * Autentica a un usuario en la aplicación web según los datos del formulario
 * de identificación. Si el usuario es correcto, redirecciona a la página
 * principal de la Pokédex.
 *
 * @param {Event} event Información del evento que ha sucedido.
 */
const loginHandler = async (event) => {
  // TODO: EJERCICIO 4
  // Evitar la propagación de eventos para que no se envíe el formulario
  event.preventDefault();
  // Crear un nuevo FormData para enviar todos los datos del formulario
  const dataForm = new FormData(event.target)
  try {
    // Realizar petición a la API REST
    const response = await rest_api.loginUser(dataForm)
    const data = await response.json();
    // Si el usuario no ha sido identificado correctamente
    if(!response.ok) {
      // Lanzar una excepción con el mensaje de error recibido
      throw new Error(data.message)
    }

    // Si el usuario ha sido identificado, redireccionarlo a la página
    // de la Pokédex a través del método window.location.replace
    window.location.replace('/pokedex')
  } catch(error) {
    // Si ocurrió algún error, mostrar una alerta
    alert(error.message)
  }
};

// ------------------------------------------------------------------
// ASIGNACIÓN DE EVENTOS
// ------------------------------------------------------------------

// TODO: EJERCICIO 4
/*
 * Agregar un manejador al formulario de login para poder iniciar sesión
 * dentro de la aplicación web.
 */
document.querySelector('form').addEventListener('submit', loginHandler);
