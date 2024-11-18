/*
⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢻⣿⡗⢶⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣄
⠀⢻⣇⠀⠈⠙⠳⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⠶⠛⠋⣹⣿⡿
⠀⠀⠹⣆⠀⠀⠀⠀⠙⢷⣄⣀⣀⣀⣤⣤⣤⣄⣀⣴⠞⠋⠉⠀⠀⠀⢀⣿⡟⠁
⠀⠀⠀⠙⢷⡀⠀⠀⠀⠀⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡾⠋⠀⠀
⠀⠀⠀⠀⠈⠻⡶⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣠⡾⠋⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣼⠃⠀⢠⠒⣆⠀⠀⠀⠀⠀⠀⢠⢲⣄⠀⠀⠀⢻⣆⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢰⡏⠀⠀⠈⠛⠋⠀⢀⣀⡀⠀⠀⠘⠛⠃⠀⠀⠀⠈⣿⡀⠀⠀⠀⠀
⠀⠀⠀⠀⣾⡟⠛⢳⠀⠀⠀⠀⠀⣉⣀⠀⠀⠀⠀⣰⢛⠙⣶⠀⢹⣇⠀⠀⠀⠀
⠀⠀⠀⠀⢿⡗⠛⠋⠀⠀⠀⠀⣾⠋⠀⢱⠀⠀⠀⠘⠲⠗⠋⠀⠈⣿⠀⠀⠀⠀
⠀⠀⠀⠀⠘⢷⡀⠀⠀⠀⠀⠀⠈⠓⠒⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⡇⠀⠀⠀
⠀⠀⠀⠀⠀⠈⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣧⠀⠀⠀
⠀⠀⠀⠀⠀⠈⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠁⠀⠀⠀
*/


// Importamos las funcionalidades necesarias de Sequelize para definir los tipos de datos y el modelo.
import { DataTypes, Model } from "sequelize";
// Importamos la instancia de 'sequelize', que es la conexión a la base de datos configurada previamente.
import { sequelize } from "../dbconfig.js";

// Definimos la clase 'PedidoPlato', que representará el modelo para la tabla 'pedidos_platos'.
// Esta clase extiende de 'Model' para obtener todas las funcionalidades de los modelos de Sequelize.
export class PedidoPlato extends Model {}

// Usamos el método 'init' para inicializar el modelo 'PedidoPlato' y configurarlo con la estructura de la tabla.
// Este método toma dos parámetros: el primero es un objeto con las columnas del modelo y el segundo es un objeto con configuraciones adicionales.
PedidoPlato.init(
  {
    // Definimos la columna 'id', que será la clave primaria única para cada relación entre pedidos y platos.
    // 'autoIncrement' permite que el valor de 'id' se genere automáticamente cada vez que se cree una nueva relación.
    // 'primaryKey' indica que este campo será la clave primaria de la tabla.
    id: {
      type: DataTypes.INTEGER,  // Tipo de dato: número entero.
      primaryKey: true,         // 'id' será la clave primaria de la tabla.
      autoIncrement: true,      // El valor de 'id' se incrementa automáticamente.
    },

    // Definimos la columna 'id_pedido', que será la clave foránea que vincula un plato con un pedido.
    // Esta columna hace referencia a la columna 'id' de la tabla 'Pedidos', estableciendo una relación entre ambas tablas.
    id_pedido: {
      type: DataTypes.INTEGER,  // Tipo de dato: número entero (ID del pedido).
      references: {
        model: 'Pedidos',       // Hace referencia a la tabla 'Pedidos'.
        key: 'id',              // La columna 'id' de la tabla 'Pedidos' se vincula con 'id_pedido'.
      },
    },

    // Definimos la columna 'id_plato', que será la clave foránea que vincula este registro con un plato específico.
    // Esta columna hace referencia a la columna 'id' de la tabla 'Platos'.
    id_plato: {
      type: DataTypes.INTEGER,  // Tipo de dato: número entero (ID del plato).
      references: {
        model: 'Platos',        // Hace referencia a la tabla 'Platos'.
        key: 'id',              // La columna 'id' de la tabla 'Platos' se vincula con 'id_plato'.
      },
    },

    // Definimos la columna 'cantidad', que indicará la cantidad de platos en este pedido.
    // 'defaultValue' establece que, por defecto, la cantidad será 1 si no se especifica otro valor.
    cantidad: {
      type: DataTypes.INTEGER,  // Tipo de dato: número entero (cantidad de platos).
      defaultValue: 1,          // El valor por defecto de 'cantidad' será 1.
    },
  },
  {
    sequelize,                 // Conexión con la base de datos a través de la instancia 'sequelize'.
    modelName: 'PedidoPlato',  // Nombre del modelo, que se utilizará en las consultas.
    tableName: 'pedidos_platos', // Nombre de la tabla en la base de datos (en este caso, 'pedidos_platos').
    timestamps: false,         // No usamos automáticamente los campos 'createdAt' y 'updatedAt'.
  }
);

// Este archivo define un modelo llamado 'PedidoPlato', que se mapea a la tabla 'pedidos_platos' en la base de datos.
// El modelo 'PedidoPlato' tendrá las siguientes columnas: id, id_pedido, id_plato y cantidad.
// Sequelize se encargará de generar automáticamente las consultas necesarias para interactuar con la tabla 'pedidos_platos'.
