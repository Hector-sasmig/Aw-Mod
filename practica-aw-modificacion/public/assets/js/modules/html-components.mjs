/**
 * Módulo para crear diferentes componentes HTML utilizando la API DOM
 * de JavaScript.
 *
 * @module html-components
 */

// ------------------------------------------------------------------
// COMPONENTES INTERNOS
// ------------------------------------------------------------------

/**
 * Crea un apartado para mostrar una notificación.
 *
 * @param {string} msg Mensaje a mostrar en la notificación.
 * @returns {HTMLElement} Nodo del árbol DOM de tipo elemento "span".
 */
const createNotification = (msg) => {
  // Crear un <span> con el mensaje y devolverlo
  const span = document.createElement("span");
  span.innerText = msg;
  return span;
};

/**
 * Crea una tabla para tabular los datos de una lista de Pokémon.
 *
 * @param {Array} data Lista de datos a tabular.
 * @returns {HTMLElement} Nodo del árbol DOM de tipo elemento "table"
 */
const createPokedexTable = (data) => {
  // Crear un elemento <table> y asignarle el estilo correspondiente
  const table = document.createElement("table");
  table.setAttribute("class", "striped");

  // Crear un elemento <thead> y agregarle las correspondientes columnas
  const thead = document.createElement("thead");
  thead.innerHTML = `
    <th scope="col">Pokémon</th>
    <th scope="col">Especie</th>
    <th scope="col">Tipo</th>
    <th scope="col"></th>
  `;

  // Crear un elemento <tbody> y tabular los datos de la Pokédex
  const tbody = document.createElement("tbody");
  // Por cada resultado que haya, insertar los datos del Pokémon
  data.forEach(
    pkmn => tbody.append(createPokemonTableRow(pkmn))
  );

  // Crear un elemento <tfooter> para mostrar el total de resultados
  const tfoot = document.createElement("tfoot");
  tfoot.innerHTML = `
    <tr>
      <th scope="row" colspan="4">${data.length} Pokémon encontrado${data.length > 1 ? 's' : ''}</th>
    </tr>
  `;

  // Agregar los componentes a la tabla
  table.append(thead, tbody, tfoot);

  // Devolver la tabla
  return table;
};

/**
 * Crea una fila de una tabla con los datos de un Pokémon.
 *
 * @param {Object} data Datos de un Pokémon específico.
 * @returns {HTMLElement} Nodo del árbol DOM de tipo elemento "tr".
 */
const createPokemonTableRow = (data) => {
  // Crear un <tr> y asignarle el id del Pokémon siguiendo el formato
  // "data-pokemon"
  const tr = document.createElement("tr");
  // Asignar la propiedad _id en lugar de id
  tr.dataset.pokemon = data._id;

  // Agregar en cada columna el contenido correspondiente
  tr.innerHTML = `
    <td>
      <a href="${data.image.hires}" target="_blank"><img src="${data.image.sprite}" alt="${data.name.english}"></a>
      ${data.name.english}
    </td>
    <td>${data.species}</td>
  `;
  // Para la columna del tipo, hay que agregar cada tipo como un span
  const td_type = createPokemonTypeTableData(data.type)
  // Para la columna de la operación, agregar un botón
  const td_actions = document.createElement("td");
  td_actions.innerHTML = `<button class="contrast">-</button>`;

  tr.append(td_type, td_actions);

  // Devolver el <tr>
  return tr;
};

/**
 * Crea una celda de una tabla con el tipo de un Pokémon específico.
 * Cada tipo está delimitado dentro de un elemento "span".
 *
 * @param {string[]} data Lista con los tipos específicos de un Pokémon.
 * @returns {HTMLElement} Nodo del árbol DOM de tipo elemento "td".
 */
const createPokemonTypeTableData = (data) => {
  // Crear el elemento <td>
  const td = document.createElement("td");
  // Por cada tipo, crear un <span> y guardarlo en el <td>
  data.forEach((type) => {
    const span = document.createElement("span");
    span.innerText = type;
    td.append(span);
  });
  // Devolver el <td>
  return td;
};

// ------------------------------------------------------------------
// COMPONENTES A EXPORTAR
// ------------------------------------------------------------------

/**
 * Actualiza el apartado de resultados de la Pokédex con una lista de
 * Pokémon dada.
 *
 * @param {Array} data Lista de Pokémon para actualizar el apartado.
 */
const updatePokedexArticle = (data) => {
  // Obtener el apartado de los resultados
  const dex_results = document.getElementById("dex-results");

  // Eliminar todos los nodos que hubiera
  dex_results.childNodes.forEach(node => node.remove());

  // Actualizar el apartado de resultados de la siguiente manera:
  //  - Si hay datos crear la tabla
  //  - Si no, crear una notificación con el mensaje: "No se han encontrado resultados"
  if (data.length > 0) {
    dex_results.append(createPokedexTable(data));
  } else {
    dex_results.append(createNotification("No se han encontrado resultados"));
  }
};

/**
 * Actualiza la columna "Tipo" dentro de la tabla de los resultados para
 * que cada celda muestre los datos como "badges". El estilo de "badges"
 * está definido dentro del framework CSS "pokemon-types-css"
 * @see {@link https://github.com/justingolden21/pokemon-types-css}
 */
const updatePokemonTypeTableColumn = () => {
  // Obtener todas las etiquetas span que haya dentro del apartado de
  // los resultados
  const span_types = document.getElementById("dex-results").querySelectorAll("span");
  // Por cada <span>, modificar su contenido para aplicar correctamente
  // la clase correspondiente del framework CSS "pokemon-types-css"
  span_types.forEach((type) => {
    type.setAttribute("class", `type ${type.innerText.toLocaleLowerCase()}`);
    type.innerText = '';
  });
};

/**
 * Actualiza la columna de acciones dentro de la tabla de los resultados
 * para agregar a todos los botones que haya un manejador para eventos
 * de tipo "click".
 *
 * @param {function} handler Referencia al callback que se debe asignar
 *                           sobre eventos de tipo "click".
 */
const updatePokemonActionTableColumn = (handler) => {
  // Obtener todos los botones que haya dentro del apartado de los resultados
  const td_actions = document.getElementById("dex-results").querySelectorAll("button");
  // Por cada <button>, agregarle el handler correspondiente
  td_actions.forEach((btn) => btn.addEventListener("click", handler));
};

// Exportar características
export {
  updatePokedexArticle, updatePokemonTypeTableColumn, updatePokemonActionTableColumn
};

// Mostrar por consola que el módulo ha sido cargado con éxito
console.log("Módulo html-components cargado con éxito.");