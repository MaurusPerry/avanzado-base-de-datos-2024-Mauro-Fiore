/*
⢀⣄⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣄⣄⡀⠉⠉⠁⠀⠀⠀⠀⠀⠀
⠋⠀⡤⣾⣿⣿⠿⣦⡀⠀⠀⠀⠀⢀⣼⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀⠀
⠀⣸⢼⢿⠵⣈⣧⣙⣗⠀⠀⠀⠀⡼⠁⠊⠀⠀⠀⠈⢻⡇⠀⠀⠀⠀⠀⠀
⠀⠆⡛⡹⠑⠺⡽⡷⠼⠀⠀⠀⢰⣇⣾⣿⡆⢰⣦⣄⢸⡇⠀⠀⠀⠀⠀⠀
⠀⠈⢯⣳⣴⣄⡸⡿⢴⠀⠀⠀⣾⠀⠀⣮⣀⣈⠀⠁⢸⣻⠀⠀⠀⠀⠀⠀
⠀⠀⢈⠜⣩⠴⣻⡇⣔⡂⠀⠀⠈⣷⣿⠿⠿⠵⣄⣤⡇⠏⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣦⣣⢊⡽⢠⢋⡁⠀⠀⢀⢹⣿⣽⣣⣼⣿⠿⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠙⣤⠘⡷⣳⣿⣷⣠⣴⡆⠈⠻⠿⠿⠟⠁⣄⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠐⠂⣇⣼⣿⣭⣭⣿⡷⡀⠀⠀⠀⠀⠀⣽⡿⣶⢄⡀⠀⠀⠀⠀
⠀⠀⠀⢀⢼⣿⣿⣿⣿⣿⣿⡿⠃⠙⠢⢄⣀⣀⠜⠉⠀⠌⡉⠙⠷⣄⠀⠀
⠀⠀⠀⡀⢠⢻⣿⣟⠛⠋⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢄⠀⠑⠀⠈⢷⠀
⠀⠀⢀⢡⣽⣏⢭⡅⡅⣴⢀⣤⠀⠀⢸⡩⡿⢹⠀⠀⣬⡓⡇⢀⠀⠀⠸⠇
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢀⣀⡀⠀⢀⣀⡀⢀⣀⣀⣀⣀⠀⠀⣀⣀⠀⠀⠀⢀⣀⡀⠀⠀⣀⡀⠀⠀
⢸⣿⣿⠀⣾⣿⡇⢸⣿⣟⣛⣛⠀⣾⣟⣛⡿⠆⢰⣿⣛⡿⠷⠀⣿⡇⠀⠀
⢸⣿⢹⣷⡟⣿⡇⢸⣿⡟⠛⠛⠀⣈⡟⠻⣿⡆⣈⣹⠛⢿⣷⠀⣿⡇⠀⠀
⠘⠛⠈⠛⠃⠛⠃⠘⠛⠛⠛⠛⠀⠙⠛⠛⠛⠁⠘⠛⠛⠛⠋⠀⠛⠃⠀⠀
*/


import { DataTypes, Model } from "sequelize";
// Importamos la instancia de 'sequelize', que es la conexión configurada previamente con la base de datos.
import { sequelize } from "../dbconfig.js";

// Esta clase extiende de 'Model' para obtener todas las funcionalidades de los modelos de Sequelize.
export class Usuario extends Model {}

// Usamos el método 'init' para inicializar el modelo 'Usuario' y configurarlo con la estructura de la tabla.
// Este método toma dos parámetros: el primero es un objeto con las columnas del modelo y el segundo es un objeto con configuraciones adicionales.
Usuario.init(
    {
        // 'primaryKey' indica que este campo será la clave primaria de la tabla.
        id: {
            type: DataTypes.INTEGER,  // Tipo de dato: número entero.
            autoIncrement: true,      // El valor de 'id' se incrementa automáticamente.
            primaryKey: true,         // 'id' es la clave primaria de la tabla.
        },
        
        // Definimos la columna 'nombre' para almacenar el nombre del usuario.
        // Es de tipo 'STRING', lo que significa que almacenará texto.
        nombre: {
            type: DataTypes.STRING,  // Tipo de dato: cadena de texto.
        },

        // Es de tipo 'STRING', como el campo anterior.
        apellido: {
            type: DataTypes.STRING,  // Tipo de dato: cadena de texto.
        },
        
        // Definimos la columna 'email', que será única para cada usuario.
        // 'unique' asegura que no habrá dos usuarios con el mismo correo electrónico en la base de datos.
        email: {
            type: DataTypes.STRING,  // Tipo de dato: cadena de texto (para el email).
            unique: true,            // Esta columna debe ser única (no se permiten emails duplicados).
        },

        password: {
            type: DataTypes.STRING,  // Tipo de dato: cadena de texto (para la contraseña).
        },

        // Definimos la columna 'admin', que indicará si el usuario tiene privilegios de administrador.
        // 'defaultValue' asigna un valor por defecto (en este caso, 'false' si no se especifica otro valor).
        admin: {
            type: DataTypes.BOOLEAN,  // Tipo de dato: booleano (true o false).
            defaultValue: false,      // Valor por defecto: 'false' si no se especifica.
        },
    },
    {
        sequelize,  // Conexión con la base de datos a través de la instancia 'sequelize'.
        modelName: "Usuario",  // Nombre del modelo, que se utilizará en las consultas.
        tableName: "usuarios", // Nombre de la tabla en la base de datos (en este caso, 'usuarios').
        timestamps: false,      // No usamos automáticamente los campos 'createdAt' y 'updatedAt'.
    }
);

