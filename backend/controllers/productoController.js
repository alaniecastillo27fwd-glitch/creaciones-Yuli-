import { Producto, Categoria } from '../models/index.js';

// =============================================================================
// CONTROLADORES DE CATEGORÍAS (/api/categorias)
// =============================================================================
export const listarCategorias = async (req, res, next) => {
  try {
    const categorias = await Categoria.findAll({
      where: { activa: true },
      order: [['id_categoria', 'ASC']]
    });

    return res.status(200).json({
      ok: true,
      data: categorias
    });
  } catch (error) {
    next(error);
  }
};

export const crearCategoria = async (req, res, next) => {
  try {
    const { nombre, descripcion } = req.body;
    const nuevaCategoria = await Categoria.create({
      nombre: nombre.trim(),
      descripcion: descripcion ? descripcion.trim() : null,
      activa: true
    });

    return res.status(201).json({
      ok: true,
      mensaje: 'Categoría creada exitosamente.',
      data: nuevaCategoria
    });
  } catch (error) {
    next(error);
  }
};

export const actualizarCategoria = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Categoría no encontrada.'
      });
    }

    const { nombre, descripcion, activa, activo } = req.body;
    await categoria.update({
      nombre: nombre ? nombre.trim() : categoria.nombre,
      descripcion: descripcion !== undefined ? descripcion : categoria.descripcion,
      activa: activa !== undefined ? Boolean(activa) : activo !== undefined ? Boolean(activo) : categoria.activa
    });

    return res.status(200).json({
      ok: true,
      mensaje: 'Categoría actualizada exitosamente.',
      data: categoria
    });
  } catch (error) {
    next(error);
  }
};

export const eliminarCategoriaLogico = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Categoría no encontrada.'
      });
    }

    // Borrado lógico (activo/activa = false)
    await categoria.update({ activa: false });

    return res.status(200).json({
      ok: true,
      mensaje: 'Categoría desactivada (borrado lógico aplicado).',
      data: { id_categoria: categoria.id_categoria, activo: false, activa: false }
    });
  } catch (error) {
    next(error);
  }
};

// =============================================================================
// CONTROLADORES DE PRODUCTOS (/api/productos)
// =============================================================================
export const listarProductos = async (req, res, next) => {
  try {
    const filtro = { disponible: true };
    if (req.query.id_categoria) {
      filtro.id_categoria = Number(req.query.id_categoria);
    }

    const productos = await Producto.findAll({
      where: filtro,
      include: [
        {
          model: Categoria,
          as: 'categoria',
          attributes: ['id_categoria', 'nombre']
        }
      ],
      order: [['id_producto', 'ASC']]
    });

    return res.status(200).json({
      ok: true,
      data: productos
    });
  } catch (error) {
    next(error);
  }
};

export const obtenerProductoPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id, {
      include: [
        {
          model: Categoria,
          as: 'categoria',
          attributes: ['id_categoria', 'nombre']
        }
      ]
    });

    if (!producto || !producto.disponible) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Producto no encontrado o no disponible.'
      });
    }

    return res.status(200).json({
      ok: true,
      data: producto
    });
  } catch (error) {
    next(error);
  }
};

export const crearProducto = async (req, res, next) => {
  try {
    const {
      id_categoria,
      nombre,
      descripcion,
      precio_base_crc,
      tiempo_elaboracion_dias = 3,
      imagen_url = null,
      personalizable = true
    } = req.body;

    const nuevoProducto = await Producto.create({
      id_categoria: Number(id_categoria),
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precio_base_crc: Number(precio_base_crc),
      tiempo_elaboracion_dias: Number(tiempo_elaboracion_dias),
      imagen_url,
      personalizable: Boolean(personalizable),
      disponible: true
    });

    return res.status(201).json({
      ok: true,
      mensaje: 'Producto creado exitosamente.',
      data: nuevoProducto
    });
  } catch (error) {
    next(error);
  }
};

export const actualizarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Producto no encontrado.'
      });
    }

    const {
      id_categoria,
      nombre,
      descripcion,
      precio_base_crc,
      tiempo_elaboracion_dias,
      imagen_url,
      personalizable,
      disponible,
      activo
    } = req.body;

    await producto.update({
      id_categoria: id_categoria !== undefined ? Number(id_categoria) : producto.id_categoria,
      nombre: nombre ? nombre.trim() : producto.nombre,
      descripcion: descripcion ? descripcion.trim() : producto.descripcion,
      precio_base_crc: precio_base_crc !== undefined ? Number(precio_base_crc) : producto.precio_base_crc,
      tiempo_elaboracion_dias:
        tiempo_elaboracion_dias !== undefined ? Number(tiempo_elaboracion_dias) : producto.tiempo_elaboracion_dias,
      imagen_url: imagen_url !== undefined ? imagen_url : producto.imagen_url,
      personalizable: personalizable !== undefined ? Boolean(personalizable) : producto.personalizable,
      disponible:
        disponible !== undefined ? Boolean(disponible) : activo !== undefined ? Boolean(activo) : producto.disponible
    });

    return res.status(200).json({
      ok: true,
      mensaje: 'Producto actualizado exitosamente.',
      data: producto
    });
  } catch (error) {
    next(error);
  }
};

export const eliminarProductoLogico = async (req, res, next) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Producto no encontrado.'
      });
    }

    // Borrado lógico (activo/disponible = false)
    await producto.update({ disponible: false });

    return res.status(200).json({
      ok: true,
      mensaje: 'Producto desactivado del catálogo (borrado lógico aplicado).',
      data: {
        id_producto: producto.id_producto,
        activo: false,
        disponible: false
      }
    });
  } catch (error) {
    next(error);
  }
};
