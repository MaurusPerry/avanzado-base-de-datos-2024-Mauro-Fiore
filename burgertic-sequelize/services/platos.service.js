// Importación del modelo Plato desde los modelos definidos previamente con Sequelize.
import { Plato } from "../models/platos.model.js";

// Función para obtener todos los platos de la base de datos.
const getPlatos = async () => {
  return await Plato.findAll(); // Retorna todos los registros de la tabla 'platos'.
};

// Función para obtener un plato por su ID. Se utiliza 'findOne' en lugar de 'findAll' para obtener un solo registro.
const getPlatoById = async (id) => {
  return await Plato.findOne({   // 'findOne' es más adecuado cuando esperamos un solo registro.
    where: { id: id },  // Condición para buscar por el ID del plato.
  });
};

// Función para crear un nuevo plato en la base de datos.
const createPlato = async (plato) => {
  return await Plato.create({ // Creamos un nuevo registro en la tabla 'platos'.
    tipo: plato.tipo,   // Asignamos el tipo de plato recibido.
    nombre: plato.nombre, // Asignamos el nombre del plato.
    precio: plato.precio,  // Asignamos el precio del plato.
    descripcion: plato.descripcion, // Asignamos la descripción del plato.
  });
};

// Función para actualizar un plato existente.
const updatePlato = async (id, newData) => {
  // Buscamos el plato por su ID. Si no se encuentra, lanzamos un error.
  const plato = await Plato.findByPk(id);  // Utilizamos 'findByPk' para buscar por la clave primaria (ID).
  
  if (!plato) throw new Error("Plato no encontrado"); // Si no se encuentra el plato, lanzamos una excepción.

  // Actualizamos los atributos del plato con los nuevos datos.
  plato.tipo = newData.tipo;
  plato.nombre = newData.nombre;
  plato.precio = newData.precio;
  plato.descripcion = newData.descripcion;

  // Guardamos los cambios en la base de datos.
  await plato.save();
};

// Función para eliminar un plato por su ID.
const deletePlato = async (id) => {
  // Buscamos el plato por su ID.
  const plato = await Plato.findByPk(id);  // Usamos 'findByPk' para obtener el plato por su ID.

  if (!plato) throw new Error("Plato no encontrado"); // Si no existe, lanzamos un error.

  // Eliminamos el plato de la base de datos.
  await plato.destroy();
};

// Función para obtener platos por tipo. Filtra por el tipo especificado.
const getPlatosByTipo = async (tipo) => {
  return await Plato.findAll({   // Buscamos todos los platos con el tipo especificado.
    where: { tipo: tipo }, // Filtramos por el tipo de plato.
  });
};

// Exportamos todas las funciones para que puedan ser utilizadas en otras partes de la aplicación.
export default {
  getPlatos,
  getPlatoById,
  createPlato,
  updatePlato,
  deletePlato,
  getPlatosByTipo,
};
