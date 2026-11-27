import { Router } from 'express';
import {
  listarCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoriaLogico,
  listarProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProductoLogico
} from '../controllers/productoController.js';
import { authJWT } from '../middlewares/authJWT.js';
import { checkRole } from '../middlewares/checkRole.js';
import { validateProducto, validateCategoria } from '../middlewares/validators.js';

export const categoriaRouter = Router();
const productoRouter = Router();

// =============================================================================
// RUTAS DE CATEGORÍAS (/api/categorias)
// =============================================================================
categoriaRouter.get('/', listarCategorias);

categoriaRouter.post(
  '/',
  authJWT,
  checkRole(['Administrador', 'Colaborador']),
  validateCategoria,
  crearCategoria
);

categoriaRouter.put(
  '/:id',
  authJWT,
  checkRole(['Administrador', 'Colaborador']),
  validateCategoria,
  actualizarCategoria
);

categoriaRouter.delete(
  '/:id',
  authJWT,
  checkRole(['Administrador', 'Colaborador']),
  eliminarCategoriaLogico
);

// =============================================================================
// RUTAS DE PRODUCTOS (/api/productos)
// =============================================================================
productoRouter.get('/', listarProductos);
productoRouter.get('/:id', obtenerProductoPorId);

productoRouter.post(
  '/',
  authJWT,
  checkRole(['Administrador', 'Colaborador']),
  validateProducto,
  crearProducto
);

productoRouter.put(
  '/:id',
  authJWT,
  checkRole(['Administrador', 'Colaborador']),
  validateProducto,
  actualizarProducto
);

productoRouter.delete(
  '/:id',
  authJWT,
  checkRole(['Administrador', 'Colaborador']),
  eliminarProductoLogico
);

export default productoRouter;
