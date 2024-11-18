// Importamos el modelo 'Usuario' para interactuar con la tabla de usuarios en la base de datos.
import { Usuario } from "../models/usuarios.model.js";

// Función para obtener un usuario por su correo electrónico.
const getUsuarioByEmail = async (email) => {
    try {
        // Usamos Sequelize para buscar un usuario en la base de datos por su correo electrónico.
        const usuario = await Usuario.findOne({ where: { email } });
        return usuario;  // Retornamos el usuario encontrado.
    } catch (error) {
        // Si ocurre un error durante la búsqueda, lo capturamos y mostramos.
        console.error("Error al obtener el usuario por email:", error);
        throw error;  // Lanza el error para ser manejado por el controlador o en otro lugar.
    }
};

// Función para obtener un usuario por su ID.
const getUsuarioById = async (id) => {
    try {
        // Buscamos el usuario por su ID utilizando 'findByPk' (busca por clave primaria).
        const usuario = await Usuario.findByPk(id);
        return usuario;  // Retornamos el usuario encontrado.
    } catch (error) {
        // Si ocurre un error durante la búsqueda, lo capturamos y mostramos.
        console.error("Error al obtener el usuario por ID:", error);
        throw error;  // Lanza el error para ser manejado en otro lugar.
    }
};

// Función para crear un nuevo usuario.
const createUsuario = async (usuario) => {
    try {
        // Usamos Sequelize para crear un nuevo usuario en la base de datos.
        const nuevoUsuario = await Usuario.create({
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            password: usuario.password,  // Asegúrate de almacenar la contraseña de manera segura (hashing).
            admin: usuario.admin || false,  // Si no se proporciona el campo 'admin', por defecto será 'false'.
        });
        return nuevoUsuario;  // Retornamos el nuevo usuario creado.
    } catch (error) {
        // Si ocurre un error durante la creación del usuario, lo capturamos y mostramos.
        console.error("Error al crear el usuario:", error);
        throw error;  // Lanza el error para ser manejado en el controlador o en otro lugar.
    }
};

// Exportamos las funciones para que puedan ser utilizadas en otros módulos o controladores.
export default { getUsuarioByEmail, getUsuarioById, createUsuario };
