import { InsumoInventario } from '../models/index.js';

// Añade indicador calculado en tiempo de ejecución (3FN) si stock_actual <= stock_minimo
const enriquecerConAlertaStock = (insumoModel) => {
  const insumo = insumoModel.toJSON ? insumoModel.toJSON() : insumoModel;
  const stockActual = Number(insumo.stock_actual);
  const stockMinimo = Number(insumo.stock_minimo);
  const alertaCritica = stockActual <= stockMinimo;

  return {
    ...insumo,
    alerta_stock_bajo: alertaCritica,
    estado_inventario: alertaCritica ? 'CRITICO_REABASTECER' : 'OPTIMO'
  };
};

// GET /api/inventario -> Solo Administrador y Colaborador
export const listarInsumos = async (req, res, next) => {
  try {
    const insumos = await InsumoInventario.findAll({
      order: [['id_insumo', 'ASC']]
    });

    const data = insumos.map(enriquecerConAlertaStock);
    const totalAlertas = data.filter((item) => item.alerta_stock_bajo).length;

    return res.status(200).json({
      ok: true,
      resumen: {
        total_insumos: data.length,
        insumos_en_alerta: totalAlertas
      },
      data
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/inventario -> Solo Administrador y Colaborador
export const crearInsumo = async (req, res, next) => {
  try {
    const {
      id_proveedor,
      nombre_insumo,
      unidad_medida,
      stock_actual = 0,
      stock_minimo = 5,
      costo_unitario_crc
    } = req.body;

    const nuevoInsumo = await InsumoInventario.create({
      id_proveedor: Number(id_proveedor),
      nombre_insumo: nombre_insumo.trim(),
      unidad_medida: unidad_medida.trim(),
      stock_actual: Number(stock_actual),
      stock_minimo: Number(stock_minimo),
      costo_unitario_crc: Number(costo_unitario_crc)
    });

    return res.status(201).json({
      ok: true,
      mensaje: 'Insumo registrado en el inventario exitosamente.',
      data: enriquecerConAlertaStock(nuevoInsumo)
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/inventario/:id -> Solo Administrador y Colaborador
export const actualizarInsumo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const insumo = await InsumoInventario.findByPk(id);

    if (!insumo) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Insumo no encontrado en el inventario.'
      });
    }

    const {
      id_proveedor,
      nombre_insumo,
      unidad_medida,
      stock_actual,
      stock_minimo,
      costo_unitario_crc
    } = req.body;

    await insumo.update({
      id_proveedor: id_proveedor !== undefined ? Number(id_proveedor) : insumo.id_proveedor,
      nombre_insumo: nombre_insumo ? nombre_insumo.trim() : insumo.nombre_insumo,
      unidad_medida: unidad_medida ? unidad_medida.trim() : insumo.unidad_medida,
      stock_actual: stock_actual !== undefined ? Number(stock_actual) : insumo.stock_actual,
      stock_minimo: stock_minimo !== undefined ? Number(stock_minimo) : insumo.stock_minimo,
      costo_unitario_crc:
        costo_unitario_crc !== undefined ? Number(costo_unitario_crc) : insumo.costo_unitario_crc
    });

    return res.status(200).json({
      ok: true,
      mensaje: 'Inventario de insumo actualizado correctamente.',
      data: enriquecerConAlertaStock(insumo)
    });
  } catch (error) {
    next(error);
  }
};
