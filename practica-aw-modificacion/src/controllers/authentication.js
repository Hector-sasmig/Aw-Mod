/**
 * Módulo que define un controlador con una colección de manejadores
 * para responder a peticiones HTTP sobre la API REST de autenticación
 * de usuarios.
 *
 * @module controllers/authentication
 */

// ------------------------------------------------------------------
// MÓDULOS A IMPORTAR (sintaxis Node)
// ------------------------------------------------------------------

// TODO: EJERCICIO 3
// Cargar módulo jsonwebtoken
const jwt = require('jsonwebtoken')

const User = require('../models/users')

// ------------------------------------------------------------------
// UTILIDADES
// ------------------------------------------------------------------

/**
 * Genera un nuevo token JWT para un usuario específico.
 * IMPORTANTE: Este método no se debe exportar a otros módulos.
 *
 * @param {*} data Datos del usuario que se quieren almacenar encriptados
 *                 dentro del token.
 * @returns {import("jsonwebtoken").Jwt} Token JWT.
 */
const createToken = (data) => {
  // TODO: EJERCICIO 3
  // Crear las opciones del token JWT con una propiedad expiresIn cuyo
  // valor sea "5min"
  const options = { expiresIn: '5mins' }
  // Generar el token JWT pasandole los datos del usuario,
  // el secreto a partir de la variable de entorno y las opciones creadas
  // anteriormente
  return jwt.sign(data, process.env.JWT_TOKEN_SECRET, options)
};

// ------------------------------------------------------------------
// MANEJADORES
// ------------------------------------------------------------------

/**
 * Iniciar sesión en el sistema. En función de como se procesa la petición,
 * la respuesta será:
 *
 * - Si la petición tiene éxito, devuelve el código 201 y un objeto JSON
 *   con el token JWT asociado al usuario.
 * - Si la petición falla, devuelve el código 400 y el JSON:
 *   ```
 *   {
 *      message: razón_por_la_que_no_se_pudo_iniciar_sesion
 *   }
 *   ```
 *
 * @param {import("express").Request} req Objeto request de Express.
 * @param {import("express").Response} res Objeto response de Express.
 */
const login = async (req, res) => {
  // TODO: EJERCICIO 3
  try {
    // Extraer los datos del usuario del cuerpo de la petición
    const { login, password } = req.body

    // Comprobar si el usuario no existe
    // (el user o el password son distintos de "oak")
    const user = await User.findOne({ user: login })
    console.log(user)
    if (!user  || password !== user.password) {
      // Si no existe lanzar una excepción con el mensaje
      // "Usuario o contraseña incorrectos."
      throw new Error("Usuario o contraseña incorrectos.")
    }

    // Si la identificación es correcta, imprimir por consola un mensaje:
    // "Usuario <login> identificado correctamente."
    console.log(`Usuario ${login} identificado correctamente.`)

    // Crear un nuevo token JWT que almacene una única propiedad "user"
    // cuyo valor sea el login del usuario (llamando al método createToken())
    const token = createToken({ user: login })

    // Almacenar el token en una cookie llamada "jwt_token" con las propiedades
    // httpOnly=true y sameSite="Strict"
    const cookieOptions = {
      httpOnly: true,
      sameSite: "Strict"
    }

    res.cookie('jwt_token', token, cookieOptions)

    // Devolver un código 200 con el propio token JWT
    res.json({ token })
  } catch(error) {
    // Imprimir por consola el error
    console.log(error.message)
    // Devolver un código 400 junto al mensaje de error en formato JSON
    res.status(400).json({ message: error.message })
  }
};

/**
 * Cerrar sesión en el sistema. En función de como se procesa la petición,
 * la respuesta será:
 *
 * - Si la petición tiene éxito, devuelve el código 204.
 * - Si la petición falla, devuelve el código 404 y el JSON:
 *   ```
 *   {
 *      message: razón_por_la_que_no_se_pudo_cerrar_sesión
 *   }
 *   ```
 *
 * @param {import("express").Request} req Objeto request de Express.
 * @param {import("express").Response} res Objeto response de Express.
*/
const logout = async (req, res) => {
  // TODO: EJERCICIO 3
  try {
    // Extraer las cookies de las cabeceras de la petición
    const cookies = req.cookies
    // Comprobar si no existe el jwt_token en las cookies
    if(!cookies.jwt_token) {
      // Si no existe lanzar una excepción con el mensaje:
      // "No se puede cerrar sesión porque el token JWT no existe."
      throw new Errro('No se puede cerrar sesión porque el token JWT no existe.')
    }

    // Si el token existe, decodificarlo para extraer los datos del usuario
    const decoded = jwt.verify(cookies.jwt_token, process.env.JWT_TOKEN_SECRET)

    // Eliminar la cookie de la respuesta
    res.clearCookie('jwt_token')

    // Imprimir por consola un mensaje:
    // "El usuario <user> ha cerrado sesión correctamente."
    console.log(`El usuario ${decoded.user} ha cerrado sesión correctamente.`)
    // Devolver un código 204
    res.status(204).send()
  } catch(error) {
    // Imprimir por consola el error
    console.log(error.message)
    // Devolver un código 404 junto al mensaje de error en formato JSON
    res.status(404).json({ message: error.message })
  }
};

const register = async (req, res) => {
  try {
    const { user, password } = req.body
    const newUser = await new User({ user, password });
    const userCreated = await newUser.save()
    res.status(201).json(userCreated)
  } catch(error) {
    console.log(error.message)
    res.status(404).json({ message: error.message })
  }
}

// ------------------------------------------------------------------
// API A EXPORTAR (sintaxis Node)
// ------------------------------------------------------------------

// TODO: EJERCICIO 3
// Exportar todos los manejadores definidos en este controlador
module.exports = {
  login,
  logout,
  register
};
