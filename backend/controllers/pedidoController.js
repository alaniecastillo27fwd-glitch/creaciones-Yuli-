import {
  sequelize,
  Pedido,
  DetallePedido,
  Cotizacion,
  Producto,
  Usuario
} from '../models/index.js';

// Normaliza etiqueta legible para el cliente cuando el pedido recién solicita cotización
const formatearEstadoLegible = (pedidoJson) => {
  const cotizacionPendiente =
    pedidoJson.cotizacion && pedidoJson.cotizacion.estado === 'pendiente';

  return {
    ...pedidoJson,
    estado_legible: cotizacionPendiente
      ? 'Pendiente de cotización'
      : pedidoJson.estado_pedido
  };
};

// POST /api/pedidos -> Rol: Cliente
export const crearPedidoPersonalizado = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const id_usuario = req.usuario.id_usuario;
    const {
      id_producto = null,
      tematica = '',
      especificaciones = '',
      especificaciones_personalizadas,
      fecha_deseada,
      fecha_entrega_comprometida,
      metodo_pago = 'sinpe_movil',
      porcentaje_adelanto = 50.0,
      detalles = []
    } = req.body;

    const textoEspecificaciones = (
      especificaciones_personalizadas ||
      `${tematica ? `Temática: ${tematica}. ` : ''}${especificaciones}`
    ).trim();

    const fechaObjetivo = fecha_entrega_comprometida || fecha_deseada;

    // 1. Registrar la solicitud de cotización personalizada asociada (estado inicial: pendiente)
    const nuevaCotizacion = await Cotizacion.create(
      {
        id_usuario,
        id_producto: id_producto ? Number(id_producto) : null,
        especificaciones_personalizadas: textoEspecificaciones,
        fecha_evento: fechaObjetivo,
        monto_estimado_crc: null,
        estado: 'pendiente'
      },
      { transaction }
    );

    // 2. Crear el encabezado del pedido vinculado a la cotización
    const nuevoPedido = await Pedido.create(
      {
        id_usuario,
        id_cotizacion: nuevaCotizacion.id_cotizacion,
        fecha_entrega_comprometida: fechaObjetivo,
        porcentaje_adelanto: Number(porcentaje_adelanto),
        estado_pedido: 'pendiente_adelanto',
        metodo_pago
      },
      { transaction }
    );

    // 3. Si el cliente envió líneas de detalle de productos de referencia, insertarlas en 3FN
    if (Array.isArray(detalles) && detalles.length > 0) {
      for (const item of detalles) {
        const productoRef = await Producto.findByPk(item.id_producto, { transaction });
        const precioHistorico =
          item.precio_unitario_crc !== undefined
            ? Number(item.precio_unitario_crc)
            : productoRef
              ? Number(productoRef.precio_base_crc)
              : 0;

        await DetallePedido.create(
          {
            id_pedido: nuevoPedido.id_pedido,
            id_producto: Number(item.id_producto),
            cantidad: Number(item.cantidad) || 1,
            precio_unitario_crc: precioHistorico,
            nota_personalizacion: item.nota_personalizacion || textoEspecificaciones.slice(0, 255)
          },
          { transaction }
        );
      }
    }

    await transaction.commit();

    return res.status(201).json({
      ok: true,
      mensaje: 'Solicitud de pedido personalizado registrada exitosamente.',
      data: {
        id_pedido: nuevoPedido.id_pedido,
        id_cotizacion: nuevaCotizacion.id_cotizacion,
        id_usuario,
        especificaciones_personalizadas: textoEspecificaciones,
        fecha_entrega_comprometida: fechaObjetivo,
        estado: 'Pendiente de cotización',
        estado_pedido: nuevoPedido.estado_pedido
      }
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

// GET /api/pedidos -> Cliente ve solo los suyos; Administrador y Colaborador ven todos
export const listarPedidos = async (req, res, next) => {
  try {
    const { id_usuario, rol } = req.usuario;
    const whereCondition = rol === 'Cliente' ? { id_usuario } : {};

    const pedidos = await Pedido.findAll({
      where: whereCondition,
      include: [
        {
          model: Usuario,
          as: 'cliente',
          attributes: ['id_usuario', 'nombre_completo', 'email', 'telefono']
        },
        {
          model: Cotizacion,
          as: 'cotizacion',
          attributes: [
            'id_cotizacion',
            'especificaciones_personalizadas',
            'fecha_evento',
            'monto_estimado_crc',
            'estado'
          ]
        },
        {
          model: DetallePedido,
          as: 'detalles',
          include: [
            {
              model: Producto,
              as: 'producto',
              attributes: ['id_producto', 'nombre', 'precio_base_crc']
            }
          ]
        }
      ],
      order: [['created_at', 'DESC']]
    });

    const data = pedidos.map((p) => formatearEstadoLegible(p.toJSON()));

    return res.status(200).json({
      ok: true,
      total: data.length,
      data
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/pedidos/:id/estado -> Solo Administrador y Colaborador
export const actualizarEstadoPedido = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { estado_pedido } = req.body;

    const pedido = await Pedido.findByPk(id, {
      include: [{ model: Cotizacion, as: 'cotizacion' }]
    });

    if (!pedido) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Pedido no encontrado.'
      });
    }

    const estadoNormalizado =
      estado_pedido === 'Pendiente de cotización' ? 'pendiente_adelanto' : estado_pedido;

    await pedido.update({ estado_pedido: estadoNormalizado });

    if (pedido.cotizacion && estado_pedido === 'en_produccion') {
      await pedido.cotizacion.update({ estado: 'aprobada' });
    }

    return res.status(200).json({
      ok: true,
      mensaje: 'Estado del pedido actualizado correctamente.',
      data: {
        id_pedido: pedido.id_pedido,
        estado_pedido: pedido.estado_pedido,
        estado_solicitado: estado_pedido
      }
    });
  } catch (error) {
    next(error);
  }
};
