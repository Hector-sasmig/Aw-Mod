/**
 * Módulo que define un esquema y un modelo de datos de Pokémon utilizando
 * el ODM Mongoose.
 *
 * @module models/pokemon
 */

// ------------------------------------------------------------------
// MÓDULOS A IMPORTAR (sintaxis Node)
// ------------------------------------------------------------------

// cargar módulo mongoose
const mongoose = require("mongoose");

// ------------------------------------------------------------------
// ESQUEMAS
// ------------------------------------------------------------------

/**
 * Esquema de datos Mongoose para representar un Pokémon. Este esquema
 * está formado por los siguientes campos:
 * 
 * ```js
 * {
 *   name: {
 *     english:       { type: String, required: true }
 *   },
 *   type:            [String],
 *   species:         String,
 *   image: {
 *     sprite:        { type: String, required: true, default: https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/items/sprites/4.png },
 *     hires:         String
 *   },
 *   creation:        { type: Date, default: Date.now() }
 * }
 * ```
 */
const PokemonSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  name: {
    english: { type: String, required: true }
  },
  type: [String],
  species: String,
  image: {
    sprite: { type: String, required: true, "default": "https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/items/sprites/4.png" },
    hires: String
  },
  creation: { type: Date, default: Date.now() }
});

// ------------------------------------------------------------------
// MODELOS
// ------------------------------------------------------------------

// Compilar el modelo "Pokemon" a partir del esquema definido anteriormente
const Pokemon = mongoose.model("Pokemon", PokemonSchema);

// ------------------------------------------------------------------
// API A EXPORTAR (sintaxis Node)
// ------------------------------------------------------------------

// Exportar el modelo de datos "Pokemon"
module.exports = Pokemon;