import { Pedido } from "../models/pedidos.model.js";
import { PedidoPlato } from "../models/pedidos_platos.model.js";
import { Plato } from "../models/platos.model.js";

const getPlatosByPedido = async (idPedido) => {
    const pedidoPlatos = await PedidoPlato.findAll({
        where: { idPedido },
        include: [{ model: Plato }],
    });

    if (!pedidoPlatos.length) throw new Error("Pedido no encontrado");

    return pedidoPlatos.map(pedidoPlato => ({
        ...pedidoPlato.Plato.toJSON(),
        cantidad: pedidoPlato.cantidad,
    }));
};

const getPedidos = async () => await Pedido.findAll();

const getPedidoById = async (id) => {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) throw new Error("Pedido no encontrado");
    return pedido;
};

const getPedidosByUser = async (idUsuario) => {
    const pedidos = await Pedido.findAll({
        where: { idUsuario },
        include: {
            model: PedidoPlato,
            include: { model: Plato },
        },
    });

    if (!pedidos.length) return [];

    return pedidos.map(pedido => ({
        ...pedido.toJSON(),
        platos: pedido.PedidoPlatos.map(pedidoPlato => ({
            ...pedidoPlato.Plato.toJSON(),
            cantidad: pedidoPlato.cantidad,
        })),
    }));
};
const createPedido = async (idUsuario, platos) => {
    // Verificar que el idUsuario sea válido
    if (!idUsuario || typeof idUsuario !== 'number') {
        throw new Error("El id de usuario es inválido");
    }

    // Extraer los IDs de los platos del array recibido
    const platoIds = platos.map(plato => plato.id);

    // Verificar si existen los platos en la base de datos
    const platosExistentes = await Plato.findAll({ where: { id: platoIds } });

    // Si la cantidad de platos existentes no coincide con la cantidad de platos proporcionados, lanzar error
    if (platosExistentes.length !== platos.length) {
        throw new Error("Uno o más platos no existen");
    }

    // Crear el pedido
    const pedido = await Pedido.create({
        id_usuario: idUsuario,   // Asegúrate de que el campo sea 'id_usuario' y no 'idUsuario' (según tu modelo de base de datos)
        fecha: new Date(),
        estado: "pendiente",
    });

    // Crear las relaciones entre el pedido y los platos
    await Promise.all(
        platos.map(plato =>
            PedidoPlato.create({
                id_pedido: pedido.id,  // Asegúrate de usar 'id_pedido' según el modelo
                id_plato: plato.id,    // Asegúrate de usar 'id_plato' según el modelo
                cantidad: plato.cantidad,
            })
        )
    );

    return pedido;  // Retornar el pedido recién creado
};

const updatePedido = async (id, estado) => {
    const estadosValidos = ["pendiente", "aceptado", "en camino", "entregado", "cancelado"];
    if (!estadosValidos.includes(estado)) throw new Error("Estado inválido");

    const pedido = await Pedido.findByPk(id);
    if (!pedido) throw new Error("Pedido no encontrado");

    pedido.estado = estado;
    await pedido.save();
    return pedido;
};

const deletePedido = async (id) => {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) throw new Error("Pedido no encontrado");

    await pedido.destroy();
    return pedido;
};

export default {
    getPlatosByPedido,
    getPedidos,
    getPedidoById,
    getPedidosByUser,
    createPedido,
    updatePedido,
    deletePedido,
};

