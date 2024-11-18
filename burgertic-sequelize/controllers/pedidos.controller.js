import PedidosService from "../services/pedidos.service.js";

const getPedidos = async (req, res) => {
    try {
        const pedidos = await PedidosService.getPedidos();
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPedidosByUser = async (req, res) => {
    try {
        const pedidos = await PedidosService.getPedidosByUser(req.idUsuario);
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPedidoById = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Se necesita un ID" });

    try {
        const pedido = await PedidosService.getPedidoById(id);
        if (!pedido)
            return res.status(404).json({ message: "Pedido no encontrado" });
        res.json(pedido);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controlador para crear un pedido
const createPedido = async (req, res) => {
    const platos = req.body.platos;
    console.log(req.idUsuario);
    // Validación de los platos: asegurarse de que existan platos en el cuerpo de la solicitud
    if (!platos || platos.length === 0) {
        return res.status(400).json({ message: "Se necesita al menos un plato" });
    }

    let error = false;

    // Validar cada plato individualmente
    platos.forEach((plato) => {
        if (!plato.id || !plato.cantidad) {
            return res.status(400).json({
                message: "Los platos deben tener un ID y una cantidad",
            });
        }
    });

    try {
        // Asegurarse de que el ID del usuario esté disponible en req.idUsuario (lo debe haber agregado un middleware de verificación de token)
        const idUsuario = req.idUsuario;

        // Si no existe el idUsuario, devolver un error
        if (!idUsuario) {
            return res.status(401).json({ message: "Usuario no autorizado" });
        }

        // Llamar al servicio para crear el pedido y asociarlo con el id_usuario
        await PedidosService.createPedido(req.idUsuario, platos);
        res.json({ message: "Pedido creado con éxito" });
    } catch (error) {
        // Manejo de errores
        res.status(500).json({ message: error.message });
    }
};

const aceptarPedido = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Se necesita un ID" });

    try {
        const pedido = await PedidosService.getPedidoById(id);

        if (!pedido)
            return res.status(404).json({ message: "Pedido no encontrado" });
        if (pedido.estado !== "pendiente")
            return res
                .status(400)
                .json({ message: "El pedido no está pendiente" });

        await PedidosService.updatePedido(id, "aceptado");
        res.json({ message: "Pedido aceptado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const comenzarPedido = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Se necesita un ID" });

    try {
        const pedido = await PedidosService.getPedidoById(id);

        if (!pedido)
            return res.status(404).json({ message: "Pedido no encontrado" });
        if (pedido.estado !== "aceptado")
            return res
                .status(400)
                .json({ message: "El pedido no está aceptado" });

        await PedidosService.updatePedido(id, "en camino");
        res.json({ message: "Pedido comenzado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const entregarPedido = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Se necesita un ID" });

    try {
        const pedido = await PedidosService.getPedidoById(id);

        if (!pedido)
            return res.status(404).json({ message: "Pedido no encontrado" });
        if (pedido.estado !== "en camino")
            return res
                .status(400)
                .json({ message: "El pedido no está en camino" });

        await PedidosService.updatePedido(id, "entregado");
        res.json({ message: "Pedido entregado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePedido = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Se necesita un ID" });

    const pedido = await PedidosService.getPedidoById(id);

    if (!pedido)
        return res.status(404).json({ message: "Pedido no encontrado" });

    try {
        await PedidosService.deletePedido(id);
        res.json({ message: "Pedido eliminado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    getPedidos,
    getPedidosByUser,
    getPedidoById,
    createPedido,
    aceptarPedido,
    comenzarPedido,
    entregarPedido,
    deletePedido,
};
