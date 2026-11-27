import { Router } from 'express';
import {
  crearPedidoPersonalizado,
  listarPedidos,
  actualizarEstadoPedido
} from '../controllers/pedidoController.js';
import { authJWT } from '../middlewares/authJWT.js';
import { checkRole } from '../middlewares/checkRole.js';
import { validatePedido, validateEstadoPedido } from '../middlewares/validators.js';

const router = Router();

// Cliente crea solicitud de pedido personalizado
router.post(
  '/',
  authJWT,
  checkRole(['Cliente']),
  validatePedido,
  crearPedidoPersonalizado
);

// Cliente ve sus propios pedidos; Administrador y Colaborador ven todos
router.get(
  '/',
  authJWT,
  checkRole(['Cliente', 'Administrador', 'Colaborador']),
  listarPedidos
);

// Solo Administrador y Colaborador actualizan el estado operativo del pedido
router.patch(
  '/:id/estado',
  authJWT,
  checkRole(['Administrador', 'Colaborador']),
  validateEstadoPedido,
  actualizarEstadoPedido
);

export default router;
