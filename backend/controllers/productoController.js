import { Producto } from '../models/Producto.js';

export const listarProductos = async (req, res, next) => {
  try {
    const productos = await Producto.findAll({
      where: { disponible: true }
    });
    return res.status(200).json({
      ok: true,
      data: productos
    });
  } catch (error) {
    next(error);
  }
};
